import { Button } from "@/src/app/Components/ui/Shadcn/button";
import { Textarea } from "@/src/app/Components/ui/textarea";

export default function Page() {
    return (
        <div className="pl-4">
            <span>Đánh giá</span>
            <div className="grid w-full gap-2 py-4">
                <Textarea placeholder="Nhập đánh giá của bạn." />
                <div>
                    <Button>Gửi</Button>
                </div>
            </div>
        </div>

    )
}
