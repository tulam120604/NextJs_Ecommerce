import { Skeleton } from "@/src/app/Components/ui/Skeleton/skeleton"

const LoadingDetail = () => {
  return (
    <main className="w-full *:lg:w-[1440px] *:w-[342px] *:mx-auto *:h-full py-12">
      <div className='flex items-center text-sm gap-x-2 font-medium capitalize text-gray-700 mb-4'>
        {/* <Link href={'/'} className='hover:text-black'>Trang chủ</Link>/
        <Link href={'/products'} className='hover:text-black'>Sản phẩm</Link>/
        <Link href={'/products'} className='hover:text-black'>Táo</Link> */}
      </div>
      <div className="lg:grid lg:grid-cols-[573px_auto] auto-rows-[70vw] gap-x-20">
        {/*  desktop : left  , mobile : row 1 */}
        <Skeleton></Skeleton>
        {/*desktop: right, mobile : row 2 */}
       <Skeleton></Skeleton>
      </div>
      {/* related products */}
     <Skeleton className="w-full h-[10vw]"></Skeleton>
      <Skeleton className="pt-4">
        <Skeleton className="lg:text-2xl text-xl lg:tracking-[-0.5px]"></Skeleton>
        <Skeleton className="w-full h-[10vw]"></Skeleton>
      </Skeleton>
    </main>
  )
}

export default LoadingDetail