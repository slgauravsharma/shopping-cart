import Products from "./components/products";
import Cart from "./components/cart";
import Hallwaze from "./components/hallwaze";
import RichTextExample from "./containers/customEditor/RichTextExample";
import PageBuilder from "./components/pageBuilder";

const routes = [
  {
    path: "/",
    component: RichTextExample
  },
  {
    path: "/pageBuilder",
    component: PageBuilder
  },
  {
    path: "/cart",
    component: Cart
  },
];
export default routes;
