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
        <div className="grid gap-4 md:grid-cols-2">

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Puntos totales
                    </CardTitle>
                    {/* <svg
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
                    </svg> */}
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
                    {/* <svg
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
                    </svg> */}
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
        <div className="grid gap-4 md:grid-cols-2">

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Clientes nuevos
                    </CardTitle>
                    {/* <svg
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
                    </svg> */}
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
                    {/* <svg
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
                    </svg> */}
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