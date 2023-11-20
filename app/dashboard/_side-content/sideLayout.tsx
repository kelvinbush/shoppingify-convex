import React from "react";

function SideLayout({ children }: { children: React.ReactNode }) {
  return <div className={"h-screen"}>{children}</div>;
}

export default SideLayout;
