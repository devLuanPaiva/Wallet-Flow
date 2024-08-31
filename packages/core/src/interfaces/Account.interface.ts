import UserI from "./User.interface";

export default interface AccountI{
    id?: number;
    transferKey: number;
    bankBalance: number;
    user: UserI;
}