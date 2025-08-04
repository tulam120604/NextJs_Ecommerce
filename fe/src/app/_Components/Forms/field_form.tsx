"use client";

import { Input } from "../ui/Shadcn/input";

export default function Field_Form({ props }: any) {
  const { text_label, htmlFor, type, my_form, errors } = props;
  return (
    <div className="space-y-1">
      <label
        htmlFor={htmlFor}
        className="mb-2 text-sm opacity-90"
      >
        {text_label}
      </label>
      <Input
        {...my_form.register(type)}
        id={htmlFor}
        type={type}
        className="border-transparent bg-[#F3F4F7] rounded"
      />
      {/* <div className="h-4 text-red-500 md:text-sm text-xs mt-1">
        {errors.password && errors.password.message}
      </div> */}
    </div>
  );
}
