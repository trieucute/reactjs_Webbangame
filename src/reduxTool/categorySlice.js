import { createSlice } from "@reduxjs/toolkit";


const catSlice=createSlice({
  name: "catSlice",
  initialState: [],
  reducers:{
    getAllCate:(state,action)=>{
      return action.payload
    },
    addCate: (state, action) => {
       state.push(action.payload);
    },
    deleteCate: (state, action) => {
      const cateId = action.payload;
      return state.filter((cate) => cate.id !== cateId);
    },
    updateCate: (state, action) => {
      const updatedCate = action.payload;
      const CateId = updatedCate.id;

      return state.map((Cate) => {
        if (Cate.id === CateId) {
          return { ...Cate, ...updatedCate };
        }
        return Cate;
      });
    }
  }
})
export const { getAllCate, addCate, deleteCate, updateCate } = catSlice.actions;

export default catSlice.reducer;
