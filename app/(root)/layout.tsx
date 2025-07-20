import Footer from "@/components/Footer";
import Index from "@/components/shared/header/index";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
        <Index/>
        <main className="flex-1 wrapper">{children}</main>
        <Footer/>
    </div>
  );
}