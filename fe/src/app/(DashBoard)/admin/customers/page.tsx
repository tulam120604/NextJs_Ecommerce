'use client';

import { useToken } from "@/src/app/_lib/Custome_Hooks/User";
import { List_Account } from "@/src/app/_lib/Tanstack_Query/Auth/Query_Auth";
import Loading_Dots from "@/src/app/Components/Loadings/Loading_Dots";
import { DataTable } from "@/src/app/Components/ui/Tables/data_table";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "./loading";


const CustomersAdmin = () => {
    const token = useToken();
    const { data, isLoading } = List_Account(token.accessToken);

    if(isLoading) {
       return <Loading/>
    }

    const columns: ColumnDef<any>[] = [
        {
            cell : ({row}) => (<>
            <Image className="rounded" width={50} height={50} src={row?.original?.avatar ? row?.original?.avatar : '/Images/default_avatar.jpg'} alt="Loading..."></Image>
            </>),
            'header' : 'Ảnh đại diện'
        },
        {
            'accessorKey': 'user_name',
            'header': 'Tên tài khoản'
        },
        {
            'accessorKey' : 'email',
            'header' : 'Email'
        },
        {
            cell : ({row}) => (
                <span>{(row?.original?.role) === 'admin_global' ? 'Quản lí' : (row?.original?.role === 'admin_local') ? 'Nhân viên' : 'Người dùng'}</span>
            ),
            'header' : 'Vai trò'
        },
        {
            cell : ({row}) => (
                console.log(row?.original)
            ),
            'header' : 'Options'
                
        }
    ]


    return (
        <Suspense fallback={<Loading_Dots/>}>
            <div className="flex flex-col gap-y-6 py-6 rounded">
            <strong className="text-gray-200 lg:text-2xl">Khách hàng</strong>
            <div className="text-gray-200">
                {
                    data?.data &&
                    <DataTable data={data?.data?.docs} columns={columns}/>
                }
            </div>
        </div>
        </Suspense>

    )
}

export default CustomersAdmin