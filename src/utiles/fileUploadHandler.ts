
// IMAGE UPLOAD (THUMBNAIL)
export const imageUpload = async (imageSrc: string) => {

  if (imageSrc) {
    const formData = new FormData()
    formData.append("file", imageSrc);
    formData.append("upload_preset", "image_upload");
    formData.append("folder", "code_zip_files");

    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_UPLOAD_URL}/auto/upload?folder=code_zip_files`,
        {
          method: "POST",
          body: formData
        }
      ).then((res) => res.json());
      console.log("imageUrl response from cloudinary", data.secure_url)
      return data.secure_url;
    } catch (error) {
      return { error: "invalid file type" };
    }
  }

}

// FILE UPLOAD
export const codeFileUpload = async (file: any) => {
  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "code-files");
    formData.append("folder", "code-files-folder");
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_UPLOAD_URL}/raw/upload?folder=code-files-folder`,
        {
          method: "POST",
          body: formData
        },
      ).then((res) => res.json())
      console.log("response from cloudinary", data)
      return data.secure_url;
    } catch (error) {
      if (error instanceof Error)
        console.log(error);
      return { error: "invalid file type" };
    }
  }
}