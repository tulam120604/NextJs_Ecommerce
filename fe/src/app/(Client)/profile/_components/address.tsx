import { Button } from '@/src/app/_Components/ui/Shadcn/button'
import { Input } from '@/src/app/_Components/ui/Shadcn/input'
import { Label } from '@/src/app/_Components/ui/Shadcn/label'
import React from 'react'

export default function Address_component() {
    return (
        <div className="mx-auto w-[342px] p-4 bg-white rounded">
            <strong className="text-xl">Thêm địa chỉ</strong>
            <div className="grid gap-4 mt-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Tên :</Label>
                    <Input id="name" type="text" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phone">Số điện thoại :</Label>
                    <Input id="phone" type="text" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="address">Địa chỉ :</Label>
                    <Input id="address" type="text" />
                </div>
                <div className='flex justify-center'>
                    <Button>Thêm</Button>
                </div>
            </div>
        </div>
    )
}
