import axios from "axios";

export const CreateOrder = async (order) => {
  try {
    console.log("This is my order",order);
    const { data } = axios.post("/api/orders/create", order);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getNewOrderForCurrentUser = async()=>{
  const {data} = await axios.get('/api/orders/newOrderForCurrentUser');
  return data;
}
