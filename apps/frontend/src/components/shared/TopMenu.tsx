'use client'
import useUser from "@/data/hooks/useUser"
import LoadingComponent from "./LoadingComponent"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { IconLogout2, IconWallet } from "@tabler/icons-react"

export default function TopMenu() {
    const { loading: loadingUser, user, logout } = useUser()
    const router = useRouter()

    if (loadingUser) return <LoadingComponent />
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <h2 className="text-lg font-bold leading-5 z-10 bg-white text-purple-800 rounded-md px-4 py-2 hover:bg-gray-50 ">
                    {user!.name!.split(' ')[0]}
                </h2>

            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Menu Usuário</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/Account/create')} className="gap-2">
                    <IconWallet />
                    Criar Conta
                </DropdownMenuItem>

                <DropdownMenuItem onClick={logout} className="gap-2">
                    <IconLogout2 />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}