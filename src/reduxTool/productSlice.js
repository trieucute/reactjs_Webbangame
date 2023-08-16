import { createSlice } from "@reduxjs/toolkit";


const proSlice=createSlice({
  name: "proSlice",
  initialState: {
    viewsProducts: [],
    allProducts:[],
    specialProducts: [],
  },
  reducers:{
    getAllProduct:(state,action)=>{
      state.allProducts = action.payload;
    },
    getSpecialProduct:(state,action)=>{
      state.specialProducts = action.payload;
    },
    getTopViewsProduct:(state,action)=>{
      state.viewsProducts = action.payload;
    },
    addUser: (state, action) => {
      state.push(action.payload);
    },
    deleteProduct: (state, action) => {
      // const proId = action.payload;
      return state.allProducts.filter((p) => p.id !== action.payload);
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      const userId = updatedUser.id;

      return state.map((user) => {
        if (user.id === userId) {
          return { ...user, ...updatedUser };
        }
        return user;
      });
    }
  }
})
export const { getAllProduct,getTopViewsProduct, getSpecialProduct,addUser, deleteProduct, updateUser } = proSlice.actions;

export default proSlice.reducer;
