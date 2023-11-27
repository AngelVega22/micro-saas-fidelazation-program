"use client"

import { trpc } from "@/app/_trpc/client"
import { Ghost, Leaf, Loader2, MessageSquare, Minus, Plus, Trash } from "lucide-react"
import Skeleton from "react-loading-skeleton"
import Link from "next/link"
import { Button } from "./ui/button"
import { format } from "date-fns"
import { useState } from 'react';
import { Badge } from "./ui/badge"

const ProductList = () => {

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
    const filteredUserPrograms = UserPrograms?.filter(item => !item.isDeleted)

    return (<>
        <div>
            {filteredUserPrograms && filteredUserPrograms?.length !== 0 ? (
                <ul className='mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-1'>
                    {filteredUserPrograms
                        // .filter(userProgram => !userProgram.isDeleted)  // Filtra solo los programas no eliminados
                        .sort(
                            (a, b) =>
                                new Date(b.created_at).getTime() -
                                new Date(a.created_at).getTime()
                        )
                        .map((UserProgram) => (
                            <li key={UserProgram.id}
                                className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg'
                            >
                                <Link
                                    href={`/dashboard/${UserProgram.id}`}
                                    className="flex flex-col gap-2"
                                >
                                    <div className='pt-6 px-6 flex w-full items-center justify-between space-x-6'>
                                        {UserProgram.isActive ?
                                            (<div className='h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-orange-400 to-orange-700' />
                                            ) :
                                            (<div className='h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-gray-200 to-white-500' />
                                            )
                                        }
                                        <div className='flex-1 truncate'>
                                            <div className='flex items-center space-x-3'>
                                                <h3 className='truncate text-lg font-medium text-zinc-900'>
                                                    {UserProgram.name}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className='px-6 mt-4 grid lg:grid-cols-6 grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500'>
                                    <div className=" lg:block hidden items-center   gap-5 ">
                                    </div>
                                    <div className=" lg:block hidden items-center   gap-5 ">
                                    </div>
                                    <div className="   items-center   gap-2 ">

                                        <strong>Creado:</strong>
                                        <br />
                                        {format(
                                            new Date(UserProgram.created_at),
                                            'dd MMM yyyy'
                                        )}
                                    </div>

                                    <div className='lg:block hidden  items-center   gap-5'>
                                        <strong>Actualizado:</strong>
                                        <br />
                                        {format(
                                            new Date(UserProgram.created_at),
                                            'dd MMM yyyy'
                                        )}
                                    </div>

                                    <div className='flex items-center gap-5'>
                                        {UserProgram.isActive && !UserProgram.isExpired ? (
                                            <Badge variant="default">Activo</Badge>
                                        ) : UserProgram.isExpired ? (
                                            <Badge variant="outline">Vencido</Badge>
                                        ) : (
                                            <Badge variant="outline">Inactivo</Badge>
                                        )}
                                    </div>

                                    <Button
                                        onClick={() =>
                                            deleteUserProgram({ id: UserProgram.id })
                                        }
                                        size='sm'
                                        className='w-full'
                                        variant='destructive'>
                                        {currentlyDeletingUserProgram === UserProgram.id ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (<Trash className='h-4 w-4' />)}
                                    </Button>
                                </div>
                            </li>
                        ))}
                </ul>
            ) : isLoading ? (
                <Skeleton height={100} className='my-2' count={5} />
            ) : (
                <div className='mt-16 flex flex-col items-center gap-2'>
                    <Leaf className='h-8 w-8 text-zinc-800' />
                    <h3 className='font-semibold text-xl'>
                        No hay programas por aquí
                    </h3>
                    <p>¡Crea uno!</p>
                </div>
            )}

        </div>
    </>)
}


export default ProductList