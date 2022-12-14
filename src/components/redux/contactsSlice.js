import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import * as phonebookOperations from 'components/redux/phonebookOperations';

const extraActions = [
  phonebookOperations.fetchContacts,
  phonebookOperations.addContact,
  phonebookOperations.deleteContact,
];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder =>
    builder
      .addCase(phonebookOperations.fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(phonebookOperations.addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(phonebookOperations.deleteContact.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addMatcher(
        isAnyOf(...extraActions.map(action => action.pending)),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(...extraActions.map(action => action.rejected)),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(...extraActions.map(action => action.fulfilled)),
        state => {
          state.isLoading = false;
          state.error = null;
        }
      ),
});

export const contactsSliceReduser = contactsSlice.reducer;
