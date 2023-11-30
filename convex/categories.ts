import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const createCategory = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    // check if category already exists

    const existingCategory = await ctx.db
      .query("categories")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();

    if (existingCategory) {
      if (existingCategory.isActive) throw new Error("Category already exists");
      else return await ctx.db.patch(existingCategory._id, { isActive: true });
    }

    return await ctx.db.insert("categories", {
      name: args.name,
      userId,
      isActive: true,
    });
  },
});

export const updateCategory = mutation({
  args: {
    id: v.id("categories"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const category = await ctx.db.get(args.id);

    if (!category) throw new Error("Category not found");

    if (category.name === args.name) return category;

    if (category.userId !== userId) throw new Error("Not authorized");

    return await ctx.db.patch(args.id, {
      name: args.name,
    });
  },
});

export const archiveCategory = mutation({
  args: {
    id: v.id("categories"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const category = await ctx.db.get(args.id);

    if (!category) throw new Error("Category not found");

    if (category.userId !== userId) throw new Error("Not authorized");

    if (category.isActive === false)
      throw new Error("Category already archived");

    const archiveActiveItems = async (categoryId: Id<"categories">) => {
      const allItems = await ctx.db
        .query("items")
        .withIndex("by_category", (q) => q.eq("categoryId", categoryId))
        .collect();

      if (allItems.length === 0) return await ctx.db.delete(args.id);

      const activeItems = allItems.filter((item) => item.isActive);

      if (activeItems.length === 0)
        return await ctx.db.patch(args.id, { isActive: false });

      for (const item of activeItems) {
        await ctx.db.patch(item._id, { isActive: false });
      }

      return await ctx.db.patch(args.id, { isActive: false });
    };

    return await archiveActiveItems(args.id);
  },
});

export const getCategories = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    return await ctx.db
      .query("categories")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("desc")
      .collect();
  },
});
