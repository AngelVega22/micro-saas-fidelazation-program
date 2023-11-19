import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TRPCError, initTRPC } from '@trpc/server';
import { db } from '../db/index';

const t = initTRPC.create();

const middleware = t.middleware
const isAuth = middleware(async (opts) => {
    const { getUser } = getKindeServerSession()
    const user = getUser()

    if (!user || !user.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    const dbUser = await db.user.findFirst({
        where: {
            id: user.id
        }
    })
    return opts.next({
        ctx: {
            userId: user.id,
            role: dbUser?.role,
            user
        }
    })
})

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth)