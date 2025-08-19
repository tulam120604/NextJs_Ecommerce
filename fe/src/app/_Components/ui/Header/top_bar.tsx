import Link from "next/link";

export default function TopBar({ props }: any) {
  const { data, isLoading, isFetching, isHydrated } = props;
  return (
    <div
      className="hidden z-[2000] lg:block bg-gray-100 dark:bg-gray-800 text-sm 
    text-gray-700 dark:text-gray-200 border-b px-4 relative"
    >
      <div className="max-w-[1440px] w-[95vw] mx-auto flex justify-between items-center py-2 px-3">
        <div className="flex space-x-4 items-center">
          <Link
            className="hover:text-blue-500 duration-200"
            href="/order-tracking"
          >
            Kênh người bán
          </Link>
          <span className="hidden sm:inline">
            Cần hỗ trợ? Liên hệ:{" "}
            <a className="text-blue-500" href="tel:+0020500">
              +9999999999
            </a>
          </span>
          <div className="hidden sm:flex space-x-2">
            <select className="bg-transparent outline-none">
              <option>Tiếng Việt</option>
              <option>English</option>
            </select>
          </div>
        </div>
        {/*  */}
        <div className="flex space-x-4 *:duration-200">
          {!(isLoading || isFetching || !isHydrated) && (
            <>
              <Link className="hover:text-blue-500" href="/order-tracking">
                Đơn hàng
              </Link>
              <Link className="hover:text-blue-500" href="/wishlist">
                Yêu thích
              </Link>
              <Link
                className="hover:text-blue-500"
                href={
                  data?.user_name
                    ? "/thong-tin-tai-khoan/thong-tin"
                    : "/dang-nhap"
                }
              >
                {data?.user_name
                  ? data?.user_name.length > 15
                    ? data?.user_name.slice(0, 15) + "..."
                    : data?.user_name
                  : "Đăng nhập"}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
