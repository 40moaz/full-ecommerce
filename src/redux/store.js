import { configureStore } from "@reduxjs/toolkit";
import breadcrumbReducer from "./breadcrumbSlice";

export const store = configureStore({
  reducer: {
    breadcrumb: breadcrumbReducer,
  },
});
