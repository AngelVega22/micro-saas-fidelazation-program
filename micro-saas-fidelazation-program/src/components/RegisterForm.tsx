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
    pointId: string
}

const RegisterForm = ({ pointId }: RegisterFormProps) => {
    const { mutate: createCustomer, data, isLoading } = trpc.createCustomer.useMutation({
        onSuccess: () => {
            redirect('/auth-callback?origin=point-registation')
        }
    });

    if (isLoading) redirect('/auth-callback?origin=point-registation')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
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

            <div className="">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-11 sm:w-80 sm:m-auto sm:mt-11">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo</FormLabel>
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
                        <Button type="submit">Registrar punto</Button>
                    </form>
                </Form>
            </div>
        </MaxWidthWrapper>
    </>)
}

export default RegisterForm