import { trpc } from "@/app/_trpc/client"
import RegisterForm from "@/components/RegisterForm"
import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, XCircle } from "lucide-react"
import MaxWidthWrapper from "@/components/maxWidthWrapper"
import ImageQR from "@/components/ImageQR"

interface PageProps {
    params: {
        pointsid: string
    }
}


const Page = async ({ params }: PageProps) => {
    const { pointsid } = params
    const { getUser } = getKindeServerSession()
    const user = getUser()
    const point = await db.points.findFirst({
        where: {
            id: pointsid,
        }
    })
    let userId: string = ''
    let userRole: string = ''
    if (user) {
        if (user !== null) userId = user.id ?? '';

        const dbUser = await db.user.findFirst({
            where: {
                id: userId
            }
        })
        if (user !== null) userRole = dbUser?.role ?? '';
    }

    let isUsed: boolean = false
    if (point !== null) isUsed = point.isUsed;
    let pointId: string = ''
    if (point !== null) pointId = point.id;

    return (<>

        {user ? (
            <div>

                {user && userRole === 'ADMIN' && user.id == point?.userCreate ? (
                    <div>
                        {isUsed ? (
                            <MaxWidthWrapper >
                                <Alert className=" mt-10">
                                    <XCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>
                                        ¡Este punto ya fue utilizado!
                                    </AlertDescription>
                                </Alert>
                            </MaxWidthWrapper  >
                        ) : (
                            <>
                                <ImageQR url={pointsid} />
                            </>

                        )}
                    </div>
                ) : (
                    <div >
                        {isUsed ? (
                            <MaxWidthWrapper >
                                <Alert className=" mt-10">
                                    <XCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>
                                        ¡Este punto ya fue utilizado!
                                    </AlertDescription>
                                </Alert>
                            </MaxWidthWrapper  >
                        ) : (
                            <div>
                                {
                                    user.id !== point?.userCreate && userRole === 'ADMIN' ? (
                                        <MaxWidthWrapper >
                                            <Alert className=" mt-10">
                                                <XCircle className="h-4 w-4" />
                                                <AlertTitle>Error</AlertTitle>
                                                <AlertDescription>
                                                    ¡Este perfil es de un negocio!
                                                </AlertDescription>
                                            </Alert>
                                        </MaxWidthWrapper  >
                                    ) : (
                                        <div>
                                            <RegisterForm pointId={pointId} point={point?.points} email={user.email} />
                                        </div>
                                    )
                                }
                            </div>
                        )}
                    </div  >
                )}
            </div>


        ) : (
            <div>
                {isUsed ? (
                    <MaxWidthWrapper >
                        <Alert className=" mt-10">
                            <XCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                ¡Este punto ya fue utilizado!
                            </AlertDescription>
                        </Alert>
                    </MaxWidthWrapper  >
                ) : (
                    <RegisterForm pointId={pointId} point={point?.points} email={user} />
                )}
            </div>
        )}
    </>
    )
}

export default Page