import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shopName: '',
    activation: {}
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
        }
    },
});

export const { setShopName, setActivation } = preOrderSettingSlice.actions;
export default preOrderSettingSlice.reducer;
