import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shopName: '',
    activation: {},
    productList: [],
    buttonSettings: {},
    inheritFromTheme: null,
    schedule: {},
    displayMessage: {},
    badgeDesign: {}
}

export const requestStockSettingSlice = createSlice({
    name: "requeststock",
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
        setButtonSettings: (state, action) => {
            state.buttonSettings = action.payload
        },
        setSchedule: (state, action) => {
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
    setButtonSettings,
    setSchedule,
    setDisplayMessage,
    setBadgeDesign,
    setInheritFromTheme
} = requestStockSettingSlice.actions;
export default requestStockSettingSlice.reducer;
