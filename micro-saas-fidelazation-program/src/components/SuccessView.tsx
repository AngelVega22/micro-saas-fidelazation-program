"use client"

import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { ArrowLeftCircle } from "lucide-react"

interface SuccessView {
    point: number | undefined
}


const SuccessView = ({ point }: SuccessView) => {

    return (<>
        <div className="flex flex-col items-center justify-center  mt-11 ">
            <div className="bg-white p-8 rounded-md shadow-md text-center">
                <h1 className="text-4xl font-bold mb-4 text-green-500">🎉 ¡Éxito! 🎉</h1>
                <p className="text-lg text-gray-700">¡La transacción de {point} puntos se completó con éxito! 🚀</p>
            </div >

            <Link
                className={buttonVariants({
                    size: 'lg',
                    className: 'mt-5 w-80 border rounded-3xl gap-2  ',
                    variant: 'ghost'
                })}
                href='/dashboard'
            >
                <ArrowLeftCircle className='ml-2 h-5 w-5' />
                Volver
            </Link>
        </div >


    </>)
}

export default SuccessView