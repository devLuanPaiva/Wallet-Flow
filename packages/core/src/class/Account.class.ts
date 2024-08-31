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

  async chackBalance(): Promise<number> {
    return await this.repo.chackBalance();
  }

  async deposity(value: number): Promise<void> {
    if (value <= 0) throw new Error("Valor deve ser maior que R$ 0,00.");
    await this.repo.deposity(value);
  }

  async transfer(value: number, recipient: AccountI): Promise<void> {
    const balance = await this.chackBalance();
    if (balance < value) throw new Error("Saldo insuficiente.");

    const existingAccount = await this.repo.searchAccountKey(
      recipient.transferKey
    );
    if (!existingAccount) throw new Error("Conta de destino não encontrada.");

    await this.repo.transfer(value, existingAccount);
  }
}
