import NavbarComponent from "@/components/navbar/navbar";

export default function RootLayout({ children }) {

    return (
        <>
        <NavbarComponent/>
            {children}
        </>
    )
}