import React from "react";
import { Minus, Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListChipProps {
  id: string;
  name: string;
  quantity: number;
  isEditing: boolean;
  onSetIsEditing: (isEditing: string) => void;
}

const ListChip = ({
  id,
  name,
  quantity,
  isEditing,
  onSetIsEditing,
}: ListChipProps) => {
  return (
    <div className={"flex items-center justify-between space-x-2"}>
      <p className={"text-sm font-semibold"}>{name}</p>
      {isEditing ? (
        <div className={"flex items-center space-x-1 rounded-xl bg-white p-2"}>
          <div className={"bg-primary-orange h-full rounded-xl p-2"}>
            <Trash color={"#FFFFFF"} size={16} className={"cursor-pointer"} />
          </div>
          <Minus size={20} color={"#F9A10A"} className={"cursor-pointer"} />
          <Chip
            quantity={quantity}
            id={id}
            onSetIsEditing={onSetIsEditing}
            isEditing={isEditing}
          />
          <Plus size={20} color={"#F9A10A"} className={"mr-1 cursor-pointer"} />
        </div>
      ) : (
        Chip({ quantity, id, onSetIsEditing })
      )}
    </div>
  );
};

export default ListChip;

const Chip = ({
  quantity,
  id,
  onSetIsEditing,
  isEditing,
}: {
  quantity: number;
  id: string;
  onSetIsEditing: (isEditing: string) => void;
  isEditing?: boolean;
}) => (
  <div
    className={cn(
      "border-primary-orange text-primary-orange rounded-3xl border-2 px-4 py-1 text-xs font-semibold",
      !isEditing && "cursor-pointer",
    )}
    role={"button"}
    onClick={() => onSetIsEditing(id)}
    onBlur={() => onSetIsEditing("0")}
  >
    {isEditing ? (
      <input
        type={"number"}
        value={quantity}
        onChange={() => {
          console.log("change");
        }}
        className={"w-10 text-center focus:outline-none active:outline-none"}
      />
    ) : (
      quantity + " pcs"
    )}
  </div>
);
