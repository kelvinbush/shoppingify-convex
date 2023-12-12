import React from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

interface SecondaryBtnProps {
  title: string;
  onClick: () => void;
  loading: boolean;
  className?: string;
  disabled?: boolean;
}

function SecondaryBtn({
  title,
  onClick,
  loading,
  className,
  disabled,
}: SecondaryBtnProps) {
  return (
    <Button
      className={`rounded-lg border-2 border-transparent bg-white px-4 py-5 text-black transition-all duration-75 ease-linear hover:border-blue-400 hover:bg-transparent ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className={"flex items-center justify-center"}>
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          {title}...
        </div>
      ) : (
        title
      )}
    </Button>
  );
}

export default SecondaryBtn;
