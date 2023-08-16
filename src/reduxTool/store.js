import { configureStore } from "@reduxjs/toolkit";
// import bankReducer from "./bankSlice";
import catReducer from './categorySlice'
import proReducer from "./productSlice";
import proAdminReducer from "./productAdminSlice";
export const store=configureStore({
    reducer:{
        product: proReducer,
        category:catReducer,
        proAdminReducer,
        // proReducer,
        // catReducer,
    }
})