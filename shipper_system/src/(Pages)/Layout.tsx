import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="max-w-[1440px] w-[95vw] mx-auto">
            <header className="bg-white">
                <div className="relative lg:h-[66px] mb:h-[56px] flex items-center justify-between gap-x-20 items-center">
                    <Link className='lg:text-2xl text-lg font-extrabold' to={'/'}>
                        Store88
                    </Link>
                    <div className="flex items-center gap-x-4 text-sm *:py-2 *:px-3 *:border-b-2 *:border-white">
                        <Link className="hover:border-gray-900" to={'/'}>Danh sách đơn hàng</Link>
                        <Link className="hover:border-gray-900" to={'/'}>Đơn hàng đã giao</Link>
                    </div>
                    <Link to="/"
                        className="block rounded-md bg-gray-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-900">
                        Đăng nhập
                    </Link>
                </div>
            </header>
            <main className="mt-4">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
