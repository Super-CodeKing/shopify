import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shopName:          '',
    countPreOrder:     null,
    countComingSoon:   null,
    countRequestStock: null,
    isAppEmbeded:      null,
    quickStart:        null
}

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setShopName: (state, action) => {
            state.shopName = action.payload
        },
        setCountPreOrder: (state, action) => {
            state.countPreOrder = action.payload
        },
        setCountComingSoon: (state, action) => {
            state.countComingSoon = action.payload
        },
        setCountRequestStock: (state, action) => {
            state.countRequestStock = action.payload
        },
        setIsAppEmbeded: (state, action) => {
            state.isAppEmbeded = action.payload
        },
        setQuickStartData: (state, action) => {
            state.quickStart = action.payload
        }
    },
});

export const { 
    setShopName, 
    setCountPreOrder, 
    setCountComingSoon, 
    setCountRequestStock,
    setIsAppEmbeded,
    setQuickStartData
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
