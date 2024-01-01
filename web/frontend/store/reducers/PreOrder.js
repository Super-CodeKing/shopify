import { createSlice } from "@reduxjs/toolkit";

export const settingSlice = createSlice({
    name: "PreOrderSettings",
    initialState: {},
    reducers: {
        setSetting: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setSetting } = settingSlice.actions;
export default settingSlice.reducer;
