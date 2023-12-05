import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const active = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const shoppingList = await ctx.db
      .query("shoppingLists")
      .withIndex("by_user_and_active", (q) =>
        q.eq("userId", userId).eq("isActive", true),
      )
      .first();

    if (shoppingList) {
      const listItems = await ctx.db
        .query("listItems")
        .withIndex("by_shopping_list", (q) =>
          q.eq("shoppingListId", shoppingList._id),
        )
        .collect();

      const items = await Promise.all(
        listItems.map((listItem) => {
          const item = ctx.db.get(listItem.itemId);
          if (!item) return null;
          return item;
        }),
      );

      const notEmpty = <TValue>(
        value: TValue | null | undefined,
      ): value is TValue => value !== null && value !== undefined;

      const filteredItems = items.filter(notEmpty);

      const mappedListItems = listItems.map((listItem) => {
        const item = filteredItems.find((item) => item._id === listItem.itemId);
        if (item) {
          return {
            ...listItem,
            item,
          };
        } else return null;
      });

      const filteredListItems = mappedListItems.filter(notEmpty);

      return {
        ...shoppingList,
        listItems: filteredListItems,
      };
    }

    return null;
  },
});
export const cancel = mutation({
  args: {
    id: v.id("shoppingLists"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const shoppingList = await ctx.db.get(args.id);

    if (!shoppingList) throw new Error("Shopping list not found");

    if (shoppingList.userId !== userId) throw new Error("Not authorized");

    if (shoppingList.cancelled)
      throw new Error("Shopping list already cancelled");

    if (shoppingList.completed)
      throw new Error("Shopping list already completed");

    if (!shoppingList.isActive)
      throw new Error("Shopping list already inactive");

    return await ctx.db.patch(args.id, {
      cancelled: true,
      isCompleting: false,
      isActive: false,
    });
  },
});
export const complete = mutation({
  args: {
    id: v.id("shoppingLists"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const shoppingList = await ctx.db.get(args.id);

    if (!shoppingList) throw new Error("Shopping list not found");

    if (shoppingList.userId !== userId) throw new Error("Not authorized");

    if (shoppingList.cancelled)
      throw new Error("Shopping list already cancelled");

    if (shoppingList.completed)
      throw new Error("Shopping list already completed");

    if (!shoppingList.isActive)
      throw new Error("Shopping list already inactive");

    return await ctx.db.patch(args.id, {
      completed: true,
      isCompleting: false,
      isActive: false,
    });
  },
});
export const update = mutation({
  args: {
    id: v.id("shoppingLists"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const shoppingList = await ctx.db.get(args.id);

    if (!shoppingList) throw new Error("Shopping list not found");

    if (shoppingList.userId !== userId) throw new Error("Not authorized");

    if (!shoppingList.isActive)
      throw new Error("Shopping list already inactive");

    if (shoppingList.name === args.name) return shoppingList;

    return await ctx.db.patch(args.id, {
      name: args.name,
    });
  },
});
export const save = mutation({
  args: {
    id: v.id("shoppingLists"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const shoppingList = await ctx.db.get(args.id);

    if (!shoppingList) throw new Error("Shopping list not found");

    if (shoppingList.userId !== userId) throw new Error("Not authorized");

    if (shoppingList.cancelled)
      throw new Error("Shopping list already cancelled");

    if (shoppingList.completed)
      throw new Error("Shopping list already completed");

    if (!shoppingList.isActive)
      throw new Error("Shopping list already inactive");

    return await ctx.db.patch(args.id, {
      isCompleting: true,
    });
  },
});
export const create = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) return new Error("Not authenticated!");

    const userId = identity.subject;

    return await ctx.db.insert("shoppingLists", {
      name: "Shopping List",
      userId,
      isActive: true,
      cancelled: false,
      completed: false,
      isCompleting: false,
    });
  },
});
