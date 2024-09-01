import AccountI from "./Account.interface";

export default interface RepositoryAccount {
  createAccount(account: AccountI): Promise<void>;
  deposity(value: number, id: number): Promise<void>;
  transfer(value: number, id: number, transferKey: number): Promise<void>;
  chackBalance(id: number): Promise<number>;
  searchAccountKey(transferKey: number): Promise<AccountI>;
}
