import Product_Item from '@/src/app/Components/Products/Product_Item';

async function getRespon() {
    const res = await fetch(`http://localhost:2000/v1/products`, { cache: 'no-cache' })
    const respon = await res.json()
    return respon
}


const Render_Products = async  () => {
    const {data} = await getRespon();
    // const isClient = typeof window !== 'undefined';
    // console.log(isClient);
    // const [page, setPage] = useState<number>(1);
    // // data server
    // const {data, isLoading} = Paginate_Item(page);

   
    // fake data render html
    // const data = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    const firstData = data.docs.slice(0, 10);
    const lastData = data.docs.slice(10)
    return (
        <div className="w-full flex flex-col mb:items-center lg:items-start">
            {/* render products */}
            <div className="mb:w-[342px] py-4 lg:w-full md:w-full grid rounded-lg lg:grid-cols-6 gap-y-6 gap-x-4 md:grid-cols-3 mb:grid-cols-2 lg:gap-y-8 text-center justify-between">
               {
                firstData?.map((item : any) => {
                    return (
                        <Product_Item key={item._id} dataProps={item}/>
                    )
                })
               }
            </div>
            {/* list page */}
            <div className="lg:w-full flex lg:flex-row mb:flex-col justify-between items-center lg:pt-6 pt-[18px] mb:gap-y-5 lg:gap-y-0">
                {/* show page */}
                <span className="lg:w-auto  mb:w-full text-[#717378] lg:text-sm mb:text-xs">Showing 1-30 of 393
                    results</span>
                {/* list page */}
                <div className="md:w-auto mb:w-[342px] flex items-center justify-left *:w-9 *:h-9 *:rounded-[50%] *:grid *:place-items-center md:gap-x-3 gap-x-1 text-xs lg:text-sm">
                    <button className="border">
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>
                    {/* **** */}
                    {/* <button onClick={() => setPage(1)} className="bg-[#F2F6F4]">1</button>
                    <button onClick={() => setPage(2)} className="hover:bg-[#f2f6f4]">2</button>
                    <button onClick={() => setPage(3)} className="hover:bg-[#f2f6f4]">3</button>
                    <button onClick={() => setPage(4)} className="hover:bg-[#f2f6f4]">4</button>
                    <span className="hover:bg-[#f2f6f4]">...</span> */}
                    <button className="hover:bg-[#f2f6f4]">55</button>
                    {/* **** */}
                    <button className="border">
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>



    )
}

export default Render_Products