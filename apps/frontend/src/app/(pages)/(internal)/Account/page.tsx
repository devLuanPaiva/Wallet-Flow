'use client'
import React from "react";
import AccountDate from "@/components/account/AccountData";
import AccountDeposity from "@/components/account/AccountDeposity";
import AccountTransfer from "@/components/account/AccountTransfer";
import { useAccountData } from "@/data/hooks/useAccountData";
import LoadingComponent from "@/components/shared/LoadingComponent";
import NotAccount from "@/components/shared/NotAccount";

export default function AccountPage() {
  const { account, loading } = useAccountData()
  if (loading) {
    return <LoadingComponent/>;
  }

  return account ? (
    <div className="flex flex-col items-center relative p-4">
      <AccountDate account={account} />
      <AccountDeposity account={account} />
      <AccountTransfer account={account} />
    </div>
  ) : (
    <NotAccount/>
  );
}
