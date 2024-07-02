import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/appSlice";
import { createLogger } from "redux-logger";

const reduxLogger = createLogger({ diff: true });

export const store = configureStore({
  reducer: {
    appSlice: appReducer,
  },
  middleware: [reduxLogger],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
