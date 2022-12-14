import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilterRedux(state, action) {
      return (state = action.payload);
    },
  },
});
export const { changeFilterRedux } = filterSlice.actions;
