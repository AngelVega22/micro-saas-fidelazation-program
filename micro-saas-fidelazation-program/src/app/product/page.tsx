import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { TRPCError } from "@trpc/server";
import EnrollForm from '../../components/EnrollForm';
import ImageQR from '@/components/ImageQR';
import PrintView from "@/components/PrintView";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, XCircle } from "lucide-react";

const Page = async (ctx: Params) => {

    const queryParams = ctx.searchParams
    const userProgram = await db.userProgram.findFirst({
        where: {
            id: queryParams.id
        }
    })

    if (!queryParams.id || !userProgram)
        redirect('/')

    const userprogramid = queryParams.id
    const programName = queryParams.name
    const programId = queryParams.programid
    const pointValue = queryParams.pointValue
    const reward = queryParams.reward
    const pointsGoal = queryParams.pointsGoal

    const { getUser } = getKindeServerSession()
    const user = getUser()

    let userId: string = ''
    let userRole: string = ''
    let programIdExist: string | undefined = ''
    if (user) {
        if (user !== null) userId = user.id ?? '';

        const dbUser = await db.user.findFirst({
            where: {
                id: userId
            }
        })
        if (user !== null) userRole = dbUser?.role ?? '';

        const existUserProgram = await db.userProgram.findFirst({
            where: {
                userId: dbUser?.id,
                programId: programId
            }
        })
        programIdExist = existUserProgram?.programId
    }

    const program = await db.program.findFirst({
        where: {
            id: programId
        }
    })
    const programCreator: string | undefined = program?.userCreate

    if (programIdExist && user && programCreator !== user.id) {
        redirect('/dashboard')
    }

    interface registationData {
        userprogramid: string,
        programName: string,
        programId: string,
        pointValue: string,
        reward: string,
        pointsGoal: string,
        email: string | null
    }

    const email: string | null = user?.email ? user.email : ''

    const registationData: registationData =
    {
        'userprogramid': userprogramid,
        'programName': programName,
        'programId': programId,
        'pointValue': pointValue,
        'reward': reward,
        'pointsGoal': pointsGoal,
        'email': email
    }

    const url = `product?id=${userprogramid}&name=${programName}&programid=${programId}&pointValue=${pointValue}&reward=${reward}&pointsGoal=${pointsGoal}`

    return (<>
        {user && userRole === 'ADMIN' && user.id === programCreator ? (
            <div>
                <PrintView url={url} />
            </div>
        ) : (
            <div>
                {user && userRole === 'ADMIN' && user.id !== programCreator ? (
                    <div>
                        <MaxWidthWrapper >
                            <Alert className=" mt-10">
                                <XCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    ¡Este perfil es de negocio!
                                </AlertDescription>
                            </Alert>
                        </MaxWidthWrapper  >
                    </div>
                ) : (
                    <div>
                        {user && userRole === 'USER' && programIdExist ? (
                            <div className="max-w-md mx-auto mt-10 p-2 bg-white shadow-lg rounded-lg">

                                <Alert className="py-5">
                                    <XCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>
                                        ¡Usted ya se encuentra registrado en este programa!
                                    </AlertDescription>

                                </Alert>
                                <div className='w-full mt-5 flex justify-center'>
                                    <div className='flex flex-col items-center gap-2'>
                                        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
                                        <p>Serás redirigido automáticamente.</p>
                                    </div>
                                </div>

                            </div>
                        ) : (
                            <EnrollForm registationData={registationData} />
                        )}
                    </div>
                )}
            </div>
        )}

    </>)
}

export default Page