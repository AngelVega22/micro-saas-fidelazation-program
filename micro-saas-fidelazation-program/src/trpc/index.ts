import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { privateProcedure, publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';
import { number, z } from 'zod';

export const appRouter = router({

    authCallback: publicProcedure.query(async () => {
        const { getUser } = getKindeServerSession()
        const user = getUser()

        if (!user.id || !user.email)
            throw new TRPCError({ code: 'UNAUTHORIZED' })

        const dbUser = await db.user.findFirst({
            where: {
                id: user.id
            }
        })

        const dbUserEmail = await db.user.findFirst({
            where: {
                email: user.email
            }
        })

        if (dbUserEmail) {
            await db.user.update({
                data: {
                    id: user.id,
                    name: user.given_name,
                    picture: user.picture,
                },
                where: {
                    email: user.email
                }
            })
        }
        if (!dbUser) {
            await db.user.create({
                data: {
                    id: user.id,
                    name: user.given_name,
                    email: user.email,
                    picture: user.picture,
                    role: 'ADMIN'
                },
            })
        }
        return { success: true, user: dbUser }
    }),

    authClientCallback: publicProcedure.query(async () => {

        const { getUser } = getKindeServerSession()
        const user = getUser()

        if (!user.id || !user.email)
            throw new TRPCError({ code: 'UNAUTHORIZED' })

        const dbUser = await db.user.findFirst({
            where: {
                id: user.id
            }
        })
        // console.log(dbUser)
        const dbUserEmail = await db.user.findFirst({
            where: {
                email: user.email
            }
        })
        if (!dbUser)
            throw new TRPCError({ code: 'BAD_REQUEST' })
        const updatedUserProgram = await db.userProgram.update({
            data: {
                userId: dbUser.id
            },
            where: {
                id: dbUser.email,
            }
        })

        if (dbUserEmail || dbUser) {
            await db.user.update({
                data: {
                    id: user.id,
                    name: user.given_name,
                    picture: user.picture,
                    role: 'USER'
                },
                where: {
                    email: user.email
                }
            })
        }
        if (!dbUser) {
            await db.user.create({
                data: {
                    id: user.id,
                    name: user.given_name,
                    email: user.email,
                    picture: user.picture,
                    role: 'USER'
                },
            })
        }



        // console.log(updatedUserProgram)
        return { success: true, user: dbUser, data: updatedUserProgram }
    }),

    createCustomer: publicProcedure.input(z.object({
        email: z.string()
            .min(1, { message: "This field has to be filled." })
            .email("This is not a valid email."),
        pointId: z.string()
    })).mutation(async ({ input }) => {
        const dbUser = await db.user.findFirst({
            where: {
                email: input.email
            }
        })
        if (dbUser?.role === 'ADMIN')
            throw new TRPCError({ code: 'BAD_REQUEST' })

        const points = await db.points.findFirst({
            where: {
                id: input.pointId
            }
        })
        if (!dbUser) {
            await db.user.create({
                data: {
                    id: input.email,
                    email: input.email,
                    role: 'USER'
                },
            })
        }

        const userProgram = await db.userProgram.findFirst({
            where: {
                id: points?.userProgramId
            }
        })

        if (!userProgram)
            throw new TRPCError({ code: 'BAD_REQUEST' })

        if (!dbUser) {
            await db.userProgram.create({
                data: {
                    name: userProgram.name,
                    userId: input.email,
                    pointValue: userProgram.pointValue,
                    reward: userProgram.reward,
                    pointsGoal: userProgram.pointsGoal,
                    programId: userProgram.programId,
                    pointsAmount: userProgram.pointValue,
                    updated_at: new Date(),
                    isActive: true,
                }
            })
            await db.points.update({
                data: {
                    isUsed: true
                },
                where: {
                    id: input.pointId
                }
            })
        }
        if (!dbUser?.id) throw new TRPCError({ code: 'BAD_REQUEST' })

        const existUserProgram = await db.userProgram.findFirst({
            where: {
                userId: dbUser.id,
                programId: userProgram.programId
            }
        })
        if (dbUser?.id && !existUserProgram)
            await db.userProgram.create({
                data: {
                    name: userProgram.name,
                    userId: dbUser?.id,
                    pointValue: userProgram.pointValue,
                    reward: userProgram.reward,
                    pointsGoal: userProgram.pointsGoal,
                    programId: userProgram.programId,
                    pointsAmount: userProgram.pointValue,
                    updated_at: new Date(),
                    isActive: true,
                }
            })
        if (existUserProgram) {

            await db.userProgram.update({
                data: {
                    pointsAmount: existUserProgram?.pointsAmount + userProgram.pointValue,
                    updated_at: new Date(),
                },
                where: {
                    id: existUserProgram?.id
                }
            })
        }
        const updatedPoint = await db.points.update({
            data: {
                isUsed: true
            },
            where: {
                id: input.pointId
            }
        })

        return { updatedPoint }
    }),

    getUserPrograms: privateProcedure.query(async ({ ctx }) => {
        const { userId, user } = ctx

        const userPrograms = await db.userProgram.findMany({
            where: {
                userId: userId
            }
        })
        return userPrograms
    }),

    deleteUserProgram: privateProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
        const { userId } = ctx

        const userProgram = await db.userProgram.findFirst({
            where: {
                id: input.id,
                userId
            },
        })
        if (!userProgram) throw new TRPCError({ code: 'NOT_FOUND' })

        if (userProgram.programId) {

            await db.userProgram.updateMany({
                data: {
                    isActive: false,
                    isDeleted: true
                },
                where: {
                    programId: userProgram?.programId
                }
            })
            await db.program.update({
                data: {
                    isActive: false,
                    isDeleted: true
                },
                where: {
                    id: userProgram?.programId
                }
            })

        }
        await db.userProgram.update({
            data: {
                isActive: false,
            },
            where: {
                id: input.id
            }
        })

        return userProgram
    }),

    createUserProgram: privateProcedure.input(z.object({
        name: z.string().min(2).max(50),
        description: z.string(),
        programRules: z.string(),
        pointValue: z.string().refine((pointValue) => !Number.isNaN(parseInt(pointValue, 10)), {
            message: "Escribe un número"
        }),
        reward: z.string(),
        pointsGoal: z.string().refine((pointsGoal) => !Number.isNaN(parseInt(pointsGoal, 10)), {
            message: "Escribe un número"
        }),
        startDate: z.string(),
        endDate: z.string(),
    })).mutation(async ({ ctx, input }) => {

        if (ctx.role !== 'ADMIN') throw new TRPCError({ code: 'UNAUTHORIZED' })

        const newProgram = await db.program.create({
            data: {
                name: input.name,
                description: input.description,
                programRules: input.programRules,
                startDate: input.startDate,
                endDate: input.endDate,
                userCreate: ctx.userId,
                updated_at: new Date(),
            },
        });

        const newUserProgram = await db.userProgram.create({
            data: {
                name: newProgram.name,
                userId: ctx.userId,
                // comment: newProgram.description,
                pointValue: parseInt(input.pointValue),
                reward: input.reward,
                pointsGoal: parseInt(input.pointsGoal),
                programId: newProgram.id,
                updated_at: new Date(),
                isActive: true,
            },
        });

        return newUserProgram
    }),

    updateUserProgram: privateProcedure.input(z.object({
        id: z.string(),
        userProgramId: z.string(),
        name: z.string().min(2, { message: 'Debe tener 2 letras mínimo' }).max(50, { message: 'Debe tener máximo 50 letras' }),
        description: z.string().max(255, { message: 'Debe tener máximo 255 letras' }),
        programRules: z.string().min(10).max(255, { message: 'Debe tener máximo 255 letras' }),
        pointValue: z.string().refine((pointValue) => !Number.isNaN(parseInt(pointValue, 10)), { message: "Escribe un número" }),
        reward: z.string().min(2, { message: 'Debe tener 2 letras mínimo' }).max(50, { message: 'Debe tener máximo 50 letras' }),
        pointsGoal: z.string().refine((pointsGoal) => !Number.isNaN(parseInt(pointsGoal, 10)), { message: "Escribe un número" }),
        startDate: z.string(),
        endDate: z.string(),
        isActive: z.boolean()
    })).mutation(async ({ ctx, input }) => {
        // console.log(input)
        if (ctx.role !== 'ADMIN') throw new TRPCError({ code: 'UNAUTHORIZED' })

        const updateProgram = await db.program.update({
            where: {
                id: input.id
            },
            data: {
                name: input.name,
                description: input.description,
                programRules: input.programRules,
                startDate: input.startDate,
                endDate: input.endDate,
                userCreate: ctx.userId,
                updated_at: new Date(),
                isActive: input.isActive,
            },
        });

        const newUserProgram = await db.userProgram.update({
            where: {
                id: input.userProgramId
            },
            data: {
                name: input.name,
                userId: ctx.userId,
                // comment: newProgram.description,
                pointValue: parseInt(input.pointValue),
                reward: input.reward,
                pointsGoal: parseInt(input.pointsGoal),
                programId: input.id,
                updated_at: new Date(),
                isActive: input.isActive,
            },
        });

        await db.userProgram.updateMany({
            data: {
                name: input.name,
                isActive: input.isActive,
                pointValue: parseInt(input.pointValue),
                reward: input.reward,
                pointsGoal: parseInt(input.pointsGoal),
                programId: input.id,
                updated_at: new Date(),
            },
            where: {
                programId: updateProgram.id
            }
        })
        // console.log(newUserProgram)
        return newUserProgram
    }),

    createUserProgramPoint: privateProcedure.input(

        z.object({
            points: z.number(),
            userProgramId: z.string(),
            transactionType: z.enum(["EARN", "LOSE"])
        })
    ).mutation(async ({ ctx, input }) => {
        const newUserProgramPoint = await db.points.create({
            data: {
                transactionType: input.transactionType,
                points: input.points,
                userCreate: ctx.userId,
                userProgramId: input.userProgramId
            },
        });
        // console.log(newUserProgramPoint)
        return newUserProgramPoint
    }),

    // TO TO - Register customer in userProgram

    registerCustomer: publicProcedure.input(z.object({
        email: z.string()
            .min(1, { message: "This field has to be filled." })
            .email("This is not a valid email."),
        programName: z.string().min(2).max(50),
        pointValue: z.string().refine((pointValue) => !Number.isNaN(parseInt(pointValue, 10)), {
            message: "Escribe un número"
        }),
        reward: z.string(),
        pointsGoal: z.string().refine((pointsGoal) => !Number.isNaN(parseInt(pointsGoal, 10)), {
            message: "Escribe un número"
        }),
        programId: z.string().min(2).max(50),
    })).mutation(async ({ input }) => {
        const dbUser = await db.user.findFirst({
            where: {
                email: input.email
            }
        })
        if (dbUser?.role === 'ADMIN')
            throw new TRPCError({ code: 'BAD_REQUEST' })

        if (!dbUser) {
            await db.user.create({
                data: {
                    id: input.email,
                    email: input.email,
                    role: 'USER'
                },
            })

            await db.userProgram.create({
                data: {
                    name: input.programName,
                    userId: input.email,
                    pointValue: parseInt(input.pointValue),
                    reward: input.reward,
                    pointsGoal: parseInt(input.pointsGoal),
                    programId: input.programId,
                    updated_at: new Date(),
                    isActive: true,
                }
            })
        }

        const existUserProgram = await db.userProgram.findFirst({
            where: {
                userId: dbUser?.id,
                programId: input.programId
            }
        })
        if (!existUserProgram)
            await db.userProgram.create({
                data: {
                    name: input.programName,
                    userId: dbUser?.id,
                    pointValue: parseInt(input.pointValue),
                    reward: input.reward,
                    pointsGoal: parseInt(input.pointsGoal),
                    programId: input.programId,
                    updated_at: new Date(),
                    isActive: true,
                },
            });

        return existUserProgram

    }),
});

export type AppRouter = typeof appRouter;