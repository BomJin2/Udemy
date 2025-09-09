import { createSlice } from "@reduxjs/toolkit";

const initialUiState = { showCart: false, notification: null };

const uiState = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    showNotification(state, action) {
      state.notification = { status: action.payload.status, title: action.payload.title, message: action.payload.message };
    },
  },
});

export const uiActions = uiState.actions;

export default uiState.reducer;
