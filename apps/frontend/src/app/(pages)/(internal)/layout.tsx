import Page from "@/components/shared/Page";
import UserForce from "@/components/shared/UserForce";
import { AccountProvider } from "@/data/contexts/AccountContext";
import Footer from "@/components/shared/Footer";

export default function Layout(props: any) {
    return (
        <UserForce>
            <AccountProvider>
                <Page>{props.children}</Page>
                <Footer/>
            </AccountProvider>
        </UserForce>
    )
}