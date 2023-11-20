"use client";
import React from "react";
import { useNav } from "@/hooks/useNav";

const ViewItem = () => {
  const { itemId, onSetActive } = useNav();

  if (!itemId) onSetActive("add-item");

  console.log({ itemId });
  return (
    <div>
      <h1>ViewItem</h1>
    </div>
  );
};

export default ViewItem;
