import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getById } from "../routes/FoodRoutes";
import StarRating from "../Components/StarRating";
import Price from "../Components/Price";
import cartAddIcon from "../Assets/cartAddIcon.svg";
import { useCart } from "../Hooks/useCart";
import NotFound from "../Components/NotFound";
import { motion } from "framer-motion";

const textVariants = {
  initial: {
    y: "100px",
    opacity: 0,
  },
  animate: {
    y: "0px",
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.2,
    },
  },
};

export default function FoodPage() {
  const [food, setFood] = useState({});
  const { id } = useParams();
  const { addtoCart } = useCart();
  const navigate = useNavigate();
  const handleAddtoCart = () => {
    addtoCart(food);
    navigate("/cart");
  };
  useEffect(() => {
    getById(id).then(setFood);
  }, [id]);
  return (
    <>
      {!food ? (
        <NotFound message={"Food Not Found!!"} linkText={"Back To HomePage"} />
      ) : (
        <div className="flex justify-center flex-wrap mx-[2rem] mt-[2rem]">
          <motion.img
            initial={{
              x: "-200px",
              opacity: 0,
            }}
            animate={{
              x: "0px",
              opacity: 1,
              transition: {
                duration: 1,
              },
            }}
            className="min-w-[25rem] max-w-[35rem] rounded-[30px] flex-1 object-cover shadow-[5px_5px_10px_#000000]"
            src={`${food.imageUrl}`}
            alt={food.name}
          />
          <div className="w-[100%] flex flex-col flex-1 rounded-[30px] px-[30px] ml-[5rem] text-white">
            <motion.div
              variants={textVariants}
              animate="animate"
              initial="initial"
              className="uppercase text-[5rem] font-bold tracking-[5px] drop-shadow-[8px_8px_5px_#000000]"
            >
              {food.name}
            </motion.div>
            <motion.div
              variants={textVariants}
              animate="animate"
              initial="initial"
              className="py-[10px]"
            >
              <StarRating stars={food.stars} size={25} />
            </motion.div>
            <motion.div
              variants={textVariants}
              animate="animate"
              initial="initial"
              className="flex gap-[10px] uppercase"
            >
              {food.origins?.map((origin) => (
                <div
                  className="border-[1px] border-black rounded-[10px] px-[10px] shadow-[5px_5px_10px_#000000] mt-[10px]"
                  key={origin}
                >
                  {origin}
                </div>
              ))}
            </motion.div>
            <motion.div
              variants={textVariants}
              animate="animate"
              initial="initial"
              className="py-[10px] mt-[5px]"
            >
              Time to Cook: ⏱️<strong>{food.cookTime}</strong> minutes
            </motion.div>
            <motion.div
              variants={textVariants}
              animate="animate"
              initial="initial"
            >
              <span>Price: </span>
              <Price price={food.price} />
            </motion.div>
            <div
              className="flex items-center justify-center py-[20px]"
            >
              <button
                onClick={handleAddtoCart}
                className="hover:shadow-[5px_5px_8px_#000000] scale-[1] hover:scale-[1.05] transition-all duration-50 ease-in flex items-center gap-2 w-fit px-[10px] py-[5px] text-[20px] uppercase rounded-[15px] border-[1px] border-black"
              >
                <span>
                  <img src={cartAddIcon} alt="cartIcon" />
                </span>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
