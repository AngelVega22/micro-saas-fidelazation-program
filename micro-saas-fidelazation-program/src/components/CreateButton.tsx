"use client"

import { Dialog, DialogTrigger } from "@radix-ui/react-dialog"
import { useState } from "react"
import { Button } from "./ui/button"
import { DialogContent } from "./ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { trpc } from "@/app/_trpc/client"

const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().optional(),
    programRules: z.string().min(10),
    startDate: z.date(),
    endDate: z.date(),
    // userCreate: z.string(),
})


const CreateButton = () => {
    const [currentlyCreatingUserProgram, setCurrentlyCreatingUserProgram] = useState<string | null>(
        null
    )

    const { mutate: createUserProgram, isSuccess } = trpc.createUserProgram.useMutation({
        onSuccess: () => {
            setIsOpen(false)
            window.location.reload();
        }
    });


    const [isOpen, setIsOpen] = useState<boolean>(false)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            programRules: "",
            startDate: undefined,
            endDate: undefined,
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {

        // console.log(values)
        const startDate = values.startDate ? values.startDate.toISOString() : '';
        const endDate = values.endDate ? values.endDate.toISOString() : '';

        const programData = {
            name: values.name,
            programRules: values.programRules,
            description: values.description || '',
            startDate: startDate,
            endDate: endDate,
        };
        createUserProgram(programData);
    }


    return (
        <Dialog
            open={isOpen}
            onOpenChange={(v) => {
                if (!v) {
                    setIsOpen(v)
                }
            }}>
            <DialogTrigger
                onClick={() => setIsOpen(true)}
                asChild>
                <Button>Crear Programa</Button>
            </DialogTrigger>

            <DialogContent>
                <h4 className="mb-3 font-bold text-2xl text-gray-900">Registra tu programa</h4>
                <hr />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 ">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (

                                <FormItem>
                                    <FormLabel className="text-gray-900">Nombre del programa</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Nombre" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        Este es el nombre del programa que crearás
                                    </FormDescription> */}
                                    <FormMessage className="text-red-900" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (

                                <FormItem>
                                    <FormLabel className="text-gray-900">Descripción</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Descripción" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        Esta es la descripción del programa
                                    </FormDescription> */}
                                    <FormMessage className="text-red-900" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="programRules"
                            render={({ field }) => (

                                <FormItem>
                                    <FormLabel className="text-gray-900">Reglas</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Reglas" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        Estas son las reglas del programa
                                    </FormDescription> */}
                                    <FormMessage className="text-red-900" />
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Fecha de inicio</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>seleccione una fecha</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {/* <FormDescription>
                                        Your date of birth is used to calculate your age.
                                    </FormDescription> */}
                                    <FormMessage className="text-red-900" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Fecha de Finalización</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>seleccione una fecha</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {/* <FormDescription>
                                        Your date of birth is used to calculate your age.
                                    </FormDescription> */}
                                    <FormMessage className="text-red-900" />
                                </FormItem>
                            )}
                        />
                        <hr />
                        <Button className="w-full" type="submit" >Crear</Button>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}

export default CreateButton