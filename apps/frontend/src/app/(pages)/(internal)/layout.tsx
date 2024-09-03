import Page from "@/components/shared/Page";
import UserForce from "@/components/shared/UserForce";
import { AccountProvider } from "@/data/contexts/AccountContext";
import Header from "@/components/shared/Header";

export default function Layout(props: any) {
    return (
        <UserForce>
            <AccountProvider>
                <Header />
                <Page>{props.children}</Page>
            </AccountProvider>
        </UserForce>
    )
}