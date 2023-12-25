import React, { useState } from "react";
import { useCart } from "../Hooks/useCart";
import { Link, useNavigate } from "react-router-dom";
import { CreateOrder } from "../routes/OrderRoutes";
import OrderItems from "../Components/OrderItems";
import Map from "../Components/Map";
import { toast } from "react-toastify";
import PaymentIcon from "../Assets/paymentIcon.svg";
export default function CheckoutPage() {
  const [userdata, setUserData] = useState({
    name: "",
    address: "",
  });
  const { cart } = useCart();
  const navigate = useNavigate();
  const [order, setOrder] = useState({ ...cart });
  const handleSubmit = async () => {
    if (!order.addressLatLng) {
      toast.warning("Please Select Your Location on the MAP");
      return;
    }
    // console.log("This ismy datta", userdata);
    await CreateOrder({
      ...order,
      name: userdata.name,
      address: userdata.address,
    });
    navigate("/payment");
  };
  const handleChange = (e) => {
    setUserData({ ...userdata, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="flex justify-around">
        <div className="px-[30px] text-white">
          <div className="text-[40px] font-extrabold text-white drop-shadow-[4px_4px_2px_#000] mb-[1rem]">
            Order Details
          </div>
          <div className="pb-[20px] flex flex-col gap-5">
            <input
              className="placeholder-white min-w-[25rem] max-w-[35rem] focus:outline-none flex opacity-[0.8] hover:opacity-[1.5] rounded-[10px] p-[5px] px-[10px] shadow-[5px_5px_10px_#000000] text-white bg-transparent border-black border-[1px]"
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Enter Your Name"
            />
            <input
              className="placeholder-white min-w-[25rem] max-w-[35rem] focus:outline-none flex opacity-[0.8] hover:opacity-[1.5] rounded-[10px] p-[5px] px-[10px] shadow-[5px_5px_10px_#000000] text-white bg-transparent border-black border-[1px]"
              type="text"
              name="address"
              onChange={handleChange}
              placeholder="Enter Your Address"
            />
          </div>
          <div>
            <OrderItems order={order} />
          </div>
          <div className="flex justify-center mt-[3rem]">
            <Link>
              <button
                onClick={handleSubmit}
                className="text-white uppercase shadow-[5px_5px_10px_#fff] scale-[1] hover:scale-[1.05] transition-all duration-50 ease-in flex items-center gap-2 w-fit px-[10px] py-[5px] text-[20px] rounded-[15px] border-[1px] border-black"
              >
                <span>
                  <img src={PaymentIcon} alt="CheckoutIcon" />
                </span>
                Proceed To Payment
              </button>
            </Link>
          </div>
        </div>
        <div>
          <div className="text-[40px] font-extrabold text-white drop-shadow-[4px_4px_2px_#000] mb-[1rem]">
            Find my location
          </div>
          <Map
            location={order.adressLatLng}
            onChange={(latlng) => {
              console.log(latlng);
              setOrder({ ...order, addressLatLng: latlng });
            }}
          />
        </div>
      </div>
    </>
  );
}
