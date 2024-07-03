import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import formUrlsService from "./formUrlsService";

export const formUrl = createAsyncThunk(
  "auth/form",
  async (_, thunkAPI: any) => {
    try {
      return await formUrlsService.getFormUrls();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

interface FormUrlsState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  formUrls: any[];
  message: string;
}

const initialState: FormUrlsState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  formUrls: [],
  message: "",
};

export const formUrlsSlice = createSlice({
  name: "formUrls",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.formUrls = [];
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(formUrl.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(formUrl.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.formUrls = action.payload;
      state.message = "";
    });
    builder.addCase(formUrl.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload as string;
    });
  },
});

export default formUrlsSlice.reducer;
export const { reset } = formUrlsSlice.actions;