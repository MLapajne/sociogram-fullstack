import { configureStore } from "@reduxjs/toolkit";

import formUrlsReducer from "../features/urls/formUrlsSlice";
import formPeopleReducer from "../features/urls/formPeopleSlice";

export const store = configureStore({
  reducer: {
    formUrls: formUrlsReducer,
    formPeople: formPeopleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
