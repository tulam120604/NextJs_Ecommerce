'use client';

const LoadingPage = () => {
    return (
        <div className="mx-auto max-w-[1440px] min-h-screen grid place-items-center">
            <div>
                <div className="mx-auto w-10 -mt-20 h-10 animate-spin *:text-[#17AF26]">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>
                </div>
                <span className="text-2xl animate-pulse">Bình tĩnh, không có tiền mua server xịn nên load lâu (có thể hỏng luôn nếu đen)!!!</span>
            </div>
        </div>
    )
}

export default LoadingPage