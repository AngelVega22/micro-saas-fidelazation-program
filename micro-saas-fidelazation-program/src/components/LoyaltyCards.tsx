"use client"

import { trpc } from "@/app/_trpc/client"
import { Ghost, Loader2, MessageSquare, Minus, Plus, Trash, User } from "lucide-react"
import Skeleton from "react-loading-skeleton"
import Link from "next/link"
import { Button } from "./ui/button"
import { format } from "date-fns"
import { useState } from 'react';
import { Badge } from "./ui/badge"

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
                <ul className='mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3 '>
                    {UserPrograms
                        .sort(
                            (a, b) =>
                                new Date(b.created_at).getTime() -
                                new Date(a.created_at).getTime()
                        )
                        .map((UserProgram) => (
                            <li key={UserProgram.id}
                                className='col-span-1 border divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg'
                            >
                                <div className="p-4">
                                    <div className="flex items-center mb-4">
                                        <div className="h-16 w-16 flex-shrink-0 rounded-full bg-gradient-to-r from-orange-400 to-orange-700 text-white flex items-center justify-center text-xl font-bold">
                                            {UserProgram.pointsAmount}pts.
                                        </div>
                                        <div className="ml-4">
                                            <div className="font-bold text-lg">{UserProgram.name}</div>
                                            <div className="text-sm">Puntos acumulados</div>
                                            <div className="text-sm">Meta: {UserProgram.pointsGoal}</div>
                                            <div className="text-sm mt-1">
                                                {UserProgram.isActive ? (
                                                    <Badge variant="default">Activo</Badge>
                                                ) : (
                                                    <Badge variant="outline">Inactivo</Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <div className="px-1   grid lg:grid-cols-3 grid-cols-2 place-items-center py-0 gap-4 text-xs text-zinc-500">
                                        <div className='items-center'>
                                            <strong>Premio:</strong>
                                            <br />
                                            {UserProgram.reward}
                                        </div>
                                        <div className="items-center">
                                            <strong>Registrado:</strong>
                                            <br />
                                            {format(new Date(UserProgram.created_at), 'dd MMM yyyy')}
                                        </div>
                                        <div className='lg:block hidden items-center'>
                                            <strong>Actualizado:</strong>
                                            <br />
                                            {format(new Date(UserProgram.created_at), 'dd MMM yyyy')}
                                        </div>
                                    </div>
                                </div>

                            </li>
                        ))}
                </ul>
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