'use client'
import AccountData from "@/components/account/AccountData";
import AccountSteps from "@/components/account/AccountSteps";
import LoadingComponent from "@/components/shared/LoadingComponent";
import NotAccount from "@/components/shared/NotAccount";
import { useAccountData } from "@/data/hooks/useAccountData";

export default function PageHome() {
    const { account, loading } = useAccountData()
    if (loading) {
        return <LoadingComponent />
    }
    return account ? (
        <div className="min-h-screen w-full flex flex-col items-center space-y-3">
            <AccountData account={account} />
            <AccountSteps account={account}/>
        </div>
    ) : <NotAccount />
}