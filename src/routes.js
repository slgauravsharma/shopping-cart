import Products from "./components/products";
import Cart from "./components/cart";

const routes = [
  {
    path: "/",
    component: Products
  },
  {
    path: "/cart",
    component: Cart
  }
];
export default routes;
