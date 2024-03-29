import MaxWidthWrapper from '@/components/maxWidthWrapper'
import { buttonVariants } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
// import { PLANS } from '@/config/stripe'
import { cn } from '@/lib/utils'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import {
    ArrowRight,
    Check,
    HelpCircle,
    Minus,
} from 'lucide-react'
import Link from 'next/link'

const Page = () => {
    const { getUser } = getKindeServerSession()
    const user = getUser()

    interface Feature {
        text: string;
        footnote?: string;
        negative?: boolean;
    }

    interface PricingItem {
        plan: string;
        tagline: string;
        quota?: number;
        price: number;
        features: Feature[];
    }

    const pricingItems: PricingItem[] = [
        {
            plan: 'Premium',
            tagline: 'Impulsa tu negocio con funciones exclusivas.',
            quota: 10,
            price: 9.90,
            features: [
                {
                    text: '1 año',
                    footnote:
                        'The maximum amount of pages per PDF-file.',
                },
                {
                    text: 'Programas ilimitados',
                    footnote:
                        'The maximum file size of a single PDF file.',
                },
                {
                    text: 'Consultoría Estratégica',
                    footnote:
                        'The maximum file size of a single PDF file.',
                    negative: true,
                },
                {
                    text: 'Analytics',
                    footnote:
                        'Better algorithmic responses for enhanced content quality',
                    negative: true,
                },
                {
                    text: 'Soporte prioritario',
                    negative: true,
                },
            ],
        },
        {
            plan: 'Pro',
            tagline: 'Optimiza la lealtad del cliente empresarial.',
            // quota: PLANS.find((p) => p.slug === 'pro')!.quota,
            price: 12.90,
            features: [
                {
                    text: '1 año',
                    footnote:
                        'The maximum amount of pages per PDF-file.',
                },
                {
                    text: 'Programas ilimitados',
                    footnote:
                        'The maximum file size of a single PDF file.',
                },
                {
                    text: 'Consultoría Estratégica',
                    footnote:
                        'The maximum file size of a single PDF file.',
                },
                {
                    text: 'Analytics',
                    footnote:
                        'Better algorithmic responses for enhanced content quality',
                    negative: true,

                },
                {
                    text: 'Soporte prioritario',
                    negative: true,

                },
            ],
        },
        {
            plan: 'Avanzado',
            tagline: 'Mejora la relación con tus clientes e incrementa tus ventas.',
            // quota: PLANS.find((p) => p.slug === 'pro')!.quota,
            price: 19.90,
            features: [
                {
                    text: '1 año',
                    footnote:
                        'The maximum amount of pages per PDF-file.',
                },
                {
                    text: 'Programas ilimitados',
                    footnote:
                        'The maximum file size of a single PDF file.',
                },
                {
                    text: 'Consultoría Estratégica',
                    footnote:
                        'The maximum file size of a single PDF file.',
                },
                {
                    text: 'Analytics',
                    footnote:
                        'Better algorithmic responses for enhanced content quality',
                },
                {
                    text: 'Soporte prioritario',
                },
            ],
        },
    ]
    return (
        <>
            <MaxWidthWrapper className='mb-8 mt-5 text-center max-w-6xl'>
                <div className='mx-auto mb-2 sm:max-w-lg'>
                    <h1 className='text-6xl font-bold sm:text-7xl'>
                        Planes
                    </h1>
                    <p className='mt-2 text-gray-600 sm:text-lg'>
                        Mejora la retención y fidelidad de tus clientes con nuestras soluciones escalables.
                    </p>
                </div>

                <div className='pt-12 grid grid-cols-1 gap-5 lg:grid-cols-3'>
                    <TooltipProvider>
                        {pricingItems.map(
                            ({ plan, tagline, price, quota, features }) => {
                                // const price =
                                //   PLANS.find(
                                //     (p) => p.slug === plan.toLowerCase()
                                //   )?.price.amount || 0

                                return (
                                    <div
                                        key={plan}
                                        className={cn(
                                            'relative rounded-xl bg-white shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100',
                                            {
                                                'border-2 border-orange-600 shadow-orange-200':
                                                    plan === 'Pro',
                                                'border border-gray-200':
                                                    plan !== 'Pro',
                                            }
                                        )}>
                                        {plan === 'Pro' && (
                                            <div className='absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-orange-600 to-orange-400 px-3 py-2 text-sm font-medium text-white'>
                                                Más vendido
                                            </div>
                                        )}
                                        <div className='px-5 pt-5 pb-1'>
                                            <h3 className='my-3 text-center font-display text-3xl font-bold'>
                                                {plan}
                                            </h3>
                                            <p className='text-gray-500'>
                                                {tagline}
                                            </p>
                                            <p className='my-5 font-display text-5xl font-bold'>
                                                <span className='text-2xl'>S/</span>
                                                {price.toFixed(2)}
                                                <span className='text-sm text-center text-gray-500  '>/mes</span>
                                            </p>

                                            <span className='text-md  font-bold text-center text-orange-600 '>
                                                + 1 mes gratis
                                            </span>

                                        </div>

                                        {/* <div className='flex h-10 items-center justify-center border-b border-t border-gray-200 bg-gray-50'>
                                            <div className='flex items-center space-x-1'>
                                                <p>

                                                </p>

                                                <Tooltip delayDuration={300}>
                                                    <TooltipTrigger className='cursor-default ml-1.5'>
                                                        <HelpCircle className='h-4 w-4 text-zinc-500' />
                                                    </TooltipTrigger>
                                                    <TooltipContent className='w-80 p-2'>
                                                        How many PDFs you can upload per
                                                        month.
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                        </div> */}

                                        <div className='p-5'>
                                            {plan === 'Free' ? (
                                                <Link
                                                    href={
                                                        user ? '/dashboard' : '/sign-in'
                                                    }
                                                    className={buttonVariants({
                                                        className: 'w-full',
                                                        variant: 'secondary',
                                                    })}>
                                                    {user ? 'Upgrade now' : 'Empieza gratis'}
                                                    <ArrowRight className='h-5 w-5 ml-1.5' />
                                                </Link>
                                            ) : user ? (
                                                // <UpgradeButton />
                                                <div></div>
                                            ) : (
                                                <Link
                                                    href='/api/auth/register'
                                                    className={buttonVariants({
                                                        className: 'w-full',
                                                    })}>
                                                    {user ? 'Upgrade now' : 'Empieza gratis'}
                                                    <ArrowRight className='h-5 w-5 ml-1.5' />
                                                </Link>
                                            )}
                                        </div>
                                        <p className='text-gray-400 text-sm mb-5'>
                                            <span className='text-sm'>S/</span>
                                            {price + 9.99}
                                            <span className='text-sm text-center text-gray-400  '>/mes al renovar</span>
                                        </p>
                                        <div className='border-t border-gray-200' />

                                        <ul className='my-10 space-y-5 px-8'>
                                            {features.map(
                                                ({ text, footnote, negative }) => (
                                                    <li
                                                        key={text}
                                                        className='flex space-x-5'>
                                                        <div className='flex-shrink-0'>
                                                            {negative ? (
                                                                <Minus className='h-6 w-6 text-gray-300' />
                                                            ) : (
                                                                <Check className='h-6 w-6 text-orange-500' />
                                                            )}
                                                        </div>
                                                        {footnote ? (
                                                            <div className='flex items-center space-x-1'>
                                                                <p
                                                                    className={cn(
                                                                        'text-gray-600',
                                                                        {
                                                                            'text-gray-400':
                                                                                negative,
                                                                        }
                                                                    )}>
                                                                    {text}
                                                                </p>
                                                                <Tooltip
                                                                    delayDuration={300}>
                                                                    <TooltipTrigger className='cursor-default ml-1.5'>
                                                                        <HelpCircle className='h-4 w-4 text-zinc-500' />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent className='w-80 p-2'>
                                                                        {footnote}
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </div>
                                                        ) : (
                                                            <p
                                                                className={cn(
                                                                    'text-gray-600',
                                                                    {
                                                                        'text-gray-400':
                                                                            negative,
                                                                    }
                                                                )}>
                                                                {text}
                                                            </p>
                                                        )}
                                                    </li>
                                                )
                                            )}
                                        </ul>

                                    </div>
                                )
                            }
                        )}
                    </TooltipProvider>
                </div>
            </MaxWidthWrapper>
        </>
    )
}

export default Page