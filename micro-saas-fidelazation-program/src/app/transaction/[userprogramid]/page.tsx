import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import ImageQR from '@/components/ImageQR';
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeftCircle, Loader2, XCircle } from "lucide-react";
import { TRPCError } from "@trpc/server";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";


interface PageProps {
    params: {
        userprogramid: string
    }
}

const Page = async ({ params }: PageProps) => {
    const { getUser } = getKindeServerSession()
    const user = getUser()
    const pointsid = params.userprogramid

    if (!user || !user.id) redirect('/auth-callback?origin=product')

    const dbUser = await db.user.findFirst({
        where: {
            id: user.id
        }
    })

    if (!dbUser) redirect('/auth-callback?origin=product')
    const points = await db.points.findFirst({
        where: {
            id: pointsid
        }
    })

    const userProgram = await db.userProgram.findFirst({
        where: {
            id: points?.userProgramId
        }
    })
    const program = await db.program.findFirst({
        where: {
            id: userProgram?.programId
        }
    })

    if (!userProgram)
        throw new TRPCError({ code: 'BAD_REQUEST' })

    if (dbUser.id === program?.userCreate && !points?.isUsed) {

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
                    id: pointsid
                }
            })
        redirect(`/transaction?transaction=${pointsid}`)

    }


    return (<>
        {dbUser.role === 'USER' && userProgram?.userId === dbUser.id ? (
            <div>
                {points?.isUsed ? (
                    <MaxWidthWrapper >
                        <Alert className=" mt-10">
                            <XCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                ¡Estos puntos ya han sido utilizados!
                            </AlertDescription>
                        </Alert>
                    </MaxWidthWrapper  >
                ) : (

                    <ImageQR url={`transaction/${pointsid}`} description="Presenta el siguiente código QR para reclamar tu recompensa." />


                )}
            </div>
        ) : (
            <div>
                {dbUser.id === program?.userCreate && !points?.isUsed ? (
                    <div className='w-full mt-24 flex justify-center'>
                        <div className='flex flex-col items-center gap-2'>
                            <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
                            <h3 className='font-semibold text-xl'>
                                Transacción en curso...
                            </h3>
                            <p>Serás redirigido automáticamente.</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        {points?.isUsed ? (
                            <MaxWidthWrapper >
                                <Alert className=" mt-10">
                                    <XCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>
                                        ¡Estos puntos ya han sido utilizados!
                                    </AlertDescription>
                                </Alert>
                            </MaxWidthWrapper  >
                        ) : (
                            <div className='w-full mt-24 flex justify-center'>
                                <div className='flex flex-col items-center gap-2'>
                                    <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
                                    <h3 className='font-semibold text-xl'>
                                        Transacción en curso...
                                    </h3>
                                    <p>Serás redirigido automáticamente.</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

        )}

    </>)
}

export default Page