import React from "react";
import Link from "next/link";

const LinkItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  let isActive = false;

  return (
    <Link href={href} className={"relative"}>
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
