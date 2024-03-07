import axios from "axios"

// const BASE_URL="http://localhost:5000"
const BASE_URL="https://api.fabbricato.in"


export const getfullcollection=async(category)=>{
    
    try{
        const response=await fetch(`${BASE_URL}/collections/${category}`,{method:'POST',
    headers:{
        'Content-Type': 'application/json',
    }})
        const data=await response.json()
        return data
    }
    catch(error){
        console.log("something went wrong",error)
        throw error
    }
}

export const detailById=async(id)=>{
    try{
        const response=await fetch(`${BASE_URL}/collections/${id}`)
        const data=await response.json()
        return data
    }
    catch(error){
        console.log("something went wrong",error)
        throw error
    }
}

export const detailOfDash=async(proid)=>{
  try{
    const response=await fetch(`${BASE_URL}/products/${proid}`)
    const data=await response.json()
    return data

  }
  catch(err){
    console.log('something went wrong')
    throw err
  }
}

export const contactUs = async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/contactus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });
  
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error, "Something went wrong");
      throw error;
    }
  };

  export const login = async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status !== 200) {
        throw new Error('Login failed');
      }
  
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };


   const saveAddress =async(address,id)=>{
    const response =await axios.post(`${BASE_URL}/addresses/add-address/${id}`,address)
    return response
  }

  const getAddress=async(id)=>{
    const reponse=await axios.get(`${BASE_URL}/addresses/get-address/${id}`)
    return reponse
  }

  const getfilterProducts=async(values)=>{
    const response=await axios.post(`${BASE_URL}/collections/filteredProducts`,(values))
    return response
  }

  const getAllProducts=async()=>{
    const response=await axios.get(`${BASE_URL}/collections/getallproducts`)
    return response
  }

  export {saveAddress, getAddress,getfilterProducts,getAllProducts}