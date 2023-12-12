import React from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

interface PrimaryButtonProps {
  title: string;
  onClick: () => void;
  loading: boolean;
  className?: string;
  disabled?: boolean;
}

const PrimaryButton = ({
  title,
  onClick,
  loading,
  className,
  disabled,
}: PrimaryButtonProps) => {
  return (
    <Button
      className={`rounded-lg bg-primary-orange px-4 py-5 text-white transition-all duration-75 ease-linear hover:bg-amber-900 ${className}`}
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
};

export default PrimaryButton;

/*
Button({
  children: loading ? (
    <div className={"flex items-center justify-center"}>
      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      {title}...
    </div>
  ) : (
    title
  ),
  onClick,
  disabled: loading,
  className: `bg-primary-orange text-white ${className}`,
});*/
