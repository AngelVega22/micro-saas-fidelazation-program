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
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { trpc } from "@/app/_trpc/client"
import { Toaster } from "./ui/toaster"
import { useToast } from "./ui/use-toast"
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(2, { message: 'Debe tener 2 letras mínimo' }).max(50, { message: 'Debe tener máximo 50 letras' }),
    description: z.string().max(255, { message: 'Debe tener máximo 255 letras' }),
    programRules: z.string().min(10).max(255, { message: 'Debe tener máximo 255 letras' }),
    pointValue: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), { message: "Escribe un número" }),
    reward: z.string().min(2, { message: 'Debe tener 2 letras mínimo' }).max(50, { message: 'Debe tener máximo 50 letras' }),
    pointsGoal: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), { message: "Escribe un número" }),
    startDate: z.date(),
    endDate: z.date(),
    // userCreate: z.string(),
})

interface Program {
    id: string;
    name: string;
    description: string;
    programRules: string;
    isActive: boolean;
    isDeleted: boolean;
    startDate: Date;
    endDate: Date;
    created_at: Date;
    updated_at: Date;
    userCreate: string;
    userUpdate: string | null;
}
interface UserProgram {
    id: string;
    name: string;
    isActive: boolean;
    isDeleted: boolean;
    comment?: string | null;
    created_at: Date;
    updated_at: Date;
    pointsAmount: number;
    pointValue: number;
    reward: string;
    pointsGoal: number;
    userId?: string | null;
    programId: string;
}

interface EditCardProps {
    program: Program;
    userProgram: UserProgram
}
const EditCard = ({ program, userProgram }: EditCardProps) => {
    const { toast } = useToast()
    const router = useRouter();
    const time = new Date().toLocaleDateString('es-es', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
    const [currentlyCreatingUserProgram, setCurrentlyCreatingUserProgram] = useState<string | null>(
        null
    )

    const { mutate: updateUserProgram, isSuccess } = trpc.updateUserProgram.useMutation({
        onSuccess: () => {

            toast({
                title: "Actualizado",
                description: `Información actualizada el ${time} `,
            })

        },
        onSettled: () => {
            router.refresh();

            // window.location.reload();

        }
    });


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: program.name,
            description: program.description,
            programRules: program.programRules,
            pointValue: (userProgram.pointValue).toString(),
            reward: userProgram.reward,
            pointsGoal: (userProgram.pointsGoal).toString(),
            startDate: program.startDate,
            endDate: program.endDate,
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {

        // console.log(values)
        const startDate = values.startDate ? values.startDate.toISOString() : '';
        const endDate = values.endDate ? values.endDate.toISOString() : '';

        const programData = {
            id: program.id,
            userProgramId: userProgram.id,
            name: values.name,
            programRules: values.programRules,
            description: values.description,
            pointValue: values.pointValue,
            reward: values.reward,
            pointsGoal: values.pointsGoal,
            startDate: startDate,
            endDate: endDate,
        };
        updateUserProgram(programData);
    }

    return (
        <>
            <Card className="w-full space-y-2">
                <CardHeader>
                    <CardTitle className=" font-bold text-2xl text-gray-900">
                        Edita tu programa
                        <Toaster />

                    </CardTitle>
                    <CardDescription>Puedes editar el programa aquí</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 ">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (

                                    <FormItem>
                                        <FormLabel className="text-gray-900">Nombre</FormLabel>
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
                                name="pointValue"
                                render={({ field }) => (

                                    <FormItem>
                                        <FormLabel className="text-gray-900">Valor de punto</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Valor de punto" {...field} />
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
                                name="reward"
                                render={({ field }) => (

                                    <FormItem>
                                        <FormLabel className="text-gray-900">Recompensa</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Recompensa" {...field} />
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
                                name="pointsGoal"
                                render={({ field }) => (

                                    <FormItem>
                                        <FormLabel className="text-gray-900">Meta</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Meta" {...field} />
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
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col ">
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
                            <Button className="w-full" type="submit" >Editar</Button>
                        </form>
                    </Form>
                </CardContent>
                {/* <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Editar</Button>
                </CardFooter> */}
            </Card>
        </>
    )
}

export default EditCard