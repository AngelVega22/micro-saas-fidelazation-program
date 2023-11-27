import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db";
import Dashboard from "@/components/Dashboard";

const Page = async () => {
    const { getUser } = getKindeServerSession()
    const user = getUser()

    if (!user || !user.id) redirect('/auth-callback?origin=dashboard')

    const dbUser = await db.user.findFirst({
        where: {
            id: user.id
        }
    })

    if (!dbUser) redirect('/auth-callback?origin=dashboard')

    const userProgram = await db.userProgram.findMany({
        where: {
            userId: user.id
        }
    })

    const arrUserProgramIds = userProgram.map(item => item.programId);

    const programs = await db.program.findMany({
        where: {
            id: { in: arrUserProgramIds }
        }
    })

    const now = new Date();

    const expiredPrograms = programs.filter(item => new Date(item.endDate) < now);
    const expiredProgramIds = expiredPrograms.map(item => item.id);

    if (expiredProgramIds.length > 0) {
        await db.userProgram.updateMany({
            data: {
                isExpired: true
            },
            where: {
                programId: { in: expiredProgramIds }
            }
        })
    }

    const activePrograms = programs.filter(item => new Date(item.endDate) > now);
    const activeProgramsIds = activePrograms.map(item => item.id);

    if (activeProgramsIds.length > 0) {
        await db.userProgram.updateMany({
            data: {
                isExpired: false
            },
            where: {
                programId: { in: activeProgramsIds }
            }
        })
    }

    return <Dashboard />
}

export default Page