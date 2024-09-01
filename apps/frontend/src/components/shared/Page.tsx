interface PageProps {
    children: React.ReactNode;
}
export default function Page(props: Readonly<PageProps>) {
    return (
        <div className="flex flex-col min-h-screen ">
            <main>{props.children}</main>
        </div>
    )
}