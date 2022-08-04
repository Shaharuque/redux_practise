import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//async action(getAdmins) to fetch admins data list depending on page_ad
export const getAdmins = createAsyncThunk("admins/getAdmins", async (page_ad) => {
  const response = await axios.get(`https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=admin&page=${page_ad}&limit=5`);
  return response.data;
});

const initialState = {
  loading: false,
  admins: [],
  employees:[],
  error: ''
}

const adminSlice = createSlice({
  name: 'admins',
  initialState,

  reducers: {

  },
  //async action creator
  extraReducers: (builder) => {
    builder.addCase(getAdmins.pending, (state) => {
      state.loading = true;
      state.error = {};
    });
    builder.addCase(getAdmins.fulfilled, (state, action) => {
      state.loading = false;
      state.error = {};
      state.admins = action.payload;
    });
    builder.addCase(getAdmins.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.admins = "";
    });
  },
})

export const adminDataReducer = adminSlice.reducer; //sliceName.reducer

//---------------------------------------------------//

//async action(getEmployees) to fetch employees data depending on page and limit=5
export const getEmployees = createAsyncThunk("employees/getEmployees", async (page) => {
  const response = await axios.get(`https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=employee&page=${page}&limit=5`);
  return response.data;
});


const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {

  },
  //async action creator
  extraReducers: (builder) => {
    builder.addCase(getEmployees.pending, (state) => {
      state.loading = true;
      state.error = {};
    });
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      state.loading = false;
      state.error = {};
      state.employees = action.payload;
    });
    builder.addCase(getEmployees.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.employees = "";
    });
  },
})

export const employeeDataReducer = employeeSlice.reducer; //sliceName.reducer