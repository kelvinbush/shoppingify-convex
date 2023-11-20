"use client";
import React from "react";
import Sidebar from "@/app/dashboard/_components/sidebar";
import SideLayout from "@/app/dashboard/_side-content/sideLayout";
import { useNav } from "@/hooks/useNav";
import AddItem from "@/app/dashboard/_side-content/add-item/add-item";
import ViewItem from "@/app/dashboard/_side-content/view-item/view-item";
import ListShopping from "@/app/dashboard/_side-content/list/list-shopping";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isMobile, active } = useNav();
  let content: null | React.ReactNode;
  switch (active) {
    case "add-item":
      content = <AddItem />;
      break;
    case "view-item":
      content = <ViewItem />;
      break;
    case "list":
      content = <ListShopping />;
      break;
    default:
      content = <AddItem />;
      break;
  }

  return (
    <div
      className={
        "grid grid-cols-[max-content,1fr] bg-slate-100 md:grid-cols-[max-content,1fr,400px]"
      }
    >
      <Sidebar />
      {isMobile ? (
        <SideLayout>{content}</SideLayout>
      ) : (
        <>
          <div className={"h-screen"}>{children}</div>
          <SideLayout>{content}</SideLayout>
        </>
      )}
    </div>
  );
};

export default Layout;
