import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db";

const Page = async () => {
    // const { getUser } = getKindeServerSession()
    // const user = getUser()

    // if (!user || !user.id) redirect('/auth-callback?origin=product')

    // const dbUser = await db.user.findFirst({
    //     where: {
    //         id: user.id
    //     }
    // })

    // if (!dbUser) redirect('/auth-callback?origin=product')
    redirect('/')

}

export default Page