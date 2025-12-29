export const CartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
  return {
    ...state,
    cart: action.payload
  };

    case "ADD_TO_CART":
      const existing = state.cart.find((item) => item._id === action.payload._id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) => 
            item._id === action.payload._id
            ? item.qty < 10
            ? {...item, qty: item.qty + 1} : item : item
        ),
        };
      }else{

      
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
      }
    case "Increment":
        return {
            ...state,
            cart: state.cart.map((item)=>
                item._id === action._id && item.qty < 10 
            ? {...item, qty: item.qty + 1} : item
            ),
        }
    case "Decrement":
        return {
            ...state,
            cart: state.cart.map((item)=>
                item._id === action._id && item.qty > 1
            ? {...item, qty: item.qty - 1} : item
            )
        }
    case "Remove":
        return {
            ...state,
            cart : state.cart.filter((item)=>
            item._id !== action._id
            )
        }
        case "CLEAR_CART":
  return {
    ...state,
    cart: []
  }

    default:
      return state;
  }
};
