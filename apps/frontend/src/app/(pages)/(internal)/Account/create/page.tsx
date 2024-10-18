import AccountForm from "@/components/account/AccountForm";
import TitleAnimated from "@/components/shared/TitleAnimated";

export default function CreateAccount(){
    return(
        <div className="flex flex-col items-center p-4">
            <TitleAnimated titleTop="Adicione sua" titleBottom="conta bancária" slogan="Conecte sua conta e aproveite todos os benefícios da sua carteira digital!"/>         
            <AccountForm/>
        </div>
    )
}