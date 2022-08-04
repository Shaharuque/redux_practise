import { configureStore } from '@reduxjs/toolkit'
import { adminDataReducer,employeeDataReducer } from '../features/members/memberSlice'

export const store = configureStore({
  reducer: {
    adminData:adminDataReducer,
    employeeData:employeeDataReducer,
  },
})