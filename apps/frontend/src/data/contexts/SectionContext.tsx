'use client'
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { SectionContextProps } from "../interfaces";
import { jwtDecode } from 'jwt-decode'
import { UserI } from "@wallet/core";

const SectionContext = createContext<SectionContextProps>({} as any)

export function SectionProvider(props: any) {
    const storageKey = 'user-authorization'
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<UserI | null>(null)

    const loadSection = useCallback(function () {
        try {
            setLoading(true)
            const state = getState()
            setToken(state?.token ?? null)
            setUser(state?.user ?? null)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadSection()
    }, [loadSection])

    const createSection = useCallback((jwt: string) => {
        sessionStorage.setItem(storageKey, jwt)
        loadSection()
    }, [loadSection])

    const clearSection = useCallback(() => {
        sessionStorage.removeItem(storageKey)
        setToken(null)
        setUser(null)
    }, [])

    function getState(): { token: string, user: UserI } | null {
        const jwt = sessionStorage.getItem(storageKey)
        if (!jwt) return null

        try {
            const decoded: any = jwtDecode(jwt)
            const expired = decoded.exp < Date.now() / 1000
            if (expired) {
                sessionStorage.removeItem(storageKey)
                return null
            }
            return {
                token: jwt,
                user: {
                    id: decoded.id,
                    name: decoded.name,
                    email: decoded.email,
                }
            }
        } catch (err) {
            sessionStorage.removeItem(storageKey)
            return null
        }
    }

    const contextValue = useMemo(() => ({
        loading,
        token,
        user,
        createSection,
        clearSection,
    }), [loading, token, user, createSection, clearSection])

    return (
        <SectionContext.Provider value={contextValue}>
            {props.children}
        </SectionContext.Provider>
    )
}

export default SectionContext