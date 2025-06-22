import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trail: [],
};

export const breadcrumbSlice = createSlice({
  name: "breadcrumb",
  initialState,
  reducers: {
    addPage: (state, action) => {
      const existingIndex = state.trail.findIndex(
        (item) => item.path === action.payload.path
      );
      if (existingIndex !== -1) {
        state.trail = state.trail.slice(0, existingIndex + 1);
      } else {
        state.trail.push(action.payload);
      }
    },
    goToPage: (state, action) => {
      const index = state.trail.findIndex(
        (item) => item.path === action.payload
      );
      if (index !== -1) {
        state.trail = state.trail.slice(0, index + 1);
      }
    },
  },
});

export const { addPage, goToPage } = breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;
