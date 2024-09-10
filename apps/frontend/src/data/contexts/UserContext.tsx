'use client'
import { createContext, useCallback, useMemo } from "react";
import { UserContextProps } from "../interfaces";
import useAPI from "../hooks/useApi";
import useSection from "../hooks/useSection";
import { UserI } from "@wallet/core";
import { useRouter } from "next/navigation";

const UserContext = createContext<UserContextProps>({} as any)

export function UserProvider({ children }: any) {
  const { httpPOST } = useAPI()
  const { clearSection, createSection, loading, user } = useSection()
  const router = useRouter();

  const register = useCallback(async (user: UserI) => {
    try {
      await httpPOST('user/register', user);
    } catch (error: any) {
      throw error.message
    }
  }, [httpPOST]);

  const login = useCallback(async (user: Partial<UserI>) => {
    try {
      const token = await httpPOST('user/login', user);
      createSection(token);
    } catch (error: any) {
      throw error.message
    }
  }, [createSection, httpPOST]);

  const logout = useCallback(() => {
    clearSection();
    router.push("/");
  }, [router, clearSection]);

  const contextValue = useMemo(() => {
    return {
      loading,
      user,
      login,
      register,
      logout,
    };
  }, [loading, user, login, register, logout]);
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
