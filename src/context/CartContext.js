import { createContext, useContext, useReducer } from "react"
import { cartReducers } from "../reducers/cartReducers";

const CartInitialState={
    cartlist:[],
    total: 0
}

const CartContext=createContext(CartInitialState);

export const CartProvider =({children}) => {

const [state,dispatch]=useReducer(cartReducers, CartInitialState);
function addToCart(product){
  let  updatedList = state.cartlist.concat(product);
  let  updatedTotal = state.total +product.price
    dispatch({
        type: "ADD_TO_CART",
        payload:{
            products:updatedList,
            total:updatedTotal
        }
    })
}

function removeFromCart(product){
    const  updatedList = state.cartlist.filter(val => val.id !== product.id );
    const  updatedTotal = state.total - product.price
      dispatch({
          type: "REMOVE_FROM_CART",
          payload:{
              products:updatedList,
              total:updatedTotal                
          }
      })
  }

  function clearCart(){
    dispatch({
        type:"CLEAR_CART",
        payload:{
            products:[],
            total:0
        }
    })
  }


    const value={
        cartlist: state.cartlist,
        total:state.total,
        addToCart,
        removeFromCart,
        clearCart

    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart =() => {
    const context = useContext(CartContext);
    return context;
}