import {createSlice} from '@reduxjs/toolkit';

const searchQuerrySlice = createSlice({
    name: 'searchQuerry',
    initialState: {
        searchQuerry: '',
    },
    reducers: {
        setSearchQuerry: (state, action) => {
            state.searchQuerry = action.payload;
        },
    },
});


export const {setSearchQuerry} = searchQuerrySlice.actions;
export default searchQuerrySlice.reducer;