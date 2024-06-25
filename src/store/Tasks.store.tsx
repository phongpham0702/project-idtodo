import { createSlice } from "@reduxjs/toolkit";

import { TaskType } from "../interfaces/TaskType";

import { Tasks } from "../constant/Tasks";

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: Tasks as TaskType[],
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);
        },
        removeTask: (state, action) => {
            const index = state.findIndex(task => task.id === action.payload);
            state.splice(index, 1);
        },
        toggleImportantTask: (state, action) => {
            const index = state.findIndex(task => task.id === action.payload);
            state[index].isImportant = !state[index].isImportant;
        },
        toggleTaskCompleted: (state, action) => {
            const index = state.findIndex(task => task.id === action.payload);
            state[index].isComplete = !state[index].isComplete;
        },
        editTask: (state, action) => {
            const index = state.findIndex(task => task.id === action.payload.id);
            state[index] = action.payload;
        
        },
    }
});

export const { addTask, removeTask, toggleImportantTask, toggleTaskCompleted, editTask} = tasksSlice.actions;
export default tasksSlice.reducer;