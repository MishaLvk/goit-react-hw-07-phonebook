import { configureStore } from '@reduxjs/toolkit';
import { contactsSliceReduser } from './contactsSlice';
import { filterSlice } from './filterSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsSliceReduser,
    filter: filterSlice.reducer,
  },
});
