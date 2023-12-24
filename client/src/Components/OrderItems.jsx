import React from "react";
import { Link } from "react-router-dom";
import Price from "./Price";
export default function OrderItems({ order }) {
  return (
    <ul className="flex flex-col gap-1 divide-y-2 divide-black p-[5px] grow border-[1px] border-black min-w-[25rem] max-w-[35rem] shadow-[5px_5px_10px_#000] rounded-[10px]">
      <div className="flex justify-between px-[5px]">
        <div>Order Items</div>
        <div className="flex gap-2">
          <h2>Total Value:</h2>
          <span className="font-extrabold drop-shadow-[4px_4px_2px_#000]">
            <Price price={order.totalPrice} />
          </span>
        </div>
      </div>
      {order.items.map((item) => (
        <li
          className="grid grid-cols-4 py-[5px] items-center justify-center text-center"
          key={item.food}
        >
          <img
            className="w-[3rem] h-[3rem] rounded-[100%] object-cover border-[2px] border-white ml-[10px]"
            src={`${item.food.imageUrl}`}
            alt={item.food.name}
          />
          <Link to={`/food/${item.food.id}`}>{item.food.name}</Link>
          <div>{item.quantity}</div>
          <Price price={item.price} />
        </li>
      ))}
    </ul>
  );
}
