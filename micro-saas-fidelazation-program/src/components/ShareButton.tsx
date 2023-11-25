import { Share2 } from "lucide-react"
import Link from "next/link";
import { buttonVariants } from "./ui/button";

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


interface ShareButtonProps {
    userProgram: UserProgram
}
const ShareButton = ({ userProgram }: ShareButtonProps) => {

    const { id, name, programId, pointValue, reward, pointsGoal } = userProgram
    return (<>
        <div className='mb-3  flex  flex-row items-center'>
            <Link className={buttonVariants({
                size: 'sm',
                className: 'mt-5 text-3xl  ',
                variant: 'ghost'
            })}
                href={`/product?id=${id}&name=${name}&programid=${programId}&pointValue=${pointValue}&reward=${reward}&pointsGoal=${pointsGoal}`} >
                <h1 className='font-bold text-2xl   text-gray-900 sm:inline hidden'>
                    Compartir
                </h1>
                <Share2 className='ml-2 h-5 w-5 mt-2' />
            </Link>
        </div>
    </>)
}

export default ShareButton