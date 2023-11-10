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
import EditCard from "@/components/EditCard"
import Overview from "@/components/Overview"

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
    // console.log(userProgram)

    const program = await db.program.findFirst({
        where: {
            id: userProgram.programId,
            userCreate: user.id
        }
    })
    if (!program) notFound()

    // console.log(program)
    return (
        <>
            {/* <main className='mx-auto max-w-7xl md:p-10 space-y-5  h-[calc(100vh-3.5rem)]'>
                    <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'> */}
            <main className='mx-auto max-w-7xl md:p-10 '>
                <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
                    <h1 className='mb-3 font-bold text-3xl text-gray-900 pl-6'>
                        {program.name}
                    </h1>
                </div>
                <div className='flex-1 justify-between flex flex-col'>
                    <div className='mx-auto w-full max-w-8xl grow flex-row-reverse lg:flex xl:px-0 '>
                        <div className='flex-1 xl:flex lg:border-l lg:border-t-0 pl-5'>
                            <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-0'>
                                <Overview userProgram={userProgram} />

                            </div>
                        </div>
                        <div className='shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 '>
                            <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
                                <EditCard program={program} userProgram={userProgram} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Page