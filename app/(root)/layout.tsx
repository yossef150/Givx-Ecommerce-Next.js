import Footer from "@/components/Footer";
import Index from "@/components/shared/header/index";
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
        <Index/>
        <main className="flex-1 wrapper">{children}</main>
        <Toaster
        richColors
          toastOptions={{
            classNames: {
              title: "text-center my-auto", // my-auto for vertical centering
              actionButton: "px-6 py-4", 
            },
          }}
        />
        <Footer/>
    </div>
  );
}