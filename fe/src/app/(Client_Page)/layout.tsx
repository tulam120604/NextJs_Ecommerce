import Footer from '../Components/ui/Footer/page';
import Header from '../Components/ui/Header/page';

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
