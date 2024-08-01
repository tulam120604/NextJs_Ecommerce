import { Button } from '@/src/app/Components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink} from '@/src/app/Components/ui/pagination';


export default function Pagination_Component() {
    const totalPages = 5;
    return (
        <Pagination>
        <PaginationContent>
            <Button>&#10094;</Button>
            {
                Array.from({ length: totalPages }, (_: any, i) =>
                    <PaginationItem className='cursor-pointer' key={i}>
                        <PaginationLink >
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                )
            }
            {/* <PaginationItem>
                <PaginationEllipsis />
            </PaginationItem> */}
            <Button>&#10095;</Button>
        </PaginationContent>
    </Pagination>
    )
}
