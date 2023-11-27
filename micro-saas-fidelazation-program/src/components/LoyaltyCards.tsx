"use client"

import { trpc } from "@/app/_trpc/client"
import { Coins, Ghost, Goal, Heart, Leaf, Loader2, MessageSquare, Minus, Plus, Trash, User } from "lucide-react"
import Skeleton from "react-loading-skeleton"
import Link from "next/link"
import { Button } from "./ui/button"
import { format } from "date-fns"
import { useState } from 'react';
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CardList from "./CardList"

const LoyaltyCards = () => {


    const utils = trpc.useUtils()
    const { data: UserPrograms, isLoading } = trpc.getUserPrograms.useQuery()


    return (<>
        <div>
            {UserPrograms && UserPrograms?.length !== 0 ? (
                <section>
                    <Tabs defaultValue="isActive" className="w-full">
                        <TabsList>
                            <TabsTrigger className="text-md" value="isActive">Activos</TabsTrigger>
                            <TabsTrigger className="text-md" value="noActive">Inactivos</TabsTrigger>
                            <TabsTrigger className="text-md" value="isExpired">Vencidos</TabsTrigger>
                            <TabsTrigger className="text-md" value="isDeleted">Eliminados</TabsTrigger>
                            <TabsTrigger className="text-md" value="all">Todos</TabsTrigger>

                        </TabsList>
                        <TabsContent value="isActive">
                            <CardList UserPrograms={UserPrograms} filterValue="isActive" />
                        </TabsContent>
                        <TabsContent value="noActive">
                            <CardList UserPrograms={UserPrograms} filterValue="noActive" />
                        </TabsContent>
                        <TabsContent value="isExpired">
                            <CardList UserPrograms={UserPrograms} filterValue="isExpired" />
                        </TabsContent>
                        <TabsContent value="isDeleted">
                            <CardList UserPrograms={UserPrograms} filterValue="isDeleted" />
                        </TabsContent>
                        <TabsContent value="all">
                            <CardList UserPrograms={UserPrograms} filterValue="all" />
                        </TabsContent>
                    </Tabs>

                </section>
            ) : isLoading ? (
                <Skeleton height={100} className='my-2' count={5} />
            ) : (
                <div className='mt-16 flex flex-col items-center gap-2'>
                    <Leaf className='h-8 w-8 text-zinc-800' />
                    <h3 className='font-semibold text-xl'>
                        No hay programas por aquí
                    </h3>
                    {/* <p>¡Crea uno!</p> */}
                </div>)}

        </div>
    </>)
}


export default LoyaltyCards