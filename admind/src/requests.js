import axios from "axios"

const BASE_URL="http://localhost:5000"

const superlogin =async(values)=>{
    const response =await axios.post(`${BASE_URL}/superadmin/login`,values)
    return response
  }

  const addproducttoServer=async(values)=>{
    const response=await axios.post(`${BASE_URL}/collections/addproduct`,values)
    return response
  }

  const getAllProducts=async()=>{
    const response=await axios.get(`${BASE_URL}/collections/getallproducts`,)
    return response
  }

  const deleteProduct=async(id)=>{
    const response=await axios.delete(`${BASE_URL}/collections/deleteproduct/${id}`,)
    return response
  }

  export  {superlogin,addproducttoServer,getAllProducts,deleteProduct}