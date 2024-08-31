import { createContext, useCallback, useMemo } from "react";
import { UserContextProps } from "../interfaces";
import useAPI from "../hooks/useApi";
import useSection from "../hooks/useSection";
import { useRouter } from "next/router";
import { UserI } from "@wallet/core";

const UserContext = createContext<UserContextProps>({} as any)

export function UserProvider({ children }: any) {
    const { httpPOST } = useAPI()
    const { clearSection, createSection, loading, user } = useSection()
    const router = useRouter()

    const register = useCallback(async (user: UserI) => {
        await httpPOST('user/register', user)
    }, [httpPOST])

    const login = useCallback(async (user: Partial<UserI>) => {
        const token = await httpPOST('user/login', user);
        createSection(token);
    }, [createSection, httpPOST]);

    const logout = useCallback(() => {
        clearSection();
        router.push("/");
    }, [router, clearSection]);

    const contextValue = useMemo(() => {
        return {
            user,
            register,
            login,
            logout,
            loading,
        }
    }, [loading, user, login, register, logout])

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext