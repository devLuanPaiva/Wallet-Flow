import AccountI from "./Account.interface";
import TransactionsI from "./transactions.interface";

export default interface RepositoryAccount {
  createAccount(account: AccountI): Promise<void>;
  deposity(value: number, id: number): Promise<void>;
  transfer(value: number, id: number, transferKey: bigint): Promise<void>;
  chackBalance(id: number): Promise<number>;
  searchAccountKey(transferKey: bigint): Promise<AccountI>;
  searchAccount(userId: number): Promise<AccountI>;
  getAccountTransactions(accountId: number): Promise<TransactionsI[]>
  reverse(transactionId: number, reversed: boolean): Promise<void>
}
