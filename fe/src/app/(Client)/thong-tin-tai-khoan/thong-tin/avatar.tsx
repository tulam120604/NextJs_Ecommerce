"use client";

import { Mutation_Auth } from "@/src/app/_lib/Query_APIs/Auth/Auth_mutation";
import { User } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function Avatar_account({ data_user }: any) {
  const { onSubmit, isLoading } = Mutation_Auth({ action: "UPDATE_PROFILE" });
  const [uriImg, setUri_Img] = useState<any>("");
  function pushImage(e: any) {
    const file = e?.target?.files[0];
    if (file && file?.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUri_Img(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      window.alert("Vui lòng chọn đúng định dạng ảnh!");
    }
  }

  function update_img_account() {
    onSubmit('ahihihi');
  }
  return (
    <div className="border-l grid place-content-center">
      <form className="text-gray-500">
        <div className="rounded-full bg-[#EFEFEF] grid place-content-center w-20 h-20">
          {data_user?.data?.avatar ? (
            <Image
              src={data_user?.data?.avatar}
              className="rounded-full w-20 h-20"
              width={80}
              height={80}
              alt="store88"
            />
          ) : (
            <>
              {uriImg ? (
                <Image
                  width={80}
                  height={80}
                  src={uriImg}
                  className="rounded-full w-20 h-20"
                  alt="loading"
                />
              ) : (
                <User fill="#EFEFEF" width={40} height={40} strokeWidth={1} />
              )}
            </>
          )}
        </div>
        <div className="flex flex-col gap-y-2 *:px-2 *:py-1 *:rounded *:border *:text-sm mt-4 relative">
          <button type="button" className="cursor-pointer">Chọn ảnh</button>
          <input
            type="file"
            accept="image/*"
            className="opacity-0 absolute w-20 border cursor-pointer"
            onChange={pushImage}
          />
          <button
            type="button"
            className="bg-[#6F8BFC] hover:scale-105 text-gray-50"
            onClick={update_img_account}
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
}
