import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { notFound, redirect } from "next/navigation"
import EditCard from "@/components/EditCard"
import Overview from "@/components/Overview"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import EnrollButton from "@/components/EnrollButton"
import ShareButton from '../../../components/ShareButton';

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
            <main className='mx-auto max-w-7xl md:px-5 '>
                <div className='mt-8 flex  items-start justify-between   border-b border-gray-200 pb-5  flex-row sm:items-center  '>
                    <div className='mb-3  flex  flex-row items-center'>
                        <Link className={buttonVariants({
                            size: 'sm',
                            className: 'mt-5',
                            variant: 'ghost'
                        })} href='/dashboard' >
                            <ArrowLeft className='ml-2 h-5 w-5' />
                        </Link>
                        <h1 className='font-bold text-3xl mt-3  text-gray-900'>
                            {program.name}
                        </h1>
                    </div>

                    <ShareButton userProgram={userProgram} />
                </div>
                <div className="mx-auto max-w-7xl  px-5 ">
                    <EnrollButton userProgram={userProgram} />
                </div>

                <div className='flex-1 justify-between flex flex-col'>
                    <div className='mx-auto w-full max-w-8xl grow flex-row-reverse lg:flex xl:px-0 '>
                        <div className='flex-1 xl:flex lg:border-l lg:border-t-0 px-3'>
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
            </main >
        </>
    )
}

export default Page