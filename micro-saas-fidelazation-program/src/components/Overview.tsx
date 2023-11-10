import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
interface UserProgram {
    id: string;
    name: string;
    isActive: boolean;
    isDeleted: boolean;
    comment?: string | null;
    created_at: Date;
    updated_at: Date;
    pointsAmount: number;
    pointValue: number;
    reward: string;
    pointsGoal: number;
    userId?: string | null;
    programId: string;
}


interface OverviewProps {
    userProgram: UserProgram
}
const Overview = ({ userProgram }: OverviewProps) => {
    const { pointsAmount, pointsGoal } = userProgram
    return (<>
        <div className="grid gap-4 grid-cols-2">

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Puntos totales
                    </CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        className="lucide lucide-chevron-up-circle">
                        <circle cx="12" cy="12" r="10" /><path d="m8 14 4-4 4 4" /></svg>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{pointsAmount}</div>
                    {/* <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                    </p> */}
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Meta
                    </CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        className="lucide lucide-goal"><path d="M12 13V2l8 4-8 4" />
                        <path d="M20.55 10.23A9 9 0 1 1 8 4.94" /><path d="M8 10a5 5 0 1 0 8.9 2.02" /></svg>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{pointsGoal}</div>
                    {/* <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                    </p> */}
                </CardContent>
            </Card>
        </div>
        <br />
        <div className="grid gap-4  grid-cols-2">

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Clientes nuevos
                    </CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-user-plus-2">
                        <path d="M14 19a6 6 0 0 0-12 0" />
                        <circle cx="8" cy="9" r="4" /><line x1="19" x2="19" y1="8" y2="14" />
                        <line x1="22" x2="16" y1="11" y2="11" /></svg>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">14</div>
                    {/* <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                    </p> */}
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Clientes recurrentes
                    </CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">4</div>
                    {/* <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                    </p> */}
                </CardContent>
            </Card>
        </div>
    </>)
}

export default Overview