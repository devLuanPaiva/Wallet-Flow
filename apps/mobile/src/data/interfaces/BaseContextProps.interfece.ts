import { AccountI, TransactionsI, UserI } from "@wallet/core";
export interface BaseContextProps {
  user: UserI | null;
  loading: boolean;
}
export interface SectionContextProps extends BaseContextProps {
  createSection: (jwt: string) => void;
  clearSection: () => void;
  token: string | null;
}
export interface UserContextProps extends BaseContextProps {
  login: (user: Partial<UserI>) => Promise<void>;
  register: (user: UserI) => Promise<void>;
  logout: () => void;
}

export interface AccountContextProps {
  createAccount: (account: Partial<AccountI>) => Promise<void>;
  deposit: (value: number, accountId: number) => Promise<void>;
  transfer: (
    value: number,
    accountId: number,
    transferKey: string
  ) => Promise<void>;
  checkBalance: (accountId: number) => Promise<number>;
  fetchAccount: () => Promise<AccountI>;
  getAccountTransactions(account: Partial<AccountI>): Promise<TransactionsI[]>;
  reverse(transactionId: number, reversed: boolean): Promise<void>;
}
