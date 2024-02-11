import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shopName: ''
}

export const preOrderSettingSlice = createSlice({
    name: "preorder",
    initialState,
    reducers: {
        setShopName: (state, action) => {
            state.shopName = action.payload
        }
    },
});

export const { setShopName } = preOrderSettingSlice.actions;
export default preOrderSettingSlice.reducer;
