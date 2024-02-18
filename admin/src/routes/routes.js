import { Route, Routes } from "react-router-dom";
import Home from "../containers/home";
import AddProducts from "../containers/addProduct";
import Login from "../containers/login";
import Authlayout from "../layouts/Authlayout";
import Protected from "./Protected";
import basicLayout from "../layouts/Basiclayout";
import Products from "../containers/products";

const Rout = () => {
  return (
    <Routes>
      <Route path="/" element={<Authlayout />}>
        <Route index element={<Login />} />
      </Route>

      <Route path="/app" element={<Protected Component={basicLayout} />}>
        <Route index element={<Home />} />
        <Route path="addproducts" element={<AddProducts />} />
        <Route path="products" element={<Products/>}/>
      </Route>
    </Routes>
  );
};

export default Rout;
