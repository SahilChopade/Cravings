import React, { useEffect, useState } from "react";
import { getNewOrderForCurrentUser } from "../routes/OrderRoutes";
import OrderItems from "../Components/OrderItems";
import Map from "../Components/Map";
import { useNavigate } from "react-router-dom";
import PaypalButtons from "../Components/PaypalButtons";

export default function PaymentPage() {
  const [order, setOrder] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getNewOrderForCurrentUser().then((data) => setOrder(data));
  }, []);

  if (!order) return;

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
            <PaypalButtons order={order} />
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
