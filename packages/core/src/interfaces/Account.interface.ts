import UserI from "./User.interface";

export default interface AccountI{
    id?: number;
    transferKey: bigint | string;
    bankBalance: number;
    user: UserI;
}