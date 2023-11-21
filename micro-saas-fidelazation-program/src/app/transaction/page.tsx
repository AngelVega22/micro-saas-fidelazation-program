import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { TRPCError } from '@trpc/server';


const Page = async (ctx: Params) => {

    const queryParams = ctx.searchParams
    const pointId = queryParams.transaction

    const { getUser } = getKindeServerSession()
    const user = getUser()

    if (!user || !user.id) redirect('/auth-callback?origin=product')

    const dbUser = await db.user.findFirst({
        where: {
            id: user.id
        }
    })

    if (!dbUser) redirect('/auth-callback?origin=product')

    const point = await db.points.findFirst({
        where: {
            id: pointId
        }
    })
    if (point?.isUsed === true)
        redirect('/')

    const userProgram = await db.userProgram.findFirst({
        where: {
            id: point?.userProgramId
        }
    })
    const program = await db.program.findFirst({
        where: {
            id: userProgram?.programId
        }
    })

    if (dbUser.id !== program?.userCreate)
        redirect('/')

    console.log('user', userProgram)

    if (!userProgram)
        throw new TRPCError({ code: 'BAD_REQUEST' })

    const transaction = await db.userProgram.update({
        data: {
            pointsAmount: userProgram?.pointsAmount - userProgram?.pointsGoal
        },
        where: {
            id: userProgram.id
        }
    })

    if (transaction)
        await db.points.update({
            data: {
                isUsed: true
            },
            where: {
                id: pointId
            }
        })

    // TO DO - SUCCESS PAGE
    redirect('/')
}

export default Page