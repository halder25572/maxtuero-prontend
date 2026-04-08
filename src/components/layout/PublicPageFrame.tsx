import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type PublicPageFrameProps = {
  children: ReactNode;
  className?: string;
};

export default function PublicPageFrame({ children, className = "" }: PublicPageFrameProps) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <Navbar />
      <main className={`pt-24 ${className}`}>{children}</main>
      <Footer />
    </div>
  );
}