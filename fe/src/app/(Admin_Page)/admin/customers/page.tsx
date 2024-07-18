'use client';

import Search_Component from "@/src/app/Components/Forms/search"
import Image from "next/image"
import Link from "next/link"

const CustomersAdmin = () => {
    return (
        <div className="bg-[#101824] flex flex-col gap-y-6 py-6 rounded">
            <strong className="text-gray-200 lg:text-2xl">Khách hàng</strong>
            <div className="flex items-center gap-x-20">
                <Search_Component />
                <Link className="border-none text-gray-100 h-full px-5 py-2.5 rounded bg-[#17AF26] hover:scale-110 duration-300" href={''}>Thêm +</Link>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-500 text-gray-200">
                <table className="w-full rounded bg-[#1F2936] text-sm">
                    <thead className="text-left">
                        <tr className="*:whitespace-nowrap *:px-4 *:py-2 *:font-medium">
                            <th>Tên tài khoản</th>
                            <th>Ảnh đại diện</th>
                            <th>Vai trò</th>
                            <th>Options</th>
                        </tr>
                    </thead>

                    <tbody className="*:border-t *:border-gray-500">
                        <tr className="*:whitespace-nowrap *:px-4 *:py-2.5 *:font-medium">
                            <td>Admin</td>
                            <td><Image className="w-16 h-16" width={80} height={80} src='/Images/tao.png' alt=""></Image></td>
                            <td>Quản lí</td>
                            <td>
                                <div className="flex items-center gap-x-4 *:duration-300">
                                    <button className="hover:scale-110 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-pen-line"><path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" /><path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /><path d="M8 18h1" /></svg>
                                    </button>
                                    <button className="hover:scale-110 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr className="*:whitespace-nowrap *:px-4 *:py-2.5 *:font-medium">
                            <td>Admin</td>
                            <td><Image className="w-16 h-16" width={80} height={80} src='/Images/tao.png' alt=""></Image></td>
                            <td>Quản lí</td>
                            <td>
                                <div className="flex items-center gap-x-4 *:duration-300">
                                    <button className="hover:scale-110 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-pen-line"><path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" /><path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /><path d="M8 18h1" /></svg>
                                    </button>
                                    <button className="hover:scale-110 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr className="*:whitespace-nowrap *:px-4 *:py-2.5 *:font-medium">
                            <td>Admin</td>
                            <td><Image className="w-16 h-16" width={80} height={80} src='/Images/tao.png' alt=""></Image></td>
                            <td>Quản lí</td>
                            <td>
                                <div className="flex items-center gap-x-4 *:duration-300">
                                    <button className="hover:scale-110 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-pen-line"><path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" /><path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /><path d="M8 18h1" /></svg>
                                    </button>
                                    <button className="hover:scale-110 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default CustomersAdmin