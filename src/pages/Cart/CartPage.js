import { CartEmpty } from "./components/CartEmpty";
import { CartList} from "./components/CartList";
import { useCart } from "../../context";
import {useTitle} from "../../hooks/useTitle";

export const CartPage = () => {
  const { cartlist } =useCart();
  useTitle(`Cart (${cartlist.length})`)

  return (
    <main>
                { cartlist.length ? <CartList /> : <CartEmpty /> }
    </main>
  )
}
