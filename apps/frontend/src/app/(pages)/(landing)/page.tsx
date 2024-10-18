import LandingAdvertising from "@/components/landing/LandingAdvertising";
import LandingApresentation from "@/components/landing/LandingApresentation";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingQuality from "@/components/landing/LandingQuality";
import Footer from "@/components/shared/Footer";

export default function Page() {
    return (
            <div className="flex max-w-screen flex-col min-h-screen">
                <LandingHeader/>
                <main className="min-w-full mx-auto flex-1 flex-col ">
                    <LandingApresentation/>
                    <LandingQuality/>
                    <LandingAdvertising/>
                </main>
                <Footer/>
            </div>
        
    );
}
