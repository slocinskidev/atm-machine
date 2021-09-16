import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IAccountState, IUserState, TAccount, ILoginValues } from 'shared/types.d';

const userInitialState: IUserState = {
  account: null,
  error: {
    status: false,
    message: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<TAccount>) {
      state.account = action.payload;
      state.error.status = false;
      state.error.message = '';
    },
    logoutSuccess(state) {
      state.account = null;
    },
    loginError(state, action: PayloadAction<string>) {
      state.error.status = true;
      state.error.message = action.payload;
    },
  },
});

export default userSlice.reducer;

const { loginSuccess, logoutSuccess, loginError } = userSlice.actions;

export const login =
  ({ cardNumber, pin }: ILoginValues) =>
  async (dispatch: any) => {
    try {
      const { data } = await axios.get('accounts.json');
      const loggedAccount: IAccountState = data?.find(
        (account: ILoginValues): boolean => account.cardNumber === cardNumber && account.pin === pin
      );
      if (!loggedAccount) throw new Error('Wrong account details');
      dispatch(loginSuccess(loggedAccount));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(loginError(error?.message));
      }
    }
  };

export const logout = () => (dispatch: any) => dispatch(logoutSuccess());
