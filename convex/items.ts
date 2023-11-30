import { mutation } from "./_generated/server";
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

    return await ctx.db.insert("items", {
      ...args,
      userId,
      isActive: true,
    });
  },
});
