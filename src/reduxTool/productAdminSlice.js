import { createSlice } from "@reduxjs/toolkit";


const proAdminSlice=createSlice({
  name: "proAdminSlice",
  initialState:[],
  reducers:{
    getAllProducts:(state,action)=>{
     return state = action.payload;
    },
   
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    deleteProduct: (state, action) => {
      // const proId = action.payload;
      return state.filter((p) => p.id !== action.payload);
    },
    updateProduct: (state, action) => {
      const updatedProduct = action.payload;
      const ProductId = updatedProduct.id;

      return state.map((Product) => {
        if (Product.id === ProductId) {
          return { ...Product, ...updatedProduct };
        }
        return Product;
      });
    }
  }
})
export const { getAllProducts,addProduct, deleteProduct, updateProduct } =  proAdminSlice.actions;

export default  proAdminSlice.reducer;
