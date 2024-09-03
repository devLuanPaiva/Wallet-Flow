import UserI from "./User.interface";

export default interface AccountI{
    id?: number;
    transferKey: bigint;
    bankBalance: number;
    user: UserI;
}