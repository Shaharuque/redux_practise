import { configureStore } from '@reduxjs/toolkit'
import { adminDataReducer,employeeDataReducer,detailsReducer } from '../features/members/memberSlice'
import { mergedDataReducer } from '../features/members/addSlice'

export const store = configureStore({
  reducer: {
    adminData:adminDataReducer,
    employeeData:employeeDataReducer,
    detailsData:detailsReducer,
    mergedData:mergedDataReducer,
  },
})