import React, { useState } from "react";
import { useCart } from "../Hooks/useCart";
import { Link } from "react-router-dom";
import Price from "../Components/Price";
export default function CartPage() {
  const { cart, removeFromCart, changeQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <div>CART PAGE</div>
      {cart && cart.items.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-[0.5rem] m-[1.5rem] justify-between text-white p-[20px]">
          <ul className="flex flex-col gap-4 grow px-[20px]">
            {cart.items.map((item) => (
              <li
                className="grid grid-cols-5 items-center border-[1px] border-black py-[10px] rounded-[10px] shadow-[5px_5px_10px_#000]"
                key={item.food}
              >
                <div className="flex justify-center items-center">
                  <img
                    className="w-[5rem] h-[5rem] rounded-[100%] object-cover border-[2px] border-teal-600"
                    src={`/foods/${item.food.imageUrl}`}
                    alt={item.food.name}
                  />
                </div>
                <div className="uppercase font-semibold">
                  <Link to={`/food/${item.food.id}`}>{item.food.name}</Link>
                </div>
                <div className="flex items-center gap-4 text-[20px] text-center">
                  <div
                    onClick={() => changeQuantity(item, item.quantity - 1)}
                    className="cursor-pointer border-[1px] border-black rounded-[2px] w-[30px] aspect-square shadow-[3px_3px_4px_#000]"
                  >
                    -
                  </div>
                  <div>{item.quantity}</div>
                  <div
                    onClick={() => changeQuantity(item, item.quantity + 1)}
                    className="cursor-pointer border-[1px] border-black rounded-[2px] w-[30px] aspect-square shadow-[3px_3px_4px_#000]"
                  >
                    +
                  </div>
                </div>
                <div>
                  <Price price={item.price} />
                </div>
                <button
                  onClick={() => removeFromCart(item.food.id)}
                  className="hover:shadow-[5px_5px_8px_#000000] scale-[1] hover:scale-[1.05] transition-all duration-50 ease-in flex items-center gap-2 w-fit px-[10px] py-[5px] text-[20px] uppercase rounded-[15px] border-[1px] border-black"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="opacity-[0.8] hover:opacity-[1.5] h-[20rem] min-w-[20rem] max-w-[30rem] border-[1px] border-black px-[30px] py-[20px] rounded-[20px] shadow-[8px_8px_8px_#000000]">
            <div className="text-center text-black font-extrabold text-[40px] mb-[20px]">
              CHECKOUT
            </div>
            <div className="flex flex-col gap-3 text-[20px]">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span>{cart.totalCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount: </span>
                <Price price={cart.totalPrice} />
              </div>
              <Link className="flex justify-center" to="/checkout">
                <button className="hover:shadow-[5px_5px_8px_#000000] scale-[1] hover:scale-[1.05] transition-all duration-50 ease-in flex items-center gap-2 w-fit px-[10px] py-[5px] text-[20px] rounded-[15px] border-[1px] border-black">
                  Proceed To Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
