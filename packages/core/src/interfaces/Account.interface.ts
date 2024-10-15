import UserI from "./User.interface";

export default interface AccountI{
    id?: number;
    transferKey: string;
    bankBalance: number;
    user: UserI;
}