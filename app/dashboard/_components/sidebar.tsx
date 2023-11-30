"use client";

import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart4, List, RotateCcw, ShoppingCart } from "lucide-react";
import LinkItem from "@/app/dashboard/_components/link-iitems";
import { useNav } from "@/hooks/useNav";

const sidebarLinks = [
  {
    href: "items",
    icon: <List size={"20"} />,
  },
  {
    href: "history",
    icon: <RotateCcw size={20} />,
  },
  {
    href: "analytics",
    icon: <BarChart4 size={20} />,
  },
];

const Sidebar = () => {
  const { isMobile, onSetIsMobile } = useNav();
  let totalItems = 0;
  return (
    <nav
      className={
        "flex h-full min-h-screen flex-col items-center justify-between bg-white px-1.5 py-4"
      }
    >
      <Link href="/">
        <Avatar>
          <AvatarImage src="/images/logo.svg" alt="home" />
          <AvatarFallback>H</AvatarFallback>
        </Avatar>
      </Link>
      <div className={"flex flex-col space-y-12"}>
        {sidebarLinks.map(({ href, icon }) => (
          <LinkItem key={href} href={href}>
            {icon}
          </LinkItem>
        ))}
      </div>
      <div
        className={
          "relative grid cursor-pointer place-items-center rounded-full bg-amber-500 p-2.5 transition-colors hover:bg-amber-800"
        }
        onClick={() => onSetIsMobile(!isMobile)}
      >
        <ShoppingCart color={"#FFFFFF"} />
        {totalItems > 0 && (
          <span
            className={
              "absolute -right-0.5 -top-0.5 rounded-full bg-red-500 px-1 text-xs text-white"
            }
          >
            {totalItems}
          </span>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
