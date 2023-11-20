import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";


const Page = async (ctx: Params) => {

    const queryParams = ctx.searchParams
    const userProgramId = queryParams.userProgramId

    const { getUser } = getKindeServerSession()
    const user = getUser()

    if (!user || !user.id) redirect('/auth-callback?origin=product')

    const dbUser = await db.user.findFirst({
        where: {
            id: user.id
        }
    })

    if (!dbUser) redirect('/auth-callback?origin=product')

    const userProgram = await db.userProgram.findFirst({
        where: {
            id: userProgramId
        }
    })
    const program = await db.program.findFirst({
        where: {
            id: userProgram?.programId
        }
    })

    if (dbUser.id !== program?.userCreate)
        redirect('/')

    console.log('HACER TRANSACCION AQUÍ')
}

export default Page