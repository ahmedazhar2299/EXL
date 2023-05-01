import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/reducer/counterReducer";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
