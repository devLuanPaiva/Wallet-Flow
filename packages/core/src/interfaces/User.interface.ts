import AccountI from "./Account.interface";

export default interface UserI{
    id?: number;
    name?: string;
    email: string;
    password?: string;
    account?: AccountI
}