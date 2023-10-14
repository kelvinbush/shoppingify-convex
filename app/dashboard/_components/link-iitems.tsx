"use client";

import React from "react";
import Link from "next/link";
import { useNav } from "@/hooks/useNav";
import { usePathname } from "next/navigation";

const LinkItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  let isActive = pathname.includes(href);

  const { onSetIsMobile } = useNav();

  return (
    <Link
      href={href}
      className={"relative"}
      onClick={() => onSetIsMobile(false)}
    >
      {children}
      {isActive && (
        <span
          className={
            "absolute inset-y-0 left-[-16px] top-[-10px] h-[40px] w-[4px] transform rounded-r-md bg-amber-500 transition-transform hover:bg-amber-200"
          }
        />
      )}
    </Link>
  );
};

export default LinkItem;
