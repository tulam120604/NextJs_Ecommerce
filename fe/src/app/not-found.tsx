'use client';

import Image from 'next/image';
import Link from 'next/link';

const Not_found = () => {
    return (
        <div className="grid h-screen place-content-center bg-white px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-gray-200">404</h1>
                <Image width={100} height={100} className='absolute w-[200px] top-[10%] h-[200px]' src={'/Images/not-found.jpg'} alt=''></Image>

                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Ôi hỏng!</p>

                <p className="mt-4 text-gray-500">Không tìm thấy trang.</p>

                <Link href="/" 
                    className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
                    Về trang chủ
                </Link>
            </div>
        </div>
    )
}

export default Not_found