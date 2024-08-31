import UserI from "./User.interface";

export default interface RepositoryUser{
    register(user: UserI): Promise<void>
    searchEmail(email: string): Promise<UserI>
}