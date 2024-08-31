import AccountI from "./Account.interface";

export default interface RepositoryAccount {
  createAccount(account: AccountI): Promise<void>;
  deposity(value: number): Promise<void>;
  transfer(value: number, recipient: AccountI): Promise<void>;
  chackBalance(): Promise<number>;
  searchAccountKey(transferKey: number): Promise<AccountI | null>;
}
