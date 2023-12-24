import React, { useEffect, useState } from "react";
import { getNewOrderForCurrentUser } from "../routes/OrderRoutes";
import OrderItems from "../Components/OrderItems";
import Map from "../Components/Map";
import { checkout } from "../routes/PaymentRoutes";

export default function PaymentPage() {
  const [order, setOrder] = useState();
  useEffect(() => {
    getNewOrderForCurrentUser().then((data) => setOrder(data));
  }, []);
  if (!order) return;
  const makePayment = async () => {
    await checkout(order);
  };
  return (
    <div>
      <div className="flex justify-around">
        <div className="px-[30px] text-white">
          <div className="text-[40px] font-extrabold text-white drop-shadow-[4px_4px_2px_#000] mb-[1rem]">
            Order Form
          </div>
          <div className="pb-[20px] flex flex-col gap-1">
            <div className="flex">
              <h2 className="basis-[30%]">Name:</h2>
              <span>{order.name}</span>
            </div>
            <div className="flex">
              <h2 className="basis-[30%]">Address:</h2>
              <span>{order.address}</span>
            </div>
          </div>
          <div>
            <OrderItems order={order} />
          </div>
          <div className="flex justify-center items-center mt-5">
            <button
              className="uppercase shadow-[5px_5px_10px_#fff] scale-[1] hover:scale-[1.05] transition-all duration-50 ease-in flex items-center gap-2 w-fit px-[30px] py-[5px] text-[20px] rounded-[15px] border-[1px] border-black"
              onClick={makePayment}
            >
              Check Out
            </button>
          </div>
        </div>
        <div>
          <div className="text-[40px] font-extrabold text-white drop-shadow-[4px_4px_2px_#000] mb-[1rem]">
            Your Location
          </div>
          <Map location={order.addressLatLng} readonly={true} />
        </div>
      </div>
    </div>
  );
}
