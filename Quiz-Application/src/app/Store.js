import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../features/Slices";

export default configureStore({
  reducer: {
    quizss: quizReducer,
  },
});