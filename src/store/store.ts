import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './Tasks.store'
import modalReducer from './modal.store'
// ...

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    modal: modalReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch