import { configureStore } from "@reduxjs/toolkit";

import formUrlsReducer from "../features/urls/formUrlsSlice";

export const store = configureStore({
  reducer: {
    formUrls: formUrlsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
