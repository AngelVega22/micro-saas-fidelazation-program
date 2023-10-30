import { ArrowRight } from 'lucide-react';
import MaxWidthWrapper from './components/maxWidthWrapper';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <div className='mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50'>
          <p className='text-sm font-semibold text-gray-700'>
            ¡Suscríbete hoy!
          </p>
        </div>
        <h1 className='max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl'>
          Lealtad al Instante,{' '}
          <span className='text-blue-600'>  Clientes Felices</span>{' '}
          en segundos.
        </h1>
        <p className='mt-5 max-w-prose text-zinc-700 sm:text-lg'>
          Un programa de fidelización que te recompensa en cuestión de segundos. Clientes felices en un abrir y cerrar de ojos. ¡Únete ahora y experimenta la lealtad instantánea!
        </p>
        <Link
          className={buttonVariants({
            size: 'lg',
            className: 'mt-5',
          })}
          href='/dashboard'
          target='_blank'>
          Empieza aqui{' '}
          <ArrowRight className='ml-2 h-5 w-5' />
        </Link>
      </MaxWidthWrapper>
    </>
  )
}
