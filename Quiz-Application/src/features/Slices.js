// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchCategories = createAsyncThunk(
//   "quiz/fetchCategories",
//   async () => {
//     const response = await axios.get(
//       "https://localhost:7278/Category/GetAllCategory"
//     );
//     return response.data;
//   }
// );

// const quizSlice = createSlice({
//   name: "quiz",
//   initialState: {
//     categories: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCategories.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.categories = action.payload;
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export default quizSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "quiz/fetchCategories",
  async () => {
    debugger;
    const response = await axios.get(
      "https://localhost:7278/Category/GetAllCategory"
    );
    return response.data;
  }
);
const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    categories: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    debugger;
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default quizSlice.reducer;
