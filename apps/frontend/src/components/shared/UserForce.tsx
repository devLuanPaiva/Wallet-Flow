'use client'
import useUser from "@/data/hooks/useUser"
import { usePathname, useRouter } from "next/navigation"

export default function UserForce(props: any) {
    const { entity, loading } = useUser()
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
    if (!entity?.email && loading) return (
        <section className="flex justify-center items-center h-screen relative">
            <h2 className="text-gradient text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black pb-2">Carregando...</h2>
        </section>
    );
    if (entity?.email) return redirect(`/auth?destiny=${path}`)
        
    return props.children
}