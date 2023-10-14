"use client";
import React, { useEffect, useRef } from "react";
import Sidebar from "@/app/dashboard/_components/sidebar";
import { useMediaQuery } from "react-responsive";
import { useNav } from "@/hooks/useNav";
import ContentLayout from "@/app/dashboard/_side-content/content-layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 800 });
  const { isMobile } = useNav();
  const contentRef: React.MutableRefObject<React.JSX.Element> = useRef(<></>);

  useEffect(() => {
    contentRef.current = <ContentLayout />;
  }, [isTabletOrMobile, isMobile]);

  return (
    <div
      className={
        "grid grid-cols-[max-content,1fr] bg-slate-100 md:grid-cols-[max-content,1fr,380px]"
      }
    >
      <Sidebar />
      {isTabletOrMobile ? (
        isMobile ? (
          contentRef.current
        ) : (
          children
        )
      ) : (
        <>
          {children}
          {contentRef.current}
        </>
      )}
    </div>
  );
};

export default Layout;
