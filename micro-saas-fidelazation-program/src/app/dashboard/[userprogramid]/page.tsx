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
                    <h1 className='mb-3 font-bold text-3xl text-gray-900'>
                        {program.name}
                    </h1>
                </div>
                <div className='flex-1 justify-between flex flex-col'>
                    <div className='mx-auto w-full max-w-8xl grow lg:flex xl:px-2'>
                        <div className='flex-1 xl:flex'>
                            <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
                                <EditCard program={program} />
                            </div>
                        </div>
                        <div className='shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0'>
                            <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
                                <div className="grid gap-4 md:grid-cols-2">

                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Total Revenue
                                            </CardTitle>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="h-4 w-4 text-muted-foreground"
                                            >
                                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                            </svg>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">$45,231.89</div>
                                            <p className="text-xs text-muted-foreground">
                                                +20.1% from last month
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Total Revenue
                                            </CardTitle>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="h-4 w-4 text-muted-foreground"
                                            >
                                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                            </svg>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">$45,231.89</div>
                                            <p className="text-xs text-muted-foreground">
                                                +20.1% from last month
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                                <br />
                                <div className="grid gap-4 md:grid-cols-2">

                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Total Revenue
                                            </CardTitle>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="h-4 w-4 text-muted-foreground"
                                            >
                                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                            </svg>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">$45,231.89</div>
                                            <p className="text-xs text-muted-foreground">
                                                +20.1% from last month
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Total Revenue
                                            </CardTitle>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="h-4 w-4 text-muted-foreground"
                                            >
                                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                            </svg>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">$45,231.89</div>
                                            <p className="text-xs text-muted-foreground">
                                                +20.1% from last month
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Page