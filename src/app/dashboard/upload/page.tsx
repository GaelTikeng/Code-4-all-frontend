"use client"
import React, { FormEvent, useState } from "react";
import { User } from "../../../../types";
import { useEdgeStore } from "@/lib/edgestore";
import { createCode } from "@/utiles/service/queries";
import { toast } from "react-toastify";



const Page = () => {
  const [file, setFile] = useState<File>()
  const [url, setUrl] = useState<string>("")
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [progress, setProgress] = useState<number | undefined>()
  const [category, setCategory] = useState<string>("")
  const [price, setPrice] = useState<number>(0)
  const { edgestore } = useEdgeStore()
  const [user, setUser] = useState<User | null>(
    (): User | null => {
      if (typeof localStorage !== "undefined") {
        const fromLocalStorage =
          JSON.parse(localStorage.getItem("userObject") as string) || {};
        if (fromLocalStorage) return fromLocalStorage;
      }
      return null;
    }
  )

  const [formData, setFormData] = useState({
    title: "",
    language: "",
    category: "",
    price: 0,
    description: ""
  })

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(prev => !prev)
    // console.log("description", formData.description)
    // console.log('form data', formData)
    const data = new FormData(event.currentTarget)
    // console.log(data)

    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          setProgress(progress)
        }
      })
      setUrl(res.url)
      await createCode({
        user_id: user?.id,
        title: formData.title,
        description: formData.description,
        price: price,
        code_file: res.url,
        programming_language: formData.language,
        category: category
      })
        .then((data) => {
          // console.log(data)
          setIsLoading(prev => !prev)
          toast.success("Code snippet uploaded successfully", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "dark",
            hideProgressBar: true,
            autoClose: 2000
          })

        })
    }
  }

  return (
    <div className="w-full md:w-[50%] p-5 mx-auto bg-[#f1f1f1]">
      {/* <h1>upload code</h1> */}
      <form className="container" onSubmit={handleSubmit}>
        <h1 className="font-semibold text-center py-5 text-xl">Upload code snippet</h1>
        <div className="flex flex-col pb-4">
          <label htmlFor="frm-email">Snippet title<span className="text-red-500">*</span></label>
          <input
            className="border-1 p-1 px-3"
            type="text"
            name="title"
            autoComplete="title"
            required
            // onChange={(event) => setTitle(event.target.value)}
            onChange={(event) => handleInputChange(event)}
          />
        </div>

        <div className="flex flex-col pb-4">
          <label htmlFor="language">Programming language<span className="text-red-500">*</span></label>
          <input
            className="border-1 p-1 px-3"
            type="text"
            name="language"
            autoComplete="language"
            required
            // onChange={(event) => setLanguage(event.target.value)}
            onChange={(event) => handleInputChange(event)}
          />
        </div>

        <div className="flex flex-col pb-4">
          <label htmlFor="frm-phone">Category<span className="text-red-500">*</span></label>
          <select
            value={category}
            className="border-1 p-2 px-2"
            required
            name="category"
            onChange={(event) => setCategory(event.target.value)}
          // onChange={(event) => handleInputChange(event)}
          >
            <option disabled selected >Select category</option>
            <option value='Frontend'>Frontend</option>
            <option value='Backend'>Backend</option>
          </select>
        </div>

        <div className="flex flex-col pb-4">
          <label htmlFor="frm-phone">Price<span className="text-red-500">*</span></label>
          <input
            className="border-1 p-1"
            type="number"
            name="price"
            required
            onChange={(event) => setPrice(+event.target.value)}
          // onChange={(event) => handleInputChange(event)}
          />
        </div>

        <div className="flex flex-col pb-4">
          <label htmlFor="frm-message" aria-required>Description<span className="text-red-500">*</span></label>
          <textarea
            onChange={(event) => handleInputChange(event)}
            className="p-2"
            name="description"
          ></textarea>
        </div>
        <div className="flex flex-col pb-4">
          <label htmlFor="frm-first">Upload file<span className="text-red-500">*</span></label>
          <input
            className="border-1 p-1 px-3"
            type="file"
            name="file"
            required
            onChange={(event) => {
              setFile(event.target.files?.[0])
            }}
          />
        </div>
        {/* <div className="h-[1px] w-[300px] mx-auto bg-white border rounded overflow-hidden py-1  my-5">
          <div
            className="h-full bg-[#f94d1c] w-[50%] "
            // style={{ width: `30%` }}
          ></div>
        </div> */}
        <div className="flex gap-5 items-baseline pb-5">
          <progress value={progress} max={100} />
          <p>{progress} %</p>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="py-4  bg-[#f94d1c] hover:shadow-xl font-semibold text-white w-full"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
        {/* {url && <p>{url}</p>} */}
      </form>
    </div>
  );
};

export default Page;
