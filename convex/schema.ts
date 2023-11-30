import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  categories: defineTable({
    name: v.string(),
    userId: v.string(),
    isActive: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_active", ["userId", "isActive"]),
  items: defineTable({
    name: v.string(),
    imageUrl: v.optional(v.string()),
    note: v.optional(v.string()),
    userId: v.string(),
    categoryId: v.optional(v.id("categories")),
    isActive: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_active", ["userId", "isActive"])
    .index("by_category", ["categoryId"]),
  listItems: defineTable({
    itemId: v.id("items"),
    shoppingListId: v.id("shoppingLists"),
    quantity: v.number(),
    isCompleted: v.boolean(),
  }).index("by_shopping_list", ["shoppingListId"]),
  shoppingLists: defineTable({
    name: v.string(),
    userId: v.string(),
    isActive: v.boolean(),
    cancelled: v.boolean(),
    completed: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_active", ["userId", "isActive"]),
});
