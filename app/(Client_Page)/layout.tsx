
import Footer from '../(Pages)/Footer/page';
import Header from '../(Pages)/Header/page';
import { Suspense, useEffect, useState } from 'react';
// import LoadingMainClient from './loading';
import { useRouter } from 'next/router';

export default function Layout_CLient({ children }: Readonly<{ children: React.ReactNode }>) {
    // const routes = useRouter();
    // useEffect(() => {
    //     routes.push('/home');
    // }, []);
    // console.log('ahihi')
    // const [loading, setLoading] = useState(false);
    // const routes = useRouter();
    // routes.events.on('routeChangeStart', () => console.log('ahihi'))
    return (<>
            <Header />
            <main className="mt-[100px]">
                {children}
            </main>
            <Footer />

    </>)
}
