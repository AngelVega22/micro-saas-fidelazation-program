import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { privateProcedure, publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';
import { z } from 'zod';

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
                    role: 'ADMIN'
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

        await db.userProgram.delete({
            where: {
                id: input.id
            }
        })

        if (userProgram.programId) {
            await db.program.delete({
                where: {
                    id: userProgram?.programId
                }
            })
        }

        return userProgram
    }),

    createUserProgram: privateProcedure.input(z.object({
        name: z.string().min(2).max(50),
        description: z.string(),
        programRules: z.string(),
        pointValue: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
            message: "Escribe un número"
        }),
        reward: z.string(),
        pointsGoal: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
            message: "Escribe un número"
        }),
        startDate: z.string(),
        endDate: z.string(),
    })).mutation(async ({ ctx, input }) => {

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
    })
});

export type AppRouter = typeof appRouter;