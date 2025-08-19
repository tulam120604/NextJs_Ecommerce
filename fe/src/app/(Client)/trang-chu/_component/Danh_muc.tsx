import { unstable_noStore as noStore } from "next/cache";
import { list_category } from "@/src/app/_lib/Services/Services_Items/Category";
import { Suspense } from "react";
import Loading_Skeleton from "@/src/app/_Components/Loadings/Loading_Skeleton";
import ReloadPage from "@/src/app/_Components/Pages/ReloadPage";
import Image from "next/image";
import Link from "next/link";
import { convert_Slug } from "@/src/app/util/Slug";

const Category = async () => {
  noStore();
  const { data } = await list_category();
  return (
    <Suspense fallback={<Loading_Skeleton number_elements={1} />}>
      <aside className="hidden lg:block max-h-screen">
        {data?.status === 404 ? (
          <>
            <div className="min-h-[100px] grid place-items-center">
              <ReloadPage />
            </div>
          </>
        ) : (
          <div className="space-y-3 border p-4 rounded-lg">
            {data?.length > 0 ? (
              data?.map((item: any) => (
                <div key={item?._id} className="flex items-center gap-x-3 text-sm duration-150
                 hover:text-indigo-600 opacity-85">
                  <Link
                    href={`/san-pham/${convert_Slug(
                      item?.category_name
                    )}.html?p=${item?._id}`}
                  >
                    {item?.category_name}
                  </Link>
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-sm font-normal">Trống!</div>
            )}

            {data?.length > 0 ? (
              data?.map((item: any) => (
                <div key={item?._id} className="flex items-center gap-x-3 text-sm duration-150 hover:text-indigo-600">
                  <Link
                    href={`/san-pham/${convert_Slug(
                      item?.category_name
                    )}.html?p=${item?._id}`}
                  >
                    {item?.category_name}
                  </Link>
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-sm font-normal">Trống!</div>
            )}

            {data?.length > 0 ? (
              data?.map((item: any) => (
                <div key={item?._id} className="flex items-center gap-x-3 text-sm duration-150 hover:text-indigo-600">
                  <Link
                    href={`/san-pham/${convert_Slug(
                      item?.category_name
                    )}.html?p=${item?._id}`}
                  >
                    {item?.category_name}
                  </Link>
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-sm font-normal">Trống!</div>
            )}

            {data?.length > 0 ? (
              data?.map((item: any) => (
                <div key={item?._id} className="flex items-center gap-x-3 text-sm duration-150 hover:text-indigo-600">
                  <Link
                    href={`/san-pham/${convert_Slug(
                      item?.category_name
                    )}.html?p=${item?._id}`}
                  >
                    {item?.category_name}
                  </Link>
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-sm font-normal">Trống!</div>
            )}

            {data?.length > 0 ? (
              data?.map((item: any) => (
                <div key={item?._id} className="flex items-center gap-x-3 text-sm duration-150 hover:text-indigo-600">
                  <Link
                    href={`/san-pham/${convert_Slug(
                      item?.category_name
                    )}.html?p=${item?._id}`}
                  >
                    {item?.category_name}
                  </Link>
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-sm font-normal">Trống!</div>
            )}

            {data?.length > 0 ? (
              data?.map((item: any) => (
                <div key={item?._id} className="flex items-center gap-x-3 text-sm duration-150 hover:text-indigo-600">
                  <Link
                    href={`/san-pham/${convert_Slug(
                      item?.category_name
                    )}.html?p=${item?._id}`}
                  >
                    {item?.category_name}
                  </Link>
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-sm font-normal">Trống!</div>
            )}

            {data?.length > 0 ? (
              data?.map((item: any) => (
                <div key={item?._id} className="flex items-center gap-x-3 text-sm duration-150 hover:text-indigo-600">
                  <Link
                    href={`/san-pham/${convert_Slug(
                      item?.category_name
                    )}.html?p=${item?._id}`}
                  >
                    {item?.category_name}
                  </Link>
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-sm font-normal">Trống!</div>
            )}

            {data?.length > 0 ? (
              data?.map((item: any) => (
                <div key={item?._id} className="flex items-center gap-x-3 text-sm duration-150 hover:text-indigo-600">
                  <Link
                    href={`/san-pham/${convert_Slug(
                      item?.category_name
                    )}.html?p=${item?._id}`}
                  >
                    {item?.category_name}
                  </Link>
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-sm font-normal">Trống!</div>
            )}

            {data?.length > 0 ? (
              data?.map((item: any) => (
                <div key={item?._id} className="flex items-center gap-x-3 text-sm duration-150 hover:text-indigo-600">
                  <Link
                    href={`/san-pham/${convert_Slug(
                      item?.category_name
                    )}.html?p=${item?._id}`}
                  >
                    {item?.category_name}
                  </Link>
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-sm font-normal">Trống!</div>
            )}
          </div>
        )}
      </aside>
    </Suspense>
  );
};

export default Category;
