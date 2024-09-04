import { ProviderCryptography, UserI, RepositoryUser } from "../user";

export default class User {
  constructor(
    private readonly repo: RepositoryUser,
    private readonly crypt: ProviderCryptography
  ) {}

  async register(user: UserI): Promise<void> {
    const existingUser = await this.repo.searchEmail(user.email);
    if (existingUser) throw new Error("Usuário já cadastrado");
    const passwordCryptography = await this.crypt.cryptography(user.password);
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
