import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shopName: '',
    productList: [],
    orderList: [],
    settings: null
}

export const preOrderSettingSlice = createSlice({
    name: "preorder",
    initialState,
    reducers: {
        setShopName: (state, action) => {
            state.shopName = action.payload
        },
        setProductList: (state, action) => {
            state.productList = action.payload
        },
        setOrderList: (state, action) => {
            state.orderList = action.payload
        },
        setSettings: (state, action) => {
            state.settings = action.payload
        }
    },
});

export const { 
    setShopName, 
    setSettings, 
    setProductList, 
    setOrderList
} = preOrderSettingSlice.actions;
export default preOrderSettingSlice.reducer;
