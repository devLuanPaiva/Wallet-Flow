import { AccountI } from "../../dist";

export default interface TransactionsI {
  id?: number;
  type?: string;
  value?: number;
  account?: Partial<AccountI>;
  recipientAccount?: Partial<AccountI>;
  reversed?: boolean;
  createdAt?: Date
}
