"use client"
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoMdClose, IoMdLock } from "react-icons/io";
import { totalPrice } from "@/utiles/calculateTotalPriceFunction";
// import { allCode } from '@/components/organisms/codeContent';
import Overlay from "@/components/atoms/overlay";
import { Code, User } from "../../../types";
import PaidCourse from "@/components/molecules/paidCode";
import { createPurchase } from "@/utiles/service/queries";
import { sendEmail } from "@/utiles/send-email";
import RequestLoader from "@/components/atoms/requestLoader";

export default function CheckoutPage() {
  const router = useRouter();
  const [paypalActive, setPaypalActive] = React.useState(false);
  const [cartActive, setCartActive] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [snippets, setSnippets] = React.useState<Code[] | undefined>(
    (): Code[] | undefined => {
      if (typeof localStorage !== "undefined") {
        const fromLocalStorage = JSON.parse(localStorage.getItem("codeArray") as string) || [];
        if (fromLocalStorage) return fromLocalStorage;
      }
      return undefined;
    }
  )
  // const snippets = JSON.parse(localStorage.getItem("codeArray") || "[]")
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
  const [popupActive, setPopupActive] = React.useState(false);

  const codeIds: string[] | undefined = []
  const files: string[] = []

  const potentialBoughtourses = snippets?.map(
    (course: Code) => (
      <PaidCourse
        title={course.title}
        price={course.price}
        author={course.user.name}
        key={course.id}
      />
    )
  );

  const handleCart = () => {
    setCartActive((prev) => !prev);
    setPaypalActive(false);
  };

  function handleClick(): void {
    router.push('/')
  }

  const handleCheckout = () => {
    setPopupActive((prev) => !prev);
    router.push("/dashboard");
    // localStorage.removeItem("codeArray")
  };

  const handlePaypal = () => {
    setPaypalActive((prev) => !prev);
    setCartActive(false);
  };

  const handlePayment = async () => {
    snippets?.map((i: { id: string; }) => (
      codeIds.push(i.id)
    ))

    snippets?.map((i: any) => (
      files.push(i.code_file)
    ))

    if (email && name) {
      setLoading(true)
      await createPurchase({
        code_id: codeIds,
        // code_id: snippets[0]?.id,
        quantity: snippets?.length,
        total_amount: totalPrice(snippets),
        buyer_id: user?.id
      }).then((res) => {
        // console.log(res)
        localStorage.setItem('purchases', JSON.stringify(res))
        setLoading(prev => !prev)
        setPopupActive((prev) => !prev)
        
        // send mail
        sendEmail({
          name: name,
          email: email,
          file: files
        })
          .then((res) => {
            // console.log('response from fxn', res)
          })
          .catch((err) => {
            console.log('this is error', err)
          });
      })
        .catch((error) => {
          console.log('error while purchasing', error)
        })
  
      
    } else {
      setCartActive(prev => !prev)
    }
  }

  return (
    <div>
      <div className="flex justify-between shadow-md py-4 md:px-[80px] px-[20px]">
        <div
          onClick={() => {
            router.push("/")
          }}
          className="text-2xl hover:cursor-pointer my-auto">
          <Image
            src="/code4all.png"
            alt="logo"
            height={75}
            width={150}
            priority={false}
          />
        </div>
        <p
          className="my-auto hover:cursor-pointer hover:underline font-semibold text-[#f94d1c]"
          onClick={() => handleClick()}
        >
          Cancel
        </p>
      </div>
      <div className="md:flex md:px-4 ">
        <div className="md:w-[55%] md:px-[80px] px-[20px] md:flex">
          <p className="flex-1"></p>
          <div className="md:pr-10 md:w-[40rem]">
            <div>
              <h1 className="py-4 md:py-6 font-semibold text-2xl md:text-4xl leading-normal">
                Checkout
              </h1>
            </div>
            <section className="pb-5">
              <div className="flex justify-between py-3">
                <h2 className="font-semibold text-xl md:text-2xl leading-normal">
                  Payment method
                </h2>
                <div className="flex justify-between gap-2 pt-4">
                  <span className="text-sm text-gray2">Secured connection</span>
                  <IoMdLock />
                </div>
              </div>
              <div className="bg-gray2 border">
                <div
                  className="hover:cursor-pointer  p-3 flex gap-3 "
                  onClick={() => handlePaypal()}
                >
                  <input
                    type="radio"
                    className="hover:cursor-pointer w-4"
                    onChange={() => handleCart}
                  />
                  <div className="bg-white rounded">
                    <Image
                      width={40}
                      height={20}
                      src="https://www.udemy.com/staticx/udemy/images/v9/hpp-paypal.svg"
                      alt="paypal logo"
                    />
                  </div>
                  <p className=" font-semibold">PayPal</p>
                </div>
                <hr />
                <p className={paypalActive ? "flex p-6 bg-white" : "hidden"}>
                  In order to complete your transaction, we will transfer you
                  over to PayPals secure servers.
                </p>
                <div
                  className="hover:cursor-pointer p-3"
                  onClick={() => handleCart()}
                >
                  <div className="flex justify-between w-full">
                    <div className="flex gap-3 flex-1 w-[60%] ">
                      <input
                        type="radio"
                        className="hover:cursor-pointer w-4"
                        onChange={() => setCartActive((prev) => !prev)}
                      />
                      <div className="bg-white h-fit my-auto rounded">
                        <Image
                          width={40}
                          height={20}
                          src="https://www.udemy.com/staticx/udemy/images/v9/card-default.svg"
                          alt="cart deault logo"
                        />
                      </div>
                      <p className="my-auto font-semibold flex-1">
                        Credit/Debit Cart
                      </p>
                    </div>
                    <div className="flex gap-2 flex-wrap w-[40%]  pl-8">
                      <div className="bg-white rounded">
                        <Image
                          height={20}
                          width={40}
                          src="https://www.udemy.com/staticx/udemy/images/v9/card-amex.svg"
                          alt="card-amex"
                        />
                      </div>
                      <div className="bg-white rounded">
                        <Image
                          height={20}
                          width={40}
                          src="	https://www.udemy.com/staticx/udemy/images/v9/card-discover.svg"
                          alt="card-amex"
                        />
                      </div>
                      <div className="bg-white rounded">
                        <Image
                          height={20}
                          width={40}
                          src="https://www.udemy.com/staticx/udemy/images/v9/card-mastercard.svg"
                          alt="card-mastercard"
                        />
                      </div>
                      <div className="bg-white rounded">
                        <Image
                          height={20}
                          width={40}
                          src="	https://www.udemy.com/staticx/udemy/images/v9/card-visa.svg"
                          alt="card-visa"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr className={cartActive ? "flex" : "hidden"} />
                <div className={cartActive ? "w-full px-5 py-5" : "hidden"}>
                  <div className="flex justify-between py-2">
                    <label className="font-bold">Name on cart</label>
                  </div>

                  <input
                    className="border border-gray2 px-4 py-2 w-full"
                    placeholder="name on cart"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />

                  <div className="flex justify-between py-2">
                    <label className="font-bold">Email address</label>
                    <span className="text-sm text-gray2">Required</span>
                  </div>
                  <input
                    required
                    type="text"
                    className="border px-4 py-3 w-full"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="flex gap-2 pb-5">
                  </div>
                  <div className="flex gap-2">
                    <input type="checkbox" className="w-4 border" />
                    <span>Securely save this cart for my later purchase</span>
                  </div>
                </div>
              </div>
              <div className="">
                <h2 className="font-semibold pt-4 text-xl md:text-2xl leading-normal">
                  Order details
                </h2>
                <div className=" flex flex-col w-fill py-4 mx-auto">
                  {potentialBoughtourses}
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="md:bg-[#f8fafb] md:opacity-90 md:min-h-[100vh] text-black md:w-[45%] md:px-10 md:pt-20">
          <div className="w-full md:w-[320px]">
            <h2 className="font-semibold pb-4 text-xl md:text-2xl leading-normal">
              Summary
            </h2>
            <hr />
            <div className="flex justify-between font-bold py-3">
              <p>Total: </p>
              <span>{totalPrice(snippets)} FCFA</span>
            </div>

            {loading ?
              <RequestLoader /> :
              <button
                onClick={() => handlePayment()}
                className="py-4 bg-[#f94d1c] hover:shadow-xl font-semibold text-white w-full"
              >
                Complete checkout
              </button>}
            {popupActive && (
              <>
                <Overlay
                  transparent={false}
                  onClick={() => setPopupActive((prev) => !prev)}
                />
                <div className="fixed h-[50vh] z-[80] bg-white  flex gap-5 flex-col top-[15%] w-[100%] md:left-[33%] shadow-md p-4 md:w-[550px] m-auto mobile:max-sm:w-[90vw] mobile:max-sm:left-2 mobile:max-sm:right-2">
                  <span
                    className=" mr-0 cursor-pointer hover:bg-gray-300 rounded-full w-fit "
                    onClick={() => setPopupActive((prev) => !prev)}><IoMdClose /></span>

                  <h1 className="py-4 md:py-6 font-semibold text-2xl md:text-4xl leading-normal">
                    🎉 Thanks for purchasing🎉
                  </h1>
                  <p className="text-center">Checkout your email address to download code snippet</p>
                  <button
                    onClick={() => handleCheckout()}
                    className="p-4 bg-[#f94d1c] hover:shadow-lg  text-white m-auto w-fit flex justify-center"
                  >
                    Go to dashbord
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}