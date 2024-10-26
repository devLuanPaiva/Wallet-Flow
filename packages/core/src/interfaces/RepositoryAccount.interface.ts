import AccountI from "./Account.interface";
import TransactionsI from "./transactions.interface";

export default interface RepositoryAccount {
  createAccount(account: AccountI): Promise<void>;
  deposity(value: number, id: number): Promise<void>;
  transfer(value: number, id: number, transferKey: string): Promise<void>;
  checkBalance(id: number): Promise<number>;
  searchAccountKey(transferKey: string): Promise<AccountI | null>;
  searchAccount(userId: number): Promise<AccountI | null>;
  getAccountTransactions(account: Partial<AccountI>): Promise<TransactionsI[]>
  reverse(transactionId: number, reversed: boolean): Promise<void>
}
