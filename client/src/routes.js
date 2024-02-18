import React from "react";
import { Route,Routes } from "react-router-dom";
import Home from "./containers/home"
import Products from "./containers/category"
import Contact from "./containers/contact"
import Collection from "./containers/collection"
import Shoppingcart from "./containers/shoppingcart";
import Details from "./containers/detailedproduct"
import Login from './containers/login'
import Signup from './containers/signup'
import Notfound from './containers/notfound'
import MyProfile from "./containers/myprofile";



function Rout(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/category" element={<Products/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/collection" element={<Collection/>}/>
            <Route path="/shoppingcart" element={<Shoppingcart/>}/>
            <Route path="/details/:id" element={<Details/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/myprofile" element={<MyProfile/>}/>
            <Route path="*" element={<Notfound/>}/>
        </Routes>
    )
}

export default Rout