import { Poppins } from "next/font/google";
import "./globals.css";
import LenisScroll from "@/components/lenis-scroll";
import { AuthProvider } from "@/context/AuthContext";

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

export const metadata = {
    title: "agentix - PrebuiltUI",
    description: "Agentix is a prebuilt UI template for AI-powered SaaS applications.",
    appleWebApp: {
        title: "agentix",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={poppins.variable}>
                <AuthProvider>
                    <LenisScroll />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}