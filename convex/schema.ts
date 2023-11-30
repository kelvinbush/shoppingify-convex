import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
  categories: defineTable({
    name: v.string(),
    userId: v.id("users"),
    isActive: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_active", ["userId", "isActive"]),
  items: defineTable({
    name: v.string(),
    imageUrl: v.optional(v.string()),
    note: v.optional(v.string()),
    userId: v.id("users"),
    categoryId: v.optional(v.id("categories")),
    isActive: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_active", ["userId", "isActive"]),
  listItems: defineTable({
    userId: v.id("users"),
    itemId: v.id("items"),
    shoppingListId: v.id("shoppingLists"),
    quantity: v.number(),
    isCompleted: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_shopping_list", ["userId", "shoppingListId"]),
  shoppingLists: defineTable({
    name: v.string(),
    userId: v.id("users"),
    isActive: v.boolean(),
    cancelled: v.boolean(),
    completed: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_active", ["userId", "isActive"]),
});
