import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shopName: '',
    activation: {},
    productList: [],
    orderList: [],
    buttonSettings: {},
    preOrderLimit: {}
}

export const preOrderSettingSlice = createSlice({
    name: "preorder",
    initialState,
    reducers: {
        setShopName: (state, action) => {
            state.shopName = action.payload
        },
        setActivation: (state, action) => {
            state.activation = action.payload
        },
        setProductList: (state, action) => {
            state.productList = action.payload
        },
        setOrderList: (state, action) => {
            state.orderList = action.payload
        },
        setButtonSettings: (state, action) => {
            state.buttonSettings = action.payload
        },
        setPreOrderLimit: (state, action) => {
            state.preOrderLimit = action.payload
        }
    },
});

export const { 
    setShopName, 
    setActivation, 
    setProductList, 
    setOrderList,
    setButtonSettings,
    setPreOrderLimit
} = preOrderSettingSlice.actions;
export default preOrderSettingSlice.reducer;
