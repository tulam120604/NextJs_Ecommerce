/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import React from 'react'
import { Custome_Hooks_Auth } from '../../_lib/Custome_Hooks/Auth_Form';
import Loading_animation from '../Loadings/Loading_animation';
import Swal from 'sweetalert2';

const Form_auth = ({ mode }: any) => {
    // console.log(mode);
    const { my_form, isLoading, status_Loading, onSubmit, errors, isValidating, routing } = Custome_Hooks_Auth({ mode });
    if (status_Loading === 'call_ok') {
        if (mode !== "Register") {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Đăng nhập thành công!",
                showConfirmButton: false,
                timer: 1000,
                heightAuto: false,
                backdrop: '#20212466',
                customClass: {
                    popup: 'bg-transparent', // màu nền
                    title: 'text-black' // màu chữ
                },
            });
            routing.push('/');
        }
        else {
            routing.push('/login');
        }
    }
    return (
        <>
            <div className="lg:grid max-w-[1400px] mx-auto lg:min-h-screen lg:grid-cols-[60%_35%] justify-between">
                <section className="relative">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        className="absolute inset-0 h-full w-full object-cover opacity-80"
                    />

                    <div className="hidden lg:relative lg:block lg:p-12">
                        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                            Xin chào đại vương!
                        </h2>

                        <p className="mt-4 leading-relaxed text-white/90">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                            quibusdam aperiam voluptatum.
                        </p>
                    </div>
                </section>
                <main className="flex item-center">
                    <form onSubmit={my_form.handleSubmit(onSubmit)} className="flex flex-col my-auto w-full px-6 gap-y-2 bg-white rounded-lg">
                        <h3 className="mb-3 lg:text-2xl font-extrabold text-gray-900 text-center">
                            {mode === 'Register' ? 'Tạo tài khoản ' : "Đăng nhập"}
                        </h3>
                        {mode === 'Register' && <div className="mb-3">
                            <label
                                htmlFor="user_name"
                                className="mb-2 text-sm font-semibold text-gray-900 flex"
                            >
                                Tên đăng nhập*
                            </label>
                            <input
                                {...my_form.register('user_name')}
                                id="user_name"
                                type="text"
                                placeholder="Enter a user name"
                                className="flex items-center w-full px-5 py-4  text-sm font-medium text-gray-900 placeholder-gray-500 border border-gray-300 outline-none focus:bg-gray-50 rounded-lg focus:ring-2 focus:ring-gray-200"
                            />
                            {mode === 'Register' && errors.user_name && <p className="text-red-500 md:text-sm text-xs">{errors.user_name.message}</p>}
                        </div>}
                        <div className="mb-3">
                            <label htmlFor="email" className="mb-2 text-sm font-semibold text-gray-900 flex"> Email*</label>
                            <input
                                {...my_form.register('email')}
                                id="email"
                                type="email"
                                placeholder="email@ahihi.com"
                                className="flex items-center w-full px-5 py-4 text-sm font-medium text-gray-900 placeholder-gray-500 border border-gray-300 outline-none focus:bg-gray-50 rounded-lg focus:ring-2 focus:ring-gray-200"
                            />
                            {mode === 'Register' && errors.email && <p className="text-red-500 md:text-sm text-xs">{errors.email.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="password"
                                className="mb-2 text-sm font-semibold text-gray-900 flex"
                            >
                                Mật khẩu*
                            </label>
                            <input
                                {...my_form.register('password')}
                                id="password"
                                type="password"
                                placeholder="Enter a password"
                                className="flex items-center w-full px-5 py-4  text-sm font-medium text-gray-900 placeholder-gray-500 border border-gray-300 outline-none focus:bg-gray-50 rounded-lg focus:ring-2 focus:ring-gray-200"
                            />
                            {mode === 'Register' && errors.password && <p className="text-red-500 md:text-sm text-xs">{errors.password.message}</p>}
                        </div>
                        {mode === 'Register' ? <div>
                            {status_Loading === 'call_error' && <span className='text-center text-xs lg:text-sm text-red-500'>* Tài khoản đã đã tồn tại! *</span>}
                            <button className="w-full grid place-items-center h-14 mb-5 text-sm font-bold leading-none text-white transition duration-300 bg-gray-900 hover:bg-gray-700 rounded-lg">
                                {isLoading ? <Loading_animation /> : 'Tạo tài khoản'}
                            </button>
                            <div className="flex items-center mb-3">
                                <hr className="flex-grow border-gray-300" />
                                <p className="mx-4 text-gray-600">or</p>
                                <hr className="flex-grow border-gray-300" />
                            </div>
                            <Link href={''} className="flex duration-300 items-center justify-center w-full h-14 mb-6 text-sm font-medium text-gray-900 transition duration-300 border border-gray-200 bg-gray-50 rounded-lg hover:bg-gray-200">
                                <img width={20} height={50}
                                    className="h-5 mr-2"
                                    src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                                    alt="Google Logo"
                                />
                                Đăng kí bằng Google
                            </Link>
                            <p className="text-sm text-gray-600 text-center">
                                Đã có tài khoản?{" "}
                                <Link
                                    href="/login"
                                    className="font-bold text-blue-600 hover:underline"
                                >
                                    Đăng nhập
                                </Link>
                            </p>
                        </div> :
                            <div>
                                <div className="flex flex-row justify-between my-2">
                                    <a
                                        href="#"
                                        className="text-sm font-medium text-blue-600 hover:underline"
                                    >
                                        Quên mật khẩu?
                                    </a>
                                </div>
                                {status_Loading === 'call_error' && <span className='text-center text-xs lg:text-sm text-red-500 my-4'>* Thông tin tài khoản không chính xác! *</span>}
                                <button className="w-full grid place-items-center h-14 mb-5 text-sm font-bold leading-none text-white transition duration-300 bg-gray-900 hover:bg-gray-700 rounded-lg">
                                    {isLoading ? <Loading_animation /> : 'Đăng nhập'}
                                </button>
                                <div className="flex items-center mb-3">
                                    <hr className="flex-grow border-gray-300" />
                                    <p className="mx-4 text-gray-600">or</p>
                                    <hr className="flex-grow border-gray-300" />
                                </div>
                                <Link href={''} className="flex duration-300 items-center justify-center w-full py-4 mb-6 text-sm font-medium text-gray-900 transition duration-300 border border-gray-200 bg-gray-50 rounded-lg hover:bg-gray-200">
                                    <img width={20} height={50}
                                        className="h-5 mr-2"
                                        src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                                        alt="Google Logo"
                                    />
                                    Đăng nhập bằng Google
                                </Link>
                                <p className="text-sm text-gray-600 text-center">
                                    Chưa có tài khoản?{" "}
                                    <Link
                                        href="/register"
                                        className="font-bold text-blue-600 hover:underline"
                                    >
                                        Tạo tài khoản
                                    </Link>
                                </p>
                            </div>}
                    </form>
                </main>
            </div>
        </>
    )
}

export default Form_auth