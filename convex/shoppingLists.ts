import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const active = mutation({
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

    if (!shoppingList) {
      const newListId = await ctx.db.insert("shoppingLists", {
        name: "My Shopping List",
        userId,
        isActive: true,
        cancelled: false,
        completed: false,
      });

      const newList = await ctx.db.get(newListId);

      return {
        ...newList,
        items: [],
      };
    }

    const shoppingListItems = await ctx.db
      .query("listItems")
      .withIndex("by_shopping_list", (q) =>
        q.eq("shoppingListId", shoppingList._id),
      )
      .collect();

    return {
      ...shoppingList,
      items: shoppingListItems,
    };
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
