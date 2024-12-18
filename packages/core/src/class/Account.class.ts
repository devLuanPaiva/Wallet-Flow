import { AccountI, RepositoryAccount } from "../account";
import { TransactionsI } from "../transactions";

export default class Account {
  constructor(private readonly repo: RepositoryAccount) {}

  async createAccount(account: AccountI): Promise<void> {
    const userHasAccount = await this.repo.searchAccount(account.user.id);
    if (userHasAccount) {
      throw new Error("Usuário já possui uma conta.");
    }

    if (account.transferKey.toString().length !== 10) {
      throw new Error(
        "A chave de transferência deve ter exatamente 10 dígitos."
      );
    }

    const existingAccount = await this.repo.searchAccountKey(account.transferKey);
    if (existingAccount) {
      throw new Error("Chave de transferência já cadastrada.");
    }
    const newAccount: AccountI = {
      ...account,
    };

    await this.repo.createAccount(newAccount);
  }

  async searchAccount(userId: number): Promise<AccountI> {
    const account = await this.repo.searchAccount(userId);
    if (!account) throw new Error("Conta não encontrada.");
    return account;
  }

  async checkBalance(id: number): Promise<number> {
    return await this.repo.checkBalance(id);
  }

  async deposity(value: number, id: number): Promise<void> {
    if (value <= 0) throw new Error("Valor deve ser maior que R$ 0,00.");
    await this.repo.deposity(value, id);
  }

  async transfer(
    value: number,
    id: number,
    transferKey: string
  ): Promise<void> {
    if (!value || !transferKey) {
      throw new Error("Todos os dados devem ser preenchidos.");
    }
    const balance = await this.checkBalance(id);
    if (balance < value) throw new Error("Saldo insuficiente.");

    const existingAccount = await this.repo.searchAccountKey(transferKey);
    if (!existingAccount) throw new Error("Conta de destino não encontrada.");

    await this.repo.transfer(value, id, transferKey);
  }

  async getAccountTransactions(
    account: Partial<AccountI>
  ): Promise<TransactionsI[]> {
    return await this.repo.getAccountTransactions(account);
  }
  async reverse(transactionId: number, reversed: boolean): Promise<void> {
    await this.repo.reverse(transactionId, reversed);
  }
}
