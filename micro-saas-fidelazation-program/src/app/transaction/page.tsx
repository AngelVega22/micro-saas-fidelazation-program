import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { TRPCError } from '@trpc/server';
import TransactionResponseView from '../../components/TransactionResponseView';


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
    console.log(point)

    return (<>
        <TransactionResponseView point={point?.points} />
    </>)
}

export default Page