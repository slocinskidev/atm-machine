import { createSlice } from '@reduxjs/toolkit';
import { AccountState } from 'data/model.d';

const initialState: AccountState = {
  owner: 'Eryk Słociński',
  cardNumber: 12345678,
  pin: 1234,
  balance: 1337,
  currency: 'PLN',
  isLggedIn: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    getCardNumber(state) {
      return state;
    },
    getPin(state, action) {
      state.pin = action.payload;
    },
  },
});

export const { getCardNumber, getPin } = accountSlice.actions;
export default accountSlice.reducer;
