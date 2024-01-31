import { getPurchasesPerBuyer } from "@/utiles/service/queries";
import React, { useEffect } from "react";
import { Code, Purchase, User } from "../../../types";
import Loader from "../atoms/loader";


type Props = {
  className?: string,
  uploaded: Code[]
}

const UploadedCode = ({ className, uploaded }: Props) => {
  const [user, setUser] = React.useState<User | null>(
    (): User | null => {
      if (typeof localStorage !== "undefined") {
        const fromLocalStorage =
          JSON.parse(localStorage.getItem("userObject") as string) || {};
        if (fromLocalStorage) return fromLocalStorage;
      }
      return null;
    }
  )

  // console.log('from component', uploaded)


  return (
    <div className={className}>
      <div className={`relative md:overflow-x-auto w-full`}>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Language
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                rating
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {uploaded?.length ? uploaded.map((item) => (
              <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.title}
                </th>
                {/* <td className="px-6 py-4">{item.title}</td> */}
                <td className="px-6 py-4">{item.programming_language}</td>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4">{item.createdAt.slice(0, 10)}</td>
                <td className="px-6 py-4">{item.rating}</td>
                <td className="px-6 py-4">{item.price} FCFA</td>
              </tr>
            ))
              :
              <Loader />
            }

          </tbody>
        </table>
        {/* <button onClick={() => fetch()}>click me</button> */}
      </div>
    </div>
  );
};

export default UploadedCode;
