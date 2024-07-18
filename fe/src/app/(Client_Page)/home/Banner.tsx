import Link from 'next/link'
import Slide_show from '../../Components/Slide/slide_show';
import Image from 'next/image';

const Banner = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="lg:w-[1440px] grid md:grid-cols-[65%_34%] grid-cols-1 gap-y-2 justify-between mb:w-[342px] md:w-[95vw] py-2">
        {/* slide */}
        <div>
          <Slide_show>
            {/* 888 */}
            <div className="relative flex flex-col *:flex *:flex-col h-[200px] lg:h-[400px]">
              <Image width={1000} height={500} className='w-full h-full top-0 rounded left-0' src="/Images/3.jpeg" alt='Loading...' />
            </div>
            {/* 888 */}
            <div className="relative flex flex-col *:flex *:flex-col h-[200px] lg:h-[400px]">

              <Image width={1000} height={500} className='w-full h-full top-0 rounded left-0' src="/Images/banner1.jpeg" alt='Loading...' />
            </div>
            {/* 888 */}
            <div className="relative flex flex-col *:flex *:flex-col h-[200px] lg:h-[400px]">
              <Image width={1000} height={500} className='w-full h-full top-0 rounded left-0' src="/Images/4.jpeg" alt='Loading...' />
            </div>
            {/* 888 */}
            <div className="relative flex flex-col *:flex *:flex-col h-[200px] lg:h-[400px]">
              <Image width={1000} height={500} className='w-full h-full top-0 rounded left-0' src="/Images/banner2.jpeg" alt='Loading...' />
            </div>
          </Slide_show>
        </div>
        <div className='border h-[200px] lg:h-[400px]'>
          <Image width={1000} height={500} className='w-full h-full top-0 rounded left-0' src="/Images/banner2.jpeg" alt='Loading...' />
        </div>
      </div>
    </div>
  )
}

export default Banner