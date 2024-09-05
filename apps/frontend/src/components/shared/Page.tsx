interface PageProps {
    children: React.ReactNode;
}
export default function Page(props: Readonly<PageProps>) {
    return (
        <div className="flex flex-col min-h-screen ">
            <main className="h-screen bg-purple-200">{props.children}</main>
        </div>
    )
}