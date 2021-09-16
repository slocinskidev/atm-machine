export interface ILoginValues {
  cardNumber: number;
  pin: number;
}

export interface IAccountState extends ILoginValues {
  owner: string;
  balance: number;
  currency: string;
}

export interface IErrorState {
  status: boolean;
  message: string;
}

export type TAccount = IAccountState | null | undefined;

export interface IUserState {
  account: TAccount;
  error: IErrorState;
}
