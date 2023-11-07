import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { notFound, redirect } from "next/navigation"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import MaxWidthWrapper from '@/components/maxWidthWrapper';

interface PageProps {
    params: {
        userprogramid: string
    }
}

const Page = async ({ params }: PageProps) => {

    const { userprogramid } = params

    const { getUser } = getKindeServerSession()
    const user = getUser()

    if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${userprogramid}`)

    const userProgram = await db.userProgram.findFirst({
        where: {
            id: userprogramid,
            userId: user.id
        }
    })

    if (!userProgram) notFound()
    console.log(userProgram)

    return (
        <>
            <main className='mx-auto max-w-7xl md:p-10 space-y-5'>
                <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
                    <h1 className='mb-3 font-bold text-3xl text-gray-900'>
                        {userProgram.name}
                    </h1>
                </div>
                <div>
                    <Card className="w-[350px] space-y-2">
                        <CardHeader>
                            <CardTitle>Editar Programa</CardTitle>
                            <CardDescription>Puedes editar el programa aquí</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Nombre</Label>
                                        <Input id="name" placeholder="Name of your project" value={userProgram.name} />
                                    </div>

                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button>Editar</Button>
                        </CardFooter>
                    </Card>

                </div>
            </main>
        </>
    )
}

export default Page