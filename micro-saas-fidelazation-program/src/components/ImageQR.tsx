'use client'

interface imageQRprops {
    url: string
}
const ImageQR = (url: imageQRprops) => {
    const myURL = 'http://localhost:3000/product/'
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${myURL + url.url}`

    return (
        <>
            <div className=" mt-11 flex items-center justify-center  ">

                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-auto">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4 text-center text-orange-600">¡Felicidades!</h1>
                        <p className="text-gray-700 mb-6">
                            Has ganado puntos. Escanea el siguiente código QR para reclamar tus recompensas.
                        </p>
                    </div>
                    <img
                        src={qrUrl}
                        alt="Código QR"
                        className="mx-auto max-w-full h-auto mb-6"
                    />
                    <p className="text-gray-600 text-center text-sm">
                        Recuerda reclamar tus puntos antes de la fecha de vencimiento.
                    </p>
                </div>
            </div>
        </>
    )
}

export default ImageQR