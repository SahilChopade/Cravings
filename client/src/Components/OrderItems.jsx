import React from "react";
import { Link } from "react-router-dom";
import Price from "./Price";
export default function OrderItems({ order }) {
  return (
    <ul className="flex flex-col gap-1 divide-y-2 divide-black p-[5px] grow border-[1px] border-black min-w-[25rem] max-w-[35rem] shadow-[5px_5px_10px_#000] rounded-[10px]">
      {order.items.map((item) => (
        <li className="grid grid-cols-4 py-[5px] items-center justify-center text-center" key={item.food}>
          <img
            className="w-[5rem] h-[5rem] rounded-[100%] object-cover border-[2px] border-teal-600"
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
