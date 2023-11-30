import React from "react";

async function Page() {
  return (
    <div className={"p-2"}>
      <h4 className={"text-lg font-medium text-black"}>Fruit and vegetables</h4>
      <div
        className={
          "mt-4 grid auto-rows-auto grid-cols-2 items-start gap-4 md:grid-cols-3 lg:grid-cols-4"
        }
      >
        {/*{items.map((item) => (
          <ItemChip id={item.id} name={item.name} key={item.id} />
        ))}*/}
      </div>
    </div>
  );
}

export default Page;
