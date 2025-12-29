import { createContext, useContext, useEffect, useReducer } from "react";
import { CartReducer } from "./CartReducer";
import { AuthContext } from "./authContext";


export const CartContext = createContext()
const base_url =  import.meta.env.VITE_API_URL

const initialState = {
   cart: [],
}


const CartProvider = ({children})=>{
   
   const [state, dispatch] = useReducer(CartReducer, initialState)

   const {isLoggedIn, username} = useContext(AuthContext)

   const totalItems = state.cart.reduce((acc, item)=> acc + item.qty, 0)
 const totalPrice = state.cart.reduce((acc, item)=> acc + Number(item.price) * item.qty, 0)

 useEffect(()=>{
   const fetchCart = async ()=>{
      if(!isLoggedIn) return;
      try {
         const token = localStorage.getItem("token")
         const res = await fetch(`${base_url}/v1/cart/getcart`,{
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
            },
         });
         const data = await res.json();

        if (res.ok && data.cart?.items) {
  const formattedItems = data.cart.items.map((item) => ({
    _id: item.productId?._id,
    title: item.productId?.title,
    price: item.productId?.price,
    description: item.productId?.description,
    category: item.productId?.category,
    image: item.productId?.image,
    qty: item.qty,
  }));

  dispatch({ type: "SET_CART", payload: formattedItems });
}
      } catch (error) {
         console.error('error fetching cart',error);
 
      }
   }
   fetchCart();
 }, [isLoggedIn, username])
    
 useEffect(()=>{
   const syncCart = async ()=>{
      if(!isLoggedIn ) return
      try {
         const token = localStorage.getItem("token")
         const body = {
            items: state.cart.map((item)=>({
               productId: item._id,
               qty: item.qty
            }))
         }
         await fetch(`${base_url}/v1/cart/updatecart`,{
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
         })
      } catch (error) {
         console.error("error syncing cart", error);
         
         
      }
   }
   syncCart()
 }, [state.cart, isLoggedIn])
    useEffect(() => {
     if (!isLoggedIn) {
       dispatch({ type: "CLEAR_CART" });
     }
   }, [isLoggedIn]);
     return (
        <CartContext.Provider value={{...state, dispatch, totalItems, totalPrice}}>
            {children}
        </CartContext.Provider>
     )
}

export default CartProvider