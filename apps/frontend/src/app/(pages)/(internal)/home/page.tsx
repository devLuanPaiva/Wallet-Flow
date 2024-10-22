'use client'
import AccountData from "@/components/account/AccountData";
import LoadingComponent from "@/components/shared/LoadingComponent";
import NotAccount from "@/components/shared/NotAccount";
import { useAccountData } from "@/data/hooks/useAccountData";

export default function PageHome() {
    const { account, loading } = useAccountData()
    if (loading) {
        return <LoadingComponent />
    }
    return account ? (
        <div className="h-screen w-full flex flex-col items-center space-y-3">
            <AccountData account={account} />
        </div>
    ) : <NotAccount />
}