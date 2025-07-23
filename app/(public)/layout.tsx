import Footer from "@/components/footer";
import Header from "@/components/header";
import { ReactNode } from "react";

export default function Layout({ children } : {children: ReactNode}) {
  return (
    <>
      <Header />
      <div className="container-large max-w-screen-lg m-auto py-24">
        {/* this will render the children here - foio/page.tsx */}
        {children}
      </div>
      <Footer />
    </>
  )
}