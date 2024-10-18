
interface PageProps {
    children: React.ReactNode;
}
export default function Page(props: Readonly<PageProps>) {
    return (
        <div className="flex flex-col bg-gradient-to-b from-purple-50 via-purple-100 to-purple-300">
            <main className="min-h-screen w-full box-border md:w-4/5 m-auto flex-1 py-3 px-4 ">{props.children}</main>
        </div>
    )
}