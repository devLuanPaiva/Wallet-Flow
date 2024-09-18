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
            <div className="flex justify-center items-center h-screen relative bg-purple-200">
                <h2 className="text-purple-950 text-gradient text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-black pb-2 ">Direcionando...</h2>
            </div>
        )
    }
    if (!user?.email && loading) return (
        <LoadingComponent />
    );
    if (!user?.email) return redirect(`/auth?destiny=${path}`)

    return props.children
}