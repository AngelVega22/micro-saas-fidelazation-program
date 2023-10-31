import Link from 'next/link';
import MaxWidthWrapper from './maxWidthWrapper';
import { buttonVariants } from '@/components/ui/button';
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRight } from 'lucide-react';

const Navbar = () => {
   return (
      <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
         <MaxWidthWrapper>
            <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
               <Link
                  href='/'
                  className='flex z-40 font-semibold'>
                  <span>Bun.</span>
               </Link>
               {/*Todo: add mobile navbar */}
               <div className='hidden items-center space-x-4 sm:flex'>
                  <>
                     <Link
                        href='/planes'
                        className={buttonVariants({
                           variant: 'ghost',
                           size: 'sm',
                        })}>
                        Planes
                     </Link>
                     <LoginLink
                        className={buttonVariants({
                           variant: 'ghost',
                           size: 'sm',
                        })}>
                        Ingresar
                     </LoginLink>
                     <RegisterLink
                        className={buttonVariants({
                           size: 'sm',
                        })}>
                        Regístrate{' '}
                        <ArrowRight className='ml-1.5 h-5 w-5' />
                     </RegisterLink>
                  </>
               </div>
            </div>
         </MaxWidthWrapper>
      </nav>
   )
}

export default Navbar