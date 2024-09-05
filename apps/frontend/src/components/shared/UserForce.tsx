'use client'
import useUser from "@/data/hooks/useUser"
import { usePathname, useRouter } from "next/navigation"
import LoadingComponent from "./LoadingComponent"

export default function UserForce(props: any) {
    const { user, loading } = useUser()
    const path = usePathname()
    const router = useRouter()

    const redirect = (url: string) => {
        router.push(url)
        return (
            <div className="flex justify-center items-center h-screen">
                Direcionando...
            </div>
        )
    }
    if (!user?.email && loading) return (
        <LoadingComponent/>
    );
    if (!user?.email) return redirect(`/auth?destiny=${path}`)
        
    return props.children
}