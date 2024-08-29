import { ProviderCryptography, UserI, RepositoryUser } from "../user";

export default class User {
  constructor(
    private readonly repo: RepositoryUser,
    private readonly crypt: ProviderCryptography
  ) {}

  async register(userProps: UserI): Promise<void> {
    const user = await this.repo.searchEmail(userProps.email);
    if (user) {
      throw new Error("Email já existe!");
    }
    const passwordCryptography = await this.crypt.cryptography(
      userProps.password
    );

    const newUser: UserI = {
      ...user,
      password: passwordCryptography,
    };
    await this.repo.register(newUser);
  }
  async login(email: string, password: string): Promise<UserI | null> {
    const user = await this.repo.searchEmail(email);
    if (!user) {
      throw new Error("Usuário não encontrado!");
    }
    const isPasswordValid = await this.crypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Credenciais inválidas!");
    }
    delete user.password;
    return user;
  }
}
