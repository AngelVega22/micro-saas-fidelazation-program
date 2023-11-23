"use client"

import { QrCode, Trophy } from "lucide-react"
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
    created_at: string;
    updated_at: string;
    pointsAmount: number;
    pointValue: number;
    reward: string;
    pointsGoal: number;
    userId?: string | null;
    programId: string;
}

interface RedeemButtonProps {
    userProgram: UserProgram
}
const RedeemButton = ({ userProgram }: RedeemButtonProps) => {
    const router = useRouter();
    const [pointsId, setPointsId] = useState<string | null>(null);

    const { mutate: createUserProgramPoint } = trpc.createUserProgramPoint.useMutation({
        onSuccess: (Points) => {
            const newPointsId: string = Points.id;
            setPointsId(newPointsId);
            router.push(`/transaction/${Points.id}`)
        }
    });

    const handleClick = () => {
        const transactionData = {
            points: userProgram.pointsGoal,
            userProgramId: userProgram.id,
            transactionType: 'LOSE' as const
        };
        createUserProgramPoint(transactionData);
    };
    return (
        <>
            <Button
                onClick={handleClick}
                className={buttonVariants({
                    size: 'sm',
                    className: 'text-sm w-full gap-2',
                    variant: "default"
                })}
            >
                Reclamar premio <Trophy />
            </Button>

        </>
    )
}

export default RedeemButton