import { AccountI } from "@wallet/core";

export interface AccountProps{
    account: AccountI
}
export interface ErrorContainerProps {
    error: string,
    navigation: any
}