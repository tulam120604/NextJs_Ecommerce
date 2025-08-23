// upload single
export async function uploadSingleImage(file: any) {
  try {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "nextjs_ecommerce");
    formData.append("folder", "ecommerce-store88");
    const res = await fetch(url, {
      method: "post",
      body: formData,
    });
    if (!res.ok) {
      return "Đã xảy ra lỗi, vui lòng kiểm tra và thử lại!";
    }
    const data = await res.json();
    return data?.secure_url as string;
  } catch (error) {
    return error;
  }
}

// upload multiple
export async function uploadMultipleImage(file: any) {
  try {
    const urls = await Promise.all(
      file.map((img: any) => uploadSingleImage(img))
    );
    return urls;
  } catch (error) {
    return error;
  }
}
