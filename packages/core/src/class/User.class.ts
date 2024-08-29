import { RepositoryUser } from "../interfaces/RepositoryUser.interface";
import { UserI } from "../interfaces/User.interface";

export default class User{
    constructor(
        private readonly repo: RepositoryUser,

    ){}

    async register(userProps: UserI): Promise<void>{
        const user = await this.repo.searchEmail(userProps.email)
        if(user){
            throw new Error("Email já existe!");
        }
        await this.repo.register(user);
    }
    async login(email: string, password: string): Promise<UserI | null>{
        const user = await this.repo.searchEmail(email)
        if(!user){
            throw new Error("Usuário não encontrado!");
        }
        return user
    }
}