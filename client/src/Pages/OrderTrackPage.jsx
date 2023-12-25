import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { trackOrderById } from "../routes/OrderRoutes";
import NotFound from "../Components/NotFound";
import DateTime from "../Components/DateTime";
import OrderItems from "../Components/OrderItems";
import PaymentIcon from "../Assets/paymentIcon.svg";
import Map from "../Components/Map";

export default function OrderTrackPage() {
  const location = useLocation();
  const orderId = location.state;
  console.log("This is my orderID", orderId);
  const [order, setOrder] = useState();
  useEffect(() => {
    orderId && trackOrderById(orderId).then((order) => setOrder(order));
  }, []);
  if (!orderId)
    return <NotFound message="order not found" linkText="Go to Home Page" />;
  return (
    order && (
      <div>
        <div className="flex justify-around">
          <div className="px-[30px] text-white">
            <div className="text-[40px] font-extrabold text-white drop-shadow-[4px_4px_2px_#000] mb-[1rem]">
              Order Placed
            </div>
            <div className="pb-[20px] flex flex-col gap-1">
              <div className="flex">
                <h2 className="basis-[30%]">Order:</h2>
                <span>#{order.id}</span>
              </div>
              <div className="flex">
                <h2 className="basis-[30%]">Date:</h2>
                <DateTime date={order.createdAt} />
              </div>
              <div className="flex">
                <h2 className="basis-[30%]">Name:</h2>
                <span>{order.name}</span>
              </div>
              <div className="flex">
                <h2 className="basis-[30%]">Address:</h2>
                <span>{order.address}</span>
              </div>
              <div className="flex">
                <h2 className="basis-[30%]">Status:</h2>
                <span>{order.status}</span>
              </div>
              {order.paymentId && (
                <div className="flex">
                  <h2 className="basis-[30%]">Payment ID:</h2>
                  <span>{order.paymentId}</span>
                </div>
              )}
            </div>
            <div>
              <OrderItems order={order} />
            </div>
          </div>
          <div>
            <div className="text-[40px] font-extrabold text-white drop-shadow-[4px_4px_2px_#000] mb-[1rem]">
              Your Location
            </div>
            <Map location={order.addressLatLng} readonly={true} />
          </div>
        </div>
        {order.status === "NEW" && (
          <div className="flex justify-center mt-[1rem]">
            <Link to="/payment">
              <button
                className="text-white uppercase shadow-[5px_5px_10px_#fff] scale-[1] hover:scale-[1.05] transition-all duration-50 ease-in flex items-center gap-2 w-fit px-[10px] py-[5px] text-[20px] rounded-[15px] border-[1px] border-black"
              >
                <span>
                  <img src={PaymentIcon} alt="CheckoutIcon" />
                </span>
                Proceed To Payment
              </button>
            </Link>
          </div>
        )}
      </div>
    )
  );
}
