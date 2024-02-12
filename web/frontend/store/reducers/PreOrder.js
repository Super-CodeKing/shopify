import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shopName: '',
    activation: {
        active: true,
        active_on_collection: false,
        active_on_product: true,
        when_show_pre_order: 1,
        specific_inventory: 0
    }
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
