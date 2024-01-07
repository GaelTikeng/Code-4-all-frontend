import { getPurchasesPerBuyer } from "@/utiles/service/queries";
import React, { useEffect } from "react";
import { Purchase, User } from "../../../types";
import Loader from "../atoms/loader";


type Props = {
  className?: string,
  transaction: Purchase[]
}

const Transactions = ({ className, transaction }: Props) => {
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

  

  return (
    <div className={className}>
      <div className={`relative md:overflow-x-auto w-full`}>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 font-semibold py-3">
                Transaction id
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {transaction?.length ? transaction.map((item, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.id.slice(0, 7)}
                </th>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">{item.createdAt.slice(0, 10)}</td>
                <td className="px-6 py-4">{item.total_amount} FCFA</td>
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

export default Transactions;
