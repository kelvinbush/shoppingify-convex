import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const itemObject = {
  name: v.string(),
  imageUrl: v.optional(v.string()),
  note: v.optional(v.string()),
  categoryId: v.id("categories"),
};

export const create = mutation({
  args: {
    ...itemObject,
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const existingCategory = await ctx.db.get(args.categoryId);

    if (!existingCategory) throw new Error("Category not found");

    if (existingCategory.userId !== userId) throw new Error("Not authorized");

    const existingItem = await ctx.db
      .query("items")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) =>
        q.and(
          q.eq(q.field("name"), args.name),
          q.eq(q.field("categoryId"), args.categoryId),
        ),
      )
      .first();

    if (existingItem) {
      if (existingItem.isActive) throw new Error("Item already exists");
      else return await ctx.db.patch(existingItem._id, { isActive: true });
    }

    return await ctx.db.insert("items", {
      ...args,
      userId,
      isActive: true,
    });
  },
});

export const list = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const items = await ctx.db
      .query("items")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("desc")
      .collect();

    return Promise.all(
      items.map(async (item) => {
        const category = await ctx.db.get(item.categoryId);
        if (!category) throw new Error("Category not found");
        return {
          ...item,
          category,
        };
      }),
    );
  },
});
