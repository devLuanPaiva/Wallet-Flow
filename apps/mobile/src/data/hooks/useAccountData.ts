import { useEffect, useState } from "react";
import { AccountI } from "@wallet/core";
import useAccount from "./useAccount";

export function useAccountData() {
  const { fetchAccount } = useAccount();
  const [account, setAccount] = useState<AccountI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAccount() {
      try {
        const fetchedAccount = await fetchAccount();
        setAccount(fetchedAccount);
      } catch (error: any) {
        setError(error)
      }finally {
        setLoading(false);
      }
    }

    loadAccount();
  }, [fetchAccount]);

  return { account, loading, error };
}
