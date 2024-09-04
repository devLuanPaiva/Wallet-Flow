import React from "react";

import AccountDate from "@/components/account/AccountData";
import AccountDeposity from "@/components/account/AccountDeposity";
import AccountTransfer from "@/components/account/AccountTransfer";

export default function AccountPage() {

  return(
    <div className="flex flex-col items-center h-screen relative bg-purple-200 p-4">
        <AccountDate/>
        <AccountDeposity/>
        <AccountTransfer/>
    </div>
)
}
