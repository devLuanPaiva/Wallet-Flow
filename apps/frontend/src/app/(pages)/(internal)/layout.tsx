import Page from "@/components/shared/Page";
import UserForce from "@/components/shared/UserForce";
import { AccountProvider } from "@/data/contexts/AccountContext";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function Layout(props: any) {
    return (
        <UserForce>
            <AccountProvider>
                <Header />
                <Page>{props.children}</Page>
                <Footer/>
            </AccountProvider>
        </UserForce>
    )
}