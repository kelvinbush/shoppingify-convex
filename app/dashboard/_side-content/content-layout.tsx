"use client";
import React from "react";
import { useNav } from "@/hooks/useNav";
import AddItem from "@/app/dashboard/_side-content/add-item/add-item";
import ViewItem from "@/app/dashboard/_side-content/view-item/view-item";

function ContentLayout() {
  const { active } = useNav();
  return (
    <div className={"h-screen bg-orange-100"}>
      {active === "add-item" && <AddItem />}
      {active === "view-item" && <ViewItem />}
      {active === "list" && <h1>List</h1>}
    </div>
  );
}

export default ContentLayout;
