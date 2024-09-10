interface PageProps {
    children: React.ReactNode;
}
export default function Page(props: Readonly<PageProps>) {
    return (
        <div className="flex flex-col ">
            <main className="min-h-screen bg-purple-200">{props.children}</main>
        </div>
    )
}