'use client';

import { useCheck_user } from '@/src/app/_lib/Custome_Hooks/User';
import { Mutation_Favorite } from '@/src/app/_lib/Tanstack_Query/Favorites/Query_Feedback';
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Favorites_Detail_Item({ dataProps }: { dataProps: string | number }) {
    const routing = useRouter();
    const user = useCheck_user();
    const mutate_favorite = Mutation_Favorite('ADD');

    function handle_Favorite() {
        if (user?.check_email?._id) {
            mutate_favorite?.mutate({
                id_user: user?.check_email?._id,
                id_item: dataProps
            })
        }
        else {
            routing.push('/login')
        }
    }

    return (
        <div>
            <button className="flex items-center gap-x-2" onClick={handle_Favorite}>
                <Heart className="text-red-500 cursor-pointer h-5" />
                <span>Thêm vào yêu thích</span>
            </button>
        </div>)
}
