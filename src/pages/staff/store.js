import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

import { toast } from "react-toastify";

const API = "http://localhost:8080/api/v1/staffs";

export const fetchStaffs = createAsyncThunk("staffs/fetchStaffs", async({ page, size }) => {
    try {
        const response = await axios.get(`${API}?page=${page}&size=${size}`);
        console.log(response);
        return response.data.content;
    } catch(error) {
        throw error;
    }
});

export const staffSlice = createSlice({
    name: "staffs",
    initialState: {
        status: "idle",
        openStaffModal: false,
        error: null,
        staffs: [],
    },
    reducers: {
        toggleAddModal: (state, action) => {
            state.openStaffModal = action.payload;
        },
        pushStaff: (state, action) => {
            state.staffs.unshift(action.payload);

            toast.success("Add Successfully", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStaffs.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchStaffs.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.staffs = action.payload;
            })
            .addCase(fetchStaffs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});
export const {
    toggleAddModal,
    pushStaff,
}  = staffSlice.actions;
export default staffSlice.reducer;  