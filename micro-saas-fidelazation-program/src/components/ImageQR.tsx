'use client'

import { ArrowLeftCircle } from "lucide-react"
import { buttonVariants } from "./ui/button"
import Link from "next/link"

interface imageQRprops {
    url: string,
    description: string
}
const ImageQR = ({ url, description }: imageQRprops) => {



    const myURL = 'http://localhost:3000/'
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${myURL + url}`

    return (
        <>
            <div className=" mt-11 flex items-center justify-center  ">

                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-auto">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4 text-center text-orange-600">¡Felicidades!</h1>
                        <p className="text-gray-700 mb-6">
                            {description}
                        </p>
                    </div>
                    <img
                        src={qrUrl}
                        alt="Código QR"
                        className="mx-auto max-w-full h-auto mb-6"
                    />
                    <p className="text-gray-600 text-center text-sm">
                        Recuerda reclamar antes de la fecha de vencimiento.
                    </p>
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
            </div>
        </>
    )
}

export default ImageQR