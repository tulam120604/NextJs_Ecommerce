const apiURi = process.env.NEXT_PUBLIC_DB_HOST;
import { useToast } from "@/src/app/Components/ui/use-toast";


export async function create_message (data_body : any) {
    const { toast } = useToast()
    try {
        const res = await fetch (`${apiURi}/create_notification/${data_body?.sender_id}`, {
            method : 'post',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data_body)
        });
        if (!res.ok){
            toast({
                title: "Gửi thông báo thất bại!!",
                className: 'w-[300px] bg-gray-900 fixed right-0 bottom-0 border-none text-white h-10',
                duration: 500
            })
            return res
        }
        else {
            toast({
                title: "Đã gửi thông báo!",
                className: 'w-[250px] bg-gray-900 fixed right-0 bottom-0 border-none text-white h-10',
                duration: 500
            })
        };
        const data = await res.json();
        return data
    } catch (error){
        return error || 'Lỗi server rồi đại vương ơi!'
    }
};


export async function get_notification (sender_id : string | number){
    try {
        const res = await fetch (`${apiURi}/get_message_notification/${sender_id}`);
        if (!res.ok){
            return res
        }
        const data = await res.json();
        return data
    } catch (error){
        return error || 'Lỗi server rồi đại vương ơi!'
    }
}


export async function send_message (data_body : any) {
    try {
        const res = await fetch (`${apiURi}/send_notification/${data_body?.sender_id}`, {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data_body)
        });
        if (!res.ok){
            return res
        }
        return res
    } catch (error){
        return error || 'Lỗi server rồi đại vương ơi!'
    }
};