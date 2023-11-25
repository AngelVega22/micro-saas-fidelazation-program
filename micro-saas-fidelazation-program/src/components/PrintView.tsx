"use client"

import { ArrowLeftCircle } from "lucide-react"
import { buttonVariants } from "./ui/button"
import Link from "next/link"

interface PrintViewprops {
    url: string,
}
const PrintView = ({ url }: PrintViewprops) => {
    const myURL = 'http://localhost:3000/'
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${myURL + url}`
    const handlePrint = () => {
        window.print();
    };
    return (<>
        <div className=" mt-11 flex w-full items-center justify-center  ">


            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full mx-auto">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4 text-center text-orange-600">¡Regístrate!</h1>

                </div>
                <img
                    src={qrUrl}
                    alt="Código QR"
                    className="mx-auto max-w-full h-auto mb-6"
                />

            </div>

        </div>
        <div className="  flex items-center justify-center  ">
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
            <button className={buttonVariants({
                size: 'lg',
                className: 'mt-5 w-80 border rounded-3xl gap-2  ',
                variant: 'ghost'
            })} onClick={handlePrint}>Imprimir</button>
        </div>
    </>)
}

export default PrintView