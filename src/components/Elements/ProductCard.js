import { Link } from "react-router-dom"
import { Rating } from "./Rating";
import { useCart } from "../../context";
import { useEffect, useState } from "react";

export const ProductCard = ({product}) => {
    const {cartlist, addToCart,removeFromCart}=useCart()
    const {id,name,overview,rating,price,image_local,best_seller}=product; /*we can use poster instead image_local */
    const [inCart,setInCart]=useState(false);

    useEffect(()=>{
       const productInCart= cartlist.find(item => item.id ===product.id);

        if(productInCart){
            setInCart(true);
        }
        else{
            setInCart(false)
        }

    },[cartlist,product.id])



  return (
    <div className="m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        
        <Link to={`/products/${id}`} className="relative" >    {/*it should be /products/${id} because if products/${id} it represents the current path then it will route localhost:3000/product/products/1001 */}
          {best_seller && <span className="absolute top-4 left-2 px-2 bg-orange-500 bg-opacity-90 text-white rounded">Best Seller</span>}  
            <img className="rounded-t-lg w-full h-64" src={image_local  } alt={name} />
        </Link> 
        <div className="p-5">
            <Link to={`/products/${id}`}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{overview}</p>
            
            <div className="flex items-center my-2">
                {/* <i className="text-lg bi bi-star-fill text-yellow-500 mr-1"></i>
                <i className="text-lg bi bi-star-fill text-yellow-500 mr-1"></i>
                <i className="text-lg bi bi-star-fill text-yellow-500 mr-1"></i>
                <i className="text-lg bi bi-star-fill text-yellow-500 mr-1"></i>
                <i className="text-lg bi bi-star text-yellow-500 mr-1"></i> */}
                <Rating rating={rating}/>
            </div>

            <p className="flex justify-between items-center">
                <span className="text-2xl dark:text-gray-200">
                    <span>$</span><span>{price}</span>
                </span>
               
                {inCart?<button onClick={()=>removeFromCart(product)} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800">Remove Item <i className="ml-1 bi bi-trash3"></i></button> :  <button onClick={() => {addToCart(product)}} className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 {product.in_stock? "": "cursor-not-allowed"}`} disabled={ product.in_stock ? "" : "disabled" }>Add To Cart <i className="ml-1 bi bi-plus-lg"></i></button>}
            </p>
        </div>
    </div>
  )
}
