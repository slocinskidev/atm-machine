import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AccountState } from 'data/model.d';

interface ILogInData {
  cardNumber: number;
  pin: number;
}

interface IUserState {
  account: AccountState | null | undefined;
  error: {
    status: boolean;
    message: string;
  };
}

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
    loginSuccess(state, action: PayloadAction<null | undefined | AccountState>) {
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
  ({ cardNumber, pin }: ILogInData) =>
  // eslint-disable-next-line consistent-return
  async (dispatch: any) => {
    try {
      const { data } = await axios.get('accounts.json');
      const loginAccount: AccountState = data?.find(
        (acc: ILogInData): boolean => acc.cardNumber === cardNumber && acc.pin === pin
      );
      if (loginAccount === undefined) throw new Error('Wrong account details');
      dispatch(loginSuccess(loginAccount));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(loginError(error?.message));
      }
    }
  };

export const logout = () => (dispatch: any) => dispatch(logoutSuccess());
