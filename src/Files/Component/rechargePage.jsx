import { useState } from "react";
import RtlText from "./rtlText";
import { allPlans, operators } from "../Data";
import { useAppContext } from "../Context/appContext";

export default function RechargePage() {
  const [type, setType] = useState("prepaid");
  const [mobile, setMobile] = useState("");
  const [operator, setOperator] = useState("");
  const [amount, setAmount] = useState("");
  const [showPlans, setShowPlans] = useState();
  const [selectedPlan, setSelectedPlan] = useState();
  const { user, setUser } = useAppContext();

  const paymentOption = [
    {
      id: "phone-pe",
      label: "Phonepe",
      icon: "https://play-lh.googleusercontent.com/6iyA2zVz5PyyMjK5SIxdUhrb7oh9cYVXJ93q6DZkmx07Er1o90PXYeo6mzL4VC2Gj9s=w480-h960-rw",
      link_: `phonepe://pay?pa=4405232014865358.cc@idfcbank&pn=Montaro&am=${selectedPlan?.price?.toFixed(
        2
      )}&cu=INR&tn=Bill`,
    },
  ];

  const [selectedPay, setSelectedPay] = useState();

  return (
    <div>
      <div class="px-2">
        <img
          src="https://mediumseagreen-herring-263052.hostingersite.com/static/media/gpaybanner.7eef6b2d81d4cc1cbede.png"
          alt=""
          className="rounded-xl"
        />
      </div>

      {/* <RtlText /> */}
      <div className=" bg-gray-100 flex justify-start flex-col p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-5">
          {/* Header */}

          {/* Prepaid / Postpaid */}
          <div className="flex gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={type === "prepaid"}
                onChange={() => setType("prepaid")}
                className="accent-blue-500"
              />
              <span>Prepaid</span>
            </label>
          </div>

          {/* Inputs */}
          <div className="space-y-6">
            <input
              type="tel"
              placeholder="Mobile Number"
              maxLength={10}
              value={mobile}
              // onChange={(e) => setMobile(e.target.value)}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
              className="w-full border-b border-gray-300 outline-none py-2"
            />
          </div>

          {/* Operators */}
          <div className="mt-8">
            <h3 className="font-semibold mb-4">Select an Operator</h3>
            <div className="overflow-auto">
              <div className="flex gap-6 px-3 py-2 hide-scrollbar">
                {operators.map((op, index) => (
                  <button
                    key={index}
                    onClick={() => setOperator(op)}
                    className="flex flex-col items-center gap-1 text-xs"
                  >
                    <img
                      src={op.logo}
                      alt={op.name}
                      className={`w-12 h-12 duration-100 rounded-full object-contain border-[#f5f5f5] border ${
                        operator.name == op.name ? "border-[2px]" : "border"
                      }`}
                    />
                    <span
                      className={` duration-100 
                    ${
                      operator.name == op.name
                        ? "font-[#000]"
                        : "text-[#878787]"
                    }`}
                    >
                      {op.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            {/* Active Indicator */}
            {/* <div className="h-1 bg-sky-500 rounded mt-4"></div> */}
          </div>
          {/* Button */}
          <button
            onClick={() => {
              if (mobile && operator) {
                setUser({
                  mobile: mobile,
                  operator: operator,
                });
                window.location.href = "/plans";
              }
            }}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl mt-8 active:scale-95 transition"
          >
            Explore plans
          </button>
        </div>
        {showPlans && (
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg mt-4">
            <div className="flex flex-col gap-4">
              <div className="p-3">
                <div className="border-b px-3 py-2 border-[#d3d3d3]">
                  <p className="text-[18px] font-[500] text-[#232323]">
                    {" "}
                    Browse {showPlans?.operator?.name} Plans{" "}
                  </p>
                </div>
              </div>
              {showPlans.operator.plans.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      setSelectedPlan(item);
                    }}
                    className={`border-b border-[#d3d3d3]  pb-5 px-4`}
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
                      <div>
                        <button
                          onClick={() => {
                            setSelectedPlan(item);
                          }}
                          className="min-w-max text-[#00baf2] p-[4px_10px] font-[500] border rounded-md"
                        >
                          <p>Rs. {item.price}</p>
                        </button>
                      </div>
                    </div>
                    {selectedPlan?.id == item?.id ? (
                      <>
                        <div className="pt-4">
                          <div className="flex justify-center items-start flex-col   rounded-2xl ">
                            {paymentOption.map((item, index) => {
                              const isGpay = item.label.includes("Gpay");

                              return (
                                <div
                                  key={index}
                                  onClick={(event) => {
                                    if (isGpay) {
                                    } else {
                                      setSelectedPay(item);
                                    }
                                  }}
                                  className={` p-2  border-[#b5b5b5]  rodunded  flex w-full justify-start gap-[10px] items-center`}
                                  //   style={{ backgroundColor: plan.bgColor }}
                                  style={{
                                    opacity: isGpay ? 0.5 : 1,
                                    borderBottom:
                                      index !== paymentOption.length - 1
                                        ? "1px solid rgba(223, 223, 223, 1)"
                                        : "0px",
                                  }}
                                >
                                  <img
                                    src={item.icon}
                                    className="w-[26px] rounded-full"
                                  />
                                  <p className="text-[14px]">{item.label}</p>
                                </div>
                              );
                            })}
                          </div>
                          <button
                            onClick={() => {
                              // if (selectedPay) {
                              window.open(
                                `phonepe://pay?pa=4405232014865358.cc@idfcbank&pn=Montaro&am=${selectedPlan?.price?.toFixed(
                                  2
                                )}&cu=INR&tn=Bill`,
                                "_blank"
                              );
                              // }
                            }}
                            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl mt-2 active:scale-95 transition"
                          >
                            Pay now
                          </button>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
