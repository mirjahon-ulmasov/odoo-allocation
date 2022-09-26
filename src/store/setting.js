import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const date = moment().format("YYYY-MM-DD");

const initialState = {
    date_from: date.slice(0, -2).concat("01"),
    date_to: date,
}

export const setting = createSlice({
    name: "setting",
    initialState,
    reducers: {
        changeDate(state, { payload }) {
            const date = moment(payload).format("YYYY-MM-DD");
            state.date_from = date.slice(0, -2).concat('01');
            state.date_to = date;
        }
    }
})

export const { changeDate } = setting.actions;
export default setting.reducer;