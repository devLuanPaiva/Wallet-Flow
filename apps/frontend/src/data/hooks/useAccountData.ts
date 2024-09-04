'use client'
import { useEffect, useState } from "react";
import useAccount from "./useAccount";
import { AccountI } from "@wallet/core";

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
        } catch (error) {
          console.error('Erro ao carregar a conta: ', error);
          setError('Erro ao carregar a conta');
        } finally {
          setLoading(false);
        }
      }
  
      loadAccount();
    }, [fetchAccount]);
  
    return { account, loading, error };
  }