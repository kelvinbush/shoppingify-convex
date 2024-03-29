import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const purchase = mutation({
  args: {
    id: v.id("listItems"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const listItem = await ctx.db.get(args.id);

    if (!listItem) throw new Error("List item not found");

    return await ctx.db.patch(args.id, {
      isCompleted: !listItem.isCompleted,
    });
  },
});
export const create = mutation({
  args: {
    itemId: v.id("items"),
    shoppingListId: v.id("shoppingLists"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const shoppingList = await ctx.db.get(args.shoppingListId);

    if (!shoppingList) throw new Error("Shopping list not found");

    if (shoppingList.userId !== userId) throw new Error("Not authorized");

    if (shoppingList.cancelled)
      throw new Error("Shopping list already cancelled");

    if (shoppingList.completed)
      throw new Error("Shopping list already completed");

    if (!shoppingList.isActive)
      throw new Error("Shopping list already inactive");

    const item = await ctx.db.get(args.itemId);

    if (!item) throw new Error("Item not found");

    if (item.userId !== userId) throw new Error("Not authorized");

    if (!item.isActive) throw new Error("Item already inactive");

    const existingListItem = await ctx.db
      .query("listItems")
      .withIndex("by_shopping_list", (q) =>
        q.eq("shoppingListId", args.shoppingListId),
      )
      .filter((q) => q.eq(q.field("itemId"), args.itemId))
      .first();

    if (existingListItem) {
      return await ctx.db.patch(existingListItem._id, {
        quantity: existingListItem.quantity + 1,
      });
    }

    return await ctx.db.insert("listItems", {
      itemId: args.itemId,
      shoppingListId: args.shoppingListId,
      quantity: args.quantity,
      isCompleted: false,
    });
  },
});
export const remove = mutation({
  args: {
    id: v.id("listItems"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const listItem = await ctx.db.get(args.id);

    if (!listItem) throw new Error("List item not found");

    const shoppingList = await ctx.db.get(listItem.shoppingListId);

    if (!shoppingList) throw new Error("Shopping list not found");

    if (shoppingList.userId !== identity.subject)
      throw new Error("Not Authorized");

    if (shoppingList.cancelled)
      throw new Error("Shopping list already cancelled");

    if (shoppingList.completed)
      throw new Error("Shopping list already completed");

    if (!shoppingList.isActive)
      throw new Error("Shopping list already inactive");

    return await ctx.db.delete(args.id);
  },
});
export const increment = mutation({
  args: {
    id: v.id("listItems"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not Authenticated!");

    const userId = identity.subject;

    const listItem = await ctx.db.get(args.id);

    if (!listItem) throw new Error("List item not found!");

    const shoppingList = await ctx.db.get(listItem.shoppingListId);

    if (!shoppingList) throw new Error("Shopping list not found!");

    if (shoppingList.userId !== userId) throw new Error("Not authorized");

    if (shoppingList.cancelled)
      throw new Error("Shopping list already cancelled");

    if (shoppingList.completed)
      throw new Error("Shopping list already completed");

    if (!shoppingList.isActive)
      throw new Error("Shopping list already inactive");

    return await ctx.db.patch(args.id, {
      quantity: listItem.quantity + 1,
    });
  },
});
export const decrement = mutation({
  args: {
    id: v.id("listItems"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not Authenticated!");

    const userId = identity.subject;

    const listItem = await ctx.db.get(args.id);

    if (!listItem) throw new Error("List item not found!");

    const shoppingList = await ctx.db.get(listItem.shoppingListId);

    if (!shoppingList) throw new Error("Shopping list not found!");

    if (shoppingList.userId !== userId) throw new Error("Not authorized");

    if (shoppingList.cancelled)
      throw new Error("Shopping list already cancelled");

    if (shoppingList.completed)
      throw new Error("Shopping list already completed");

    if (!shoppingList.isActive)
      throw new Error("Shopping list already inactive");

    return await ctx.db.patch(args.id, {
      quantity: listItem.quantity - 1,
    });
  },
});
export const update = mutation({
  args: {
    id: v.id("listItems"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    if (args.quantity < 1) return;

    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not Authenticated!");

    const userId = identity.subject;

    const listItem = await ctx.db.get(args.id);

    if (!listItem) throw new Error("List item not found!");

    const shoppingList = await ctx.db.get(listItem.shoppingListId);

    if (!shoppingList) throw new Error("Shopping list not found!");

    if (shoppingList.userId !== userId) throw new Error("Not authorized");

    if (shoppingList.cancelled)
      throw new Error("Shopping list already cancelled");

    if (shoppingList.completed)
      throw new Error("Shopping list already completed");

    if (!shoppingList.isActive)
      throw new Error("Shopping list already inactive");

    return await ctx.db.patch(args.id, {
      quantity: args.quantity,
    });
  },
});
export const addItem = mutation({
  args: {
    id: v.id("items"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not Authenticated!");

    const userId = identity.subject;

    const item = await ctx.db.get(args.id);

    if (!item) throw new Error("Item not found!");

    if (item.userId !== userId) throw new Error("Not authorized");

    if (!item.isActive) throw new Error("Item already inactive");

    const shoppingList = await ctx.db
      .query("shoppingLists")
      .withIndex("by_user_and_active", (q) =>
        q.eq("userId", userId).eq("isActive", true),
      )
      .first();

    if (!shoppingList) throw new Error("No active shopping list found!");

    const existingListItem = await ctx.db
      .query("listItems")
      .withIndex("by_shopping_list", (q) =>
        q.eq("shoppingListId", shoppingList._id),
      )
      .filter((q) => q.eq(q.field("itemId"), args.id))
      .first();

    if (existingListItem) {
      return await ctx.db.patch(existingListItem._id, {
        quantity: existingListItem.quantity + 1,
      });
    }

    return await ctx.db.insert("listItems", {
      itemId: args.id,
      shoppingListId: shoppingList._id,
      quantity: 1,
      isCompleted: false,
    });
  },
});

export const getItems = query({
  args: {
    shoppingListId: v.id("shoppingLists"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not Authenticated!");

    const userId = identity.subject;

    const shoppingList = await ctx.db.get(args.shoppingListId);

    if (!shoppingList) throw new Error("Shopping list not found!");

    if (shoppingList.userId !== userId) throw new Error("Not authorized");

    const listItems = await ctx.db
      .query("listItems")
      .withIndex("by_shopping_list", (q) =>
        q.eq("shoppingListId", shoppingList._id),
      )
      .collect();

    const listItemsWithItems = await Promise.all(
      listItems.map(async (listItem) => {
        const item = await ctx.db.get(listItem.itemId);
        if (!item) return null;
        const category = await ctx.db.get(item.categoryId);
        if (!category) return null;
        return {
          ...listItem,
          item: {
            ...item,
            categoryName: category.name,
          },
        };
      }),
    );

    const notEmpty = <TValue>(
      value: TValue | null | undefined,
    ): value is TValue => value !== null && value !== undefined;

    return {
      ...shoppingList,
      listItems: listItemsWithItems.filter(notEmpty),
    };
  },
});
