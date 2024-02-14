import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shopName: '',
    activation: {},
    productList: []
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
        }
    },
});

export const { setShopName, setActivation, setProductList } = preOrderSettingSlice.actions;
export default preOrderSettingSlice.reducer;
