"use client"

import { Coins, Goal, Trophy } from "lucide-react"
import { Badge } from "./ui/badge"
import { format } from "date-fns"
import Link from "next/link";
import { buttonVariants } from '@/components/ui/button';
import RedeemButton from "./RedeemButton";

interface UserProgram {
    id: string;
    name: string;
    isActive: boolean;
    isDeleted: boolean;
    comment?: string | null;
    created_at: string;
    updated_at: string;
    pointsAmount: number;
    pointValue: number;
    reward: string;
    pointsGoal: number;
    userId?: string | null;
    programId: string;
}

interface CardListProps {
    UserPrograms: UserProgram[];
    filterValue?: string;
}
const CardList = ({ UserPrograms, filterValue }: CardListProps) => {

    const filteredPrograms = UserPrograms.filter((userProgram) => {
        if (filterValue === "isActive") {
            return userProgram.isActive && !userProgram.isDeleted;
        } else if (filterValue === "noActive") {
            return !userProgram.isActive && !userProgram.isDeleted;
        } else if (filterValue === "isDeleted") {
            return userProgram.isDeleted;
        } else {
            return userProgram;
        }
    });
    return (<>

        <ul className='mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3 '>
            {filteredPrograms
                .sort(
                    (a, b) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                ).map((userProgram) => (
                    <li key={userProgram.id}
                        className='col-span-1 border divide-y divide-gray-200 rounded-lg bg-white shadow-sm transition hover:shadow-lg'
                    >

                        <section>
                            <div className="w-full    mx-auto px-1 py-4">
                                <div className="h-full  bg-white  pb-5 pt-8 px-0 sm:px-2">
                                    <div className="flex flex-col">
                                        <div className="flex justify-end -mb-7 text-gray-400">

                                        </div>
                                        <div className="flex flex-col md:flex-row items-center   md:items-start">
                                            {userProgram.isActive ?
                                                (<div className='h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-orange-400 to-orange-700' />
                                                ) :
                                                (<div className='h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-gray-200 to-white-500' />
                                                )
                                            }
                                            <div className="pl-5 flex flex-col items-start">
                                                <h3 className="text-xl font-semibold">{userProgram.name}</h3>
                                                <span className="text-sm tracking-tight text-gray-900 mb-2">
                                                    Premio: {userProgram.reward}
                                                </span>
                                                <span className="text-sm tracking-tight text-gray-500">
                                                    Registrado:  {format(new Date(userProgram.created_at), 'dd MMM yyyy')}
                                                </span>

                                                <div className="flex flex-wrap gap-10 justify-between mt-1">
                                                    <div className="text-sm mt-1">
                                                        {userProgram.isActive && !userProgram.isDeleted ? (
                                                            <Badge variant="default">Activo</Badge>
                                                        ) : userProgram.isDeleted ? (
                                                            <Badge variant="outline">Eliminado</Badge>
                                                        ) : (
                                                            <Badge variant="outline">Inactivo</Badge>
                                                        )}
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        <div className="flex  pt-5 text-center">
                                            <div className="flex-1 gap-5 flex justify-center  items-center px-1 border-r-2 text-gray-700">
                                                <div className="hover:scale-110 transition-all   ">
                                                    <Coins />
                                                </div>
                                                <div className="flex flex-col items-start">
                                                    <h4 className="text-xl md:text-2xl xl:text-3xl font-bold">{userProgram.pointsAmount}</h4>
                                                    <span className="text-xs md:text-sm tracking-tight text-gray-500"><span className="hidden sm:inline">Puntos</span> </span>
                                                </div>
                                            </div>


                                            <div className="flex-1 gap-5 flex justify-center  items-center px-1   text-gray-700">
                                                <div className="hover:scale-110 transition-all   ">
                                                    <Goal />
                                                </div>
                                                <div className="flex flex-col items-start">
                                                    <h4 className="text-xl md:text-2xl xl:text-3xl font-bold">{userProgram.pointsGoal}</h4>
                                                    <span className="text-xs md:text-sm tracking-tight text-gray-500"> Meta</span>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                {userProgram.pointsAmount >= userProgram.pointsGoal && userProgram.isActive ? (
                                    <div className="flex flex-col items-center">

                                        <RedeemButton userProgram={userProgram} />

                                    </div>

                                ) : (
                                    <div className="hidden"></div>
                                )}

                            </div>

                        </section>
                    </li>
                ))}
        </ul>

    </>)
}


export default CardList