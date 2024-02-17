import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shopName: '',
    activation: {},
    productList: [],
    orderList: [],
    buttonSettings: {},
    inheritFromTheme: null,
    preOrderLimit: {},
    schedule: {},
    displayMessage: {},
    badgeDesign: {}
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
        },
        setPreOrderSchedule: (state, action) => {
            state.schedule = action.payload
        },
        setDisplayMessage: (state, action) => {
            state.displayMessage = action.payload
        },
        setBadgeDesign: (state, action) => {
            state.badgeDesign = action.payload
        },
        setInheritFromTheme: (state, action) => {
            state.inheritFromTheme = action.payload;
        }
    },
});

export const { 
    setShopName, 
    setActivation, 
    setProductList, 
    setOrderList,
    setButtonSettings,
    setPreOrderLimit,
    setPreOrderSchedule,
    setDisplayMessage,
    setBadgeDesign,
    setInheritFromTheme
} = preOrderSettingSlice.actions;
export default preOrderSettingSlice.reducer;
