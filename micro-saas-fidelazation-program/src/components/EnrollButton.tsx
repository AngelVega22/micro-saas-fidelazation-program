"use client"

import { QrCode } from "lucide-react"
import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

interface EnrollButtonProps {
    userProgram: UserProgram
}
const EnrollButton = ({ userProgram }: EnrollButtonProps) => {
    const router = useRouter();
    const [pointsId, setPointsId] = useState<string | null>(null);

    const { mutate: createUserProgramPoint } = trpc.createUserProgramPoint.useMutation({
        onSuccess: (Points) => {
            const newPointsId: string = Points.id;
            setPointsId(newPointsId);
            router.push(`/product/${Points.id}`)
        }
    });

    const handleClick = () => {
        const transactionData = {
            points: userProgram.pointValue,
            userProgramId: userProgram.id
        };
        createUserProgramPoint(transactionData);
    };
    return (
        <>
            <Button
                onClick={handleClick}
                className={buttonVariants({
                    className: 'mt-5 w-full ',
                    variant: "default"
                })}
            >
                <QrCode />
            </Button>

        </>
    )
}

export default EnrollButton