import { configureStore } from "@reduxjs/toolkit";
import uploadSliceReducer from "./slices/uploadSlice";

const store = configureStore({
  reducer: {
    upload: uploadSliceReducer,
  },
});

export default store;
