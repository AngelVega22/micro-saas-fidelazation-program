import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import ImageQR from '@/components/ImageQR';
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { XCircle } from "lucide-react";


interface PageProps {
    params: {
        userprogramid: string
    }
}

const Page = async ({ params }: PageProps) => {
    const { getUser } = getKindeServerSession()
    const user = getUser()
    const userProgramId = params.userprogramid

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

    if (dbUser.id === program?.userCreate)
        redirect(`/transaction?userProgramId=${userProgramId}`)


    return (<>
        {dbUser.role === 'USER' && userProgram?.userId === dbUser.id ? (
            <div>
                <ImageQR url={`transaction/${userProgramId}`} description="Presenta el siguiente código QR para reclamar tu recompensa." />
            </div>
        ) : (
            <MaxWidthWrapper >
                <Alert className=" mt-10">
                    <XCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Programa no encontrado!
                    </AlertDescription>
                </Alert>
            </MaxWidthWrapper  >
        )}

    </>)
}

export default Page