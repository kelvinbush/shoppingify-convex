import React from "react";
import { Minus, Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListChipProps {
  id: string;
  name: string;
  quantity: number;
  isActive: boolean;
  isCompleting: boolean;
  incrementItem: (cartItemId: string) => void;
  decrementItem: (cartItemId: string) => void;
  removeItem: (cartItemId: string) => void;
  onSetIsActive: (cartItemId: string) => void;
  updateItem: (cartItemId: string, quantity: number) => void;
}

const ListChip = ({
  id,
  name,
  quantity,
  isActive,
  onSetIsActive,
  incrementItem,
  decrementItem,
  removeItem,
  updateItem,
}: ListChipProps) => {
  return (
    <div className={"flex items-center justify-between space-x-2"}>
      <p className={"text-sm font-semibold"}>{name}</p>
      {isActive ? (
        <div className={"flex items-center space-x-1 rounded-xl bg-white p-2"}>
          <div className={"h-full rounded-xl bg-primary-orange p-2"}>
            <Trash
              color={"#FFFFFF"}
              size={16}
              className={"cursor-pointer"}
              onClick={(e) => {
                removeItem(id);
                e.stopPropagation();
              }}
            />
          </div>
          <Minus
            size={20}
            color={"#F9A10A"}
            className={"cursor-pointer"}
            onClick={(e) => {
              decrementItem(id);
              e.stopPropagation();
            }}
          />
          <Chip
            quantity={quantity}
            id={id}
            onSetIsActive={onSetIsActive}
            isActive={isActive}
            updateItem={updateItem}
          />
          <Plus
            size={20}
            color={"#F9A10A"}
            className={"mr-1 cursor-pointer"}
            onClick={(e) => {
              incrementItem(id);
              e.stopPropagation();
            }}
          />
        </div>
      ) : (
        Chip({ quantity, id, onSetIsActive })
      )}
    </div>
  );
};

export default ListChip;

const Chip = ({
  quantity,
  id,
  onSetIsActive,
  isActive,
  updateItem,
}: {
  quantity: number;
  id: string;
  onSetIsActive: (isActive: string) => void;
  isActive?: boolean;
  updateItem?: (cartItemId: string, quantity: number) => void;
}) => (
  <div
    className={cn(
      "rounded-3xl border-2 border-primary-orange px-4 py-1 text-xs font-semibold text-primary-orange",
      !isActive && "cursor-pointer",
    )}
    role={"button"}
    onClick={() => onSetIsActive(id)}
    onBlur={() => onSetIsActive("0")}
  >
    {isActive ? (
      <input
        type={"number"}
        value={quantity}
        onChange={
          updateItem
            ? (e) => updateItem(id, parseInt(e.target.value))
            : undefined
        }
        className={"w-10 text-center focus:outline-none active:outline-none"}
      />
    ) : (
      quantity + " pcs"
    )}
  </div>
);
