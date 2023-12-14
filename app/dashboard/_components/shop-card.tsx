import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { CalendarDays, ChevronRight } from "lucide-react";

interface ShopCardProps {
  listName: string;
  id: Id<"shoppingLists">;
  state: "cancelled" | "completed";
  date: string;
}

const ShopCard = ({ listName, id, state, date }: ShopCardProps) => {
  return (
    <Link
      href={`/dashboard/history/${id}`}
      className={
        "flex flex-wrap items-center justify-between gap-6 rounded-lg bg-white p-4 shadow"
      }
    >
      <h4 className={"text-base font-semibold capitalize"}>{listName}</h4>
      <div className={"flex flex-wrap items-center gap-4"}>
        <div className={"flex items-center gap-x-1.5"}>
          <CalendarDays color={"#C1C1C4"} size={16} />
          <span className={"text-xs font-semibold text-[#C1C1C4]"}>{date}</span>
        </div>
        <div
          className={`${
            state === "completed"
              ? "border-[#56CCF2] text-[#56CCF2]"
              : "border-[#EB5757] text-[#EB5757]"
          } rounded-lg border p-0.5 text-xs font-semibold`}
        >
          {state}
        </div>
        <ChevronRight color={"#F9A109"} />
      </div>
    </Link>
  );
};

export default ShopCard;
