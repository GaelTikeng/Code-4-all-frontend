"use client"
import React, { FormEvent, useState, useCallback } from "react";
import { User } from "../../../../types";
import { useEdgeStore } from "@/lib/edgestore";
import { createCode } from "@/utiles/service/queries";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { useDropzone } from 'react-dropzone'
import { FaCloudUploadAlt } from "react-icons/fa";
import Image from "next/image";
import { SingleImageDropzone } from "@/components/organisms/dragAndDrop";



// IMPORT CK5EDITOR AS CLIENT COMPONENT
const CK5Editor = dynamic(() => import("@/utiles/editor/CK5Editor"), {
  ssr: false
})

const Page = () => {
  const [file, setFile] = useState<File>()
  const [url, setUrl] = useState<string>("")
  const [data, setData] = useState<string>("")
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [progress, setProgress] = useState<number | undefined>()
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
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

  // Drag and drop function
  const onDrop = useCallback((acceptedFiles: Blob[]) => {
    // Do something with the files
    console.log("acceptedFile", acceptedFiles)
    const file = new FileReader()

    file.onload = () => {
      console.log(file.result)
      setPreview(file.result)
    }

    file.readAsDataURL(acceptedFiles[0])

  }, [])
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/html': ['.html', '.htm', '.pdf', '.docx', '.zip']
    }, onDrop
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
    // console.log(data)
    console.log("description", formData.description)
    console.log('form data', formData)
    // const data = new FormData(event.currentTarget)
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
        description: data,
        price: price,
        code_file: res.url,
        programming_language: formData.language,
        category: data,
        thumbnail: res.url
      })
        .then((data) => {
          // console.log(data)
          setIsLoading(prev => !prev)
          toast.success("Code snippet uploaded successfully", {
            position: "top-right",
            theme: "dark",
            hideProgressBar: true,
            autoClose: 2000
          })

        })
    }
  }

  return (
    <div className="w-full md:w-[75%] p-5 mx-auto bg-[#f1f1f1]">
      {/* <h1>upload code</h1> */}
      <form className="container" onSubmit={handleSubmit}>
        <h1 className="font-semibold text-gray-700 text-center py-5 text-xl">Upload code snippet</h1>
        <div className="flex flex-col text-gray-700 pb-4">
          <label htmlFor="frm-email" className="py-2">Snippet title<span className="text-red-500">*</span></label>
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

        <div className="flex flex-col pb-4 text-gray-700">
          <label htmlFor="language" className="py-2">Programming language<span className="text-red-500">*</span></label>
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

        <div className="flex flex-col pb-4 text-gray-700">
          <label htmlFor="frm-phone" className="py-2">Category<span className="text-red-500">*</span></label>
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

        <div className="flex text-gray-700 flex-col pb-4">
          <label htmlFor="frm-phone" className="py-2">Price<span className="text-red-500">*</span></label>
          <input
            className="border-1 p-1"
            type="number"
            name="price"
            required
            onChange={(event) => setPrice(+event.target.value)}
          // onChange={(event) => handleInputChange(event)}
          />
        </div>

        <div className="flex text-gray-700 flex-col pb-4">
          <label htmlFor="frm-message" aria-required>Description<span className="text-red-500">*</span></label>
          <textarea
            onChange={(event) => handleInputChange(event)}
            className="p-2"
            name="description"
          ></textarea>
        </div>
        <CK5Editor
          initialData={undefined}
          onChange={(data: string) => {
            setData(data)
          }}
        />
        {/* <div className="flex flex-col pb-4">
          <label htmlFor="frm-first">Upload file<span className="text-red-500">*</span></label>
          <input
            className="border-1 p-1 px-3"
            type="file"
            name="file"
            // accept="image/jpg, image/png"
            // required
            onChange={(event) => {
              setFile(event.target.files?.[0])
            }}
          />
        </div> */}

        <div className="flex gap-5 items-baseline pb-5">
          {progress && <progress value={progress} max={100} />}
          {progress && <p>{progress} %</p>}
        </div>

        {/* FILE UPLOAD DRAG & DROP */}
        <div className="md:flex my-4 justify-between mx-auto ">

          {/* UPLOAD THUMBNAIL */}
          <div className="md:w-1/2 w-full h-[200px]">
            <SingleImageDropzone
              width={300}
              height={200}
              value={file}
              onChange={(file) => {
                setFile(file);
              }}
            />
          </div>

          {/* UPLOAD FILE */}
          <div
            className="h-[200px] w-[300px] my-2 md:my-0 md:w-[300px] text-xs rounded-lg border border-dashed border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out "
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p className="text-center mt-20">Drop the file here ...</p> :
                <div className="flex flex-col justify-center w-1/2 mt-10 mx-auto cursor-pointer">
                  <div className="flex justify-center">
                    <FaCloudUploadAlt size={30} className="items-center text-gray-400" />
                  </div>
                  <p className="top-[50%] text-center my-auto flex justify-center pt-2 text-[#969696]">drag & drop file to upload</p>
                  <button className="border w-fit flex justify-center py-1 px-2 border-gray-400 text-gray-400 rounded-lg mx-auto mt-3">Select</button>
                </div>
            }
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="py-4  bg-[#f94d1c] hover:shadow-xl font-semibold text-white w-full"
          >
            {isLoading ? "Loading..." : "Upload"}
          </button>
        </div>
        {/* {url && <p>{url}</p>} */}
      </form>
    </div>
  );
};

export default Page;
