"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import MaxWidthWrapper from "./maxWidthWrapper"
import { trpc } from "@/app/_trpc/client"
import { redirect } from "next/navigation"

const formSchema = z.object({
    email: z.string()
        .min(1, { message: "Este campo hay que llenarlo." })
        .email("Este no es un correo electrónico válido.")
})

interface RegisterFormProps {
    pointId: string,
    email: string | null,
    point: number | undefined
}

const RegisterForm = ({ pointId, email, point }: RegisterFormProps) => {

    const { mutate: createCustomer, isLoading, data, isSuccess } = trpc.createCustomer.useMutation({
        onSuccess: () => {
            if (!email) {
                redirect('/auth-callback?origin=point-registation');
            } else {
                redirect('/dashboard');
            }
        },
        onSettled: () => {
            redirect('/dashboard')
        }
    });
    if (isLoading) {
        redirect('/dashboard')
    }

    if (isLoading && !email) redirect('/auth-callback?origin=point-registation')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: email ? email : '',
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(values)
        const customerEmail = {
            email: values.email,
            pointId: pointId
        }

        createCustomer(customerEmail)
    }


    return (<>
        <MaxWidthWrapper>
            {email ?
                (
                    <div className="flex items-center justify-center mt-11">
                        <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
                            <h1 className="text-3xl font-bold mb-4 text-center text-orange-600">¡Felicidades!</h1>
                            <div className="flex items-center justify-center">
                                <span className="text-8xl text-yellow-500">🎉</span>
                            </div>
                            <div className="flex flex-col items-center justify-center mt-5">

                                <Form {...form} >
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8   ">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (

                                                <FormItem className="hidden">
                                                    <FormLabel>Correo electrónico</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Correo electrónico" {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Introduce tu Correo electrónico
                                                    </FormDescription>
                                                    <FormMessage className="text-red-900" />
                                                </FormItem>
                                            )}
                                        />
                                        <Button className="w-full" type="submit">{point && point > 1 ? `Reclamar ${point} puntos` : `Reclamar  ${point} punto`}</Button>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                ) :
                (
                    <div className="flex items-center justify-center mt-11">
                        <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
                            <h1 className="text-3xl font-bold mb-4 text-center text-orange-600">¡Felicidades!</h1>
                            <div className="flex items-center justify-center">
                                <span className="text-8xl text-yellow-500">🎉</span>
                            </div>
                            <div className="flex flex-col items-center justify-center mt-11 ">
                                <Form {...form} >
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  w-full sm:w-80 sm:m-auto   ">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (

                                                <FormItem  >
                                                    <FormLabel>Correo electrónico</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Correo electrónico" {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Introduce tu Correo electrónico para reclamar
                                                    </FormDescription>
                                                    <FormMessage className="text-red-900" />
                                                </FormItem>
                                            )}
                                        />
                                        <Button className="w-full" type="submit">{point && point > 1 ? `Reclamar ${point} puntos` : `Reclamar  ${point} punto`}</Button>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                )}

        </MaxWidthWrapper>
    </>)
}

export default RegisterForm