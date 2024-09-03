import { AccountI, RepositoryAccount } from "../account";

export default class Account {
  constructor(private readonly repo: RepositoryAccount) {}

  async createAccount(account: AccountI): Promise<void> {
    const existingAccount = await this.repo.searchAccountKey(
      account.transferKey
    );
    if (existingAccount)
      throw new Error("Chave de transferência já cadastrada.");
    if (account.transferKey.toString().length !== 10) {
      throw new Error(
        "A chave de transferência deve ter exatamente 10 dígitos."
      );
    }

    const newAccount: AccountI = {
      ...account,
      bankBalance: 0,
    };

    await this.repo.createAccount(newAccount);
  }

  async searchAccount(userId: number): Promise<AccountI> {
    const account = await this.repo.searchAccount(userId);
    if (!account) throw new Error("Conta não encontrada.");
    return account;
  }

  async chackBalance(id: number): Promise<number> {
    return await this.repo.chackBalance(id);
  }

  async deposity(value: number, id: number): Promise<void> {
    if (value <= 0) throw new Error("Valor deve ser maior que R$ 0,00.");
    await this.repo.deposity(value, id);
  }

  async transfer(
    value: number,
    id: number,
    transferKey: bigint
  ): Promise<void> {
    const balance = await this.chackBalance(id);
    if (balance < value) throw new Error("Saldo insuficiente.");

    const existingAccount = await this.repo.searchAccountKey(transferKey);
    if (!existingAccount) throw new Error("Conta de destino não encontrada.");

    await this.repo.transfer(value, id, transferKey);
  }
}
