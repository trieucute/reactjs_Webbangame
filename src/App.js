import "./App.css";
import logo from "./logo.png";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import User from "./componets/adduser";
import Home from "./pages/admin/home";
import Listuser from "./componets/listuser";
import Homes from "./pages/layout/home";
import Store from "./pages/layout/store";
import Main from "./pages/layout/main";
import DetailPro from "./pages/layout/detailPro";
import Text from "./pages/layout/text";
import SignUp from "./pages/layout/login/signUp";
import SignIn from "./pages/layout/login/signIn";
import HomeAdmin from "./pages/admin/home";
import Dashboard from "./pages/admin/dashboard";
import ListProducts from "./pages/admin/product/listProducts";
import AddProduct from "./pages/admin/product/addProduct";
import Test from "./pages/admin/product/test";
import EditProduct from "./pages/admin/product/editProduct";
import ListCategory from "./pages/admin/category/listCategory";
import AddCategory from "./pages/admin/category/addCategory";
import EditCategory from "./pages/admin/category/editCategory";

function App() {
  const [dropdown, setDropdown] = useState(false);
  const show = () => {
    setDropdown(!dropdown);
  };
  return (
    <div className="App">
      <Routes>
        <Route element={<Homes />}>
          <Route path="/" element={<Main />} />

          <Route path="/shop" element={<Store />} />
          {/* <Route path="/test" element={<Text/>} /> */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/shop/:id" element={<Store />} />
          <Route path="/shop/detail/:id" element={<DetailPro />} />
        </Route>

        <Route path="/admin" element={<HomeAdmin />}>
          <Route  path="/admin" element={<Dashboard/>} />
          <Route path="/admin/products/list" element={<ListProducts/>} />
          <Route path="/admin/products/add" element={<AddProduct/>} />
          <Route path="/admin/products/edit/:id" element={<EditProduct/>} />

          <Route path="/admin/category/list" element={<ListCategory/>} />
          <Route path="/admin/category/add" element={<AddCategory/>} />
          <Route path="/admin/category/edit/:id" element={<EditCategory/>} />
          
          <Route path="/admin/user/add" element={<User />} />
          <Route path="/admin/test" element={<Test/>} />
          
          <Route path="/admin/user/list" element={<Listuser />} />
          {/* <Route path="/home" element={<Home />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
