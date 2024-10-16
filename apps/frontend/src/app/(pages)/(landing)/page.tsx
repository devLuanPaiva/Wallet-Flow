import LandingApresentation from "@/components/landing/LandingApresentation";
import LandingHeader from "@/components/landing/LandingHeader";

export default function Page() {
    return (
            <div className="flex flex-col min-h-screen">
                <LandingHeader/>
                <main className="w-screen mx-auto flex-1">
                    <LandingApresentation/>
                </main>
            </div>
        
    );
}
