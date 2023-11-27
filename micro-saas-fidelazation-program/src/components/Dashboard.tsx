"use client"

import { trpc } from "@/app/_trpc/client"
import CreateButton from "./CreateButton"
import { Ghost, Loader2, MessageSquare, Minus, Plus, Trash } from "lucide-react"
import Skeleton from "react-loading-skeleton"
import Link from "next/link"
import { Button } from "./ui/button"
import { format } from "date-fns"
import { useState } from 'react';
import { Badge } from "./ui/badge"
import ProductList from "./ProductList"
import LoyaltyCards from "./LoyaltyCards"

const Dashboard = () => {

    const { data: user } = trpc.authCallback.useQuery()
    const userRole = user?.user?.role

    return (
        <main className='mx-auto max-w-7xl md:p-5 '>
            <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
                <h1 className='mb-3 font-bold text-3xl text-gray-900 pl-5'>
                    Programas
                </h1>
                <div className="pl-5">
                    {userRole === 'ADMIN' ? (
                        <CreateButton />
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
            <div className='px-5'>
                {userRole === 'ADMIN' ? (
                    <ProductList />
                ) : (
                    <LoyaltyCards />
                )}
            </div>
        </main>
    )
}

export default Dashboard