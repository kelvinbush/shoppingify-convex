import React from "react";
import { Metadata } from "next";
import Sidebar from "@/app/dashboard/_components/sidebar";

export const metadata: Metadata = {
  title: "Shoppingify Dashboard",
  description: "Your list of items",
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div
    className={"grid bg-slate-100"}
    style={{
      gridTemplateColumns: "max-content 1fr",
    }}
  >
    <Sidebar />
    {children}
  </div>
);

export default Layout;
