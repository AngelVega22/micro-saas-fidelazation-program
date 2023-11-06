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
                    role: 'admin'
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
                    role: 'admin'
                },
            })
        }
        return { success: true }
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

    deleteUserProgram: privateProcedure.input(
        z.object({ id: z.string() })
    ).mutation(async ({ ctx, input }) => {
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

        return userProgram
    }),
});

export type AppRouter = typeof appRouter;