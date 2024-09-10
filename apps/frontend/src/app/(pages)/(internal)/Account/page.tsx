'use client'
import React from "react";
import AccountDate from "@/components/account/AccountData";
import AccountDeposity from "@/components/account/AccountDeposity";
import AccountTransfer from "@/components/account/AccountTransfer";
import { useAccountData } from "@/data/hooks/useAccountData";
import { IconPigOff } from "@tabler/icons-react";
import Link from "next/link";
import LoadingComponent from "@/components/shared/LoadingComponent";

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
    <section className="h-screen flex flex-col justify-center items-center gap-4 rounded-lg">
      <IconPigOff size={80} stroke={0.5} className="text-purple-950" />
      <h3>Você não possui conta.</h3>
      <Link href="/Account/create" className="bg-purple-600 text-white font-semibold text-base md:text-lg py-2 px-4 rounded-md hover:bg-purple-700">
        Criar Conta
      </Link>
    </section>
  );
}
