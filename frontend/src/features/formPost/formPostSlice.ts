import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sociogramsService from "./formPostService";
import { FormPostData } from "../../classes/formData";

export const postFormData = createAsyncThunk(
  "questionsFrontend/",
  async (formData: FormPostData, thunkAPI: any) => {
    try {
      return await sociogramsService.postForm(formData);
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

interface FormState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  formData: FormPostData[];
  message: string;
}

const initialState: FormState = {
  formData: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const formPostSlice = createSlice({
  name: "formPost",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.formData = [];
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postFormData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postFormData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.formData = action.payload;
      state.message = "";
    });
    builder.addCase(postFormData.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload as string;
    });
  },
});

export const { reset } = formPostSlice.actions;
export default formPostSlice.reducer;
