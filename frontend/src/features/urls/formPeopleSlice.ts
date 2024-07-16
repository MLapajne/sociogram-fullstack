import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sociogramsService from "./formPeopleService";

export const fetchSociograms = createAsyncThunk(
  "sociograms/",
  async (_, thunkAPI: any) => {
    try {
      return await sociogramsService.getSociograms();
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

interface Sociogram {
  id: number;
  instructor_name: string;
  description: string;
  language: string;
  sociogram_unique_id: string;
  questions: {
    id: number;
    question_text: string;
    question_type: string;
  }[];
  users: {
    id: number;
    uid: string;
    first_name: string;
    last_name: string;
    gender: string;
  }[];
}

interface SociogramsState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  sociograms: Sociogram[];
  message: string;
}

const initialState: SociogramsState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  sociograms: [],
  message: "",
};

export const sociogramsSlice = createSlice({
  name: "sociograms",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.sociograms = [];
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSociograms.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSociograms.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.sociograms = action.payload;
      state.message = "";
    });
    builder.addCase(fetchSociograms.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload as string;
    });
  },
});

export default sociogramsSlice.reducer;
export const { reset } = sociogramsSlice.actions;
