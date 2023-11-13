import { trpc } from "@/app/_trpc/client"
import RegisterForm from "@/components/RegisterForm"
import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, XCircle } from "lucide-react"
import MaxWidthWrapper from "@/components/maxWidthWrapper"

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
            id: pointsid
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
                {user && userRole === 'ADMIN' ? (
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
                            <h1>`http://localhost:3000/product/${params.pointsid}` QR</h1>
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
                            <RegisterForm pointId={pointId} />
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
                    <RegisterForm pointId={pointId} />
                )}
            </div>
        )}
    </>
    )
}

export default Page