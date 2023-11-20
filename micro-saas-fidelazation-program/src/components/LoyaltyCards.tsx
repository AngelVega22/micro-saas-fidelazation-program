"use client"

import { trpc } from "@/app/_trpc/client"
import { Coins, Ghost, Goal, Loader2, MessageSquare, Minus, Plus, Trash, User } from "lucide-react"
import Skeleton from "react-loading-skeleton"
import Link from "next/link"
import { Button } from "./ui/button"
import { format } from "date-fns"
import { useState } from 'react';
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CardList from "./CardList"

const LoyaltyCards = () => {

    const [currentlyDeletingUserProgram, setCurrentlyDeletingUserProgram] = useState<string | null>(
        null
    )
    const utils = trpc.useUtils()
    const { data: UserPrograms, isLoading } = trpc.getUserPrograms.useQuery()
    const { mutate: deleteUserProgram } = trpc.deleteUserProgram.useMutation({
        onSuccess: () => {
            utils.getUserPrograms.invalidate()
        },
        onMutate({ id }) {
            setCurrentlyDeletingUserProgram(id)
        },
        onSettled() {
            setCurrentlyDeletingUserProgram(null)
        }
    })

    return (<>
        <div>
            {UserPrograms && UserPrograms?.length !== 0 ? (
                <section>
                    <Tabs defaultValue="isActive" className="w-full">
                        <TabsList>
                            <TabsTrigger className="text-md" value="isActive">Activos</TabsTrigger>
                            <TabsTrigger className="text-md" value="noActive">Inactivos</TabsTrigger>
                            <TabsTrigger className="text-md" value="isDeleted">Eliminados</TabsTrigger>
                            <TabsTrigger className="text-md" value="all">Todos</TabsTrigger>

                        </TabsList>
                        <TabsContent value="isActive">
                            <CardList UserPrograms={UserPrograms} filterValue="isActive" />
                        </TabsContent>
                        <TabsContent value="noActive">
                            <CardList UserPrograms={UserPrograms} filterValue="noActive" />
                        </TabsContent>
                        <TabsContent value="isDeleted">
                            <CardList UserPrograms={UserPrograms} filterValue="isDeleted" />
                        </TabsContent>
                        <TabsContent value="all">
                            <CardList UserPrograms={UserPrograms} filterValue="all" />
                        </TabsContent>
                    </Tabs>

                    {/* <ul className='mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3 '>
                        {UserPrograms
                            .sort(
                                (a, b) =>
                                    new Date(b.created_at).getTime() -
                                    new Date(a.created_at).getTime()
                            )
                            .map((UserProgram) => (
                                <li key={UserProgram.id}
                                    className='col-span-1 border divide-y divide-gray-200 rounded-lg bg-white shadow-sm transition hover:shadow-lg'
                                >

                                    <section>
                                        <div className="w-full    mx-auto px-1 py-4">
                                            <div className="h-full  bg-white  pb-5 pt-8 px-0 sm:px-2">
                                                <div className="flex flex-col">
                                                    <div className="flex justify-end -mb-7 text-gray-400">

                                                    </div>
                                                    <div className="flex flex-col md:flex-row items-center   md:items-start">
                                                        {UserProgram.isActive ?
                                                            (<div className='h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-orange-400 to-orange-700' />
                                                            ) :
                                                            (<div className='h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-gray-200 to-white-500' />
                                                            )
                                                        }
                                                        <div className="pl-5 flex flex-col items-start">
                                                            <h3 className="text-xl font-semibold">{UserProgram.name}</h3>
                                                            <span className="text-sm tracking-tight text-gray-900 mb-2">
                                                                Premio: {UserProgram.reward}
                                                            </span>
                                                            <span className="text-sm tracking-tight text-gray-500">
                                                                Registrado:  {format(new Date(UserProgram.created_at), 'dd MMM yyyy')}
                                                            </span>

                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                <div className="text-sm mt-1">
                                                                    {UserProgram.isActive && !UserProgram.isDeleted ? (
                                                                        <Badge variant="default">Activo</Badge>
                                                                    ) : UserProgram.isDeleted ? (
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
                                                                <h4 className="text-xl md:text-2xl xl:text-3xl font-bold">{UserProgram.pointsAmount}</h4>
                                                                <span className="text-xs md:text-sm tracking-tight text-gray-500"><span className="hidden sm:inline">Puntos</span> </span>
                                                            </div>
                                                        </div>


                                                        <div className="flex-1 gap-5 flex justify-center  items-center px-1   text-gray-700">
                                                            <div className="hover:scale-110 transition-all   ">
                                                                <Goal />
                                                            </div>
                                                            <div className="flex flex-col items-start">
                                                                <h4 className="text-xl md:text-2xl xl:text-3xl font-bold">{UserProgram.pointsGoal}</h4>
                                                                <span className="text-xs md:text-sm tracking-tight text-gray-500"> Meta</span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </li>
                            ))}
                    </ul> */}
                </section>
            ) : isLoading ? (
                <Skeleton height={100} className='my-2' count={5} />
            ) : (
                <div className='mt-16 flex flex-col items-center gap-2'>
                    <Ghost className='h-8 w-8 text-zinc-800' />
                    <h3 className='font-semibold text-xl'>
                        No hay programas por aquí
                    </h3>
                    <p>¡Crea uno!</p>
                </div>)}

        </div>
    </>)
}


export default LoyaltyCards