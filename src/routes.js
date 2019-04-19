import Products from "./components/products";
import Cart from "./components/cart";
import Hallwaze from "./components/hallwaze";
import RichTextExample from "./containers/customEditor/RichTextExample";
import PageBuilder from "./components/pageBuilder";
import Tables from "./containers/customEditor/SlateTable";
import customEditor from './containers/customEditor'
import SlateEditor from "./containers/slateEditor";
import SlateSimpleTable from "./containers/slateTable";

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
  {
    path: "/table",
    component: Tables
  },
  {
    path: '/plugin',
    component: customEditor
  },
  {
    path: '/slate',
    component: SlateEditor
  },
  {
    path: '/slatesimpletable',
    component: SlateSimpleTable
  }
];
export default routes;
