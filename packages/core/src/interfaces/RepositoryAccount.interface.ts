import AccountI from "./Account.interface";

export default interface RepositoryAccount {
  createAccount(account: AccountI): Promise<void>;
  deposity(value: number, id: number): Promise<void>;
  transfer(value: number, id: number, transferKey: bigint): Promise<void>;
  chackBalance(id: number): Promise<number>;
  searchAccountKey(transferKey: bigint): Promise<AccountI>;
  searchAccount(userId: number): Promise<AccountI>;
}
