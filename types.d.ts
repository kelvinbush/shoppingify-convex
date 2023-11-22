type Item = {
  id: string;
  name: string;
  imageUrl: string;
  note: string;
  userId: string;
  categoryId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
};

type Category = {
  id: string;
  name: string;
  userId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type ShoppingList = {
  id: string;
  name: string;
  isActive: boolean;
  cancelled: boolean;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  listItems: ListItem[];
};

type ListItem = {
  id: string;
  quantity: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  itemId: string;
  shoppingListId: string;
};

type CartItem = {
  quantity: number;
  isActive: boolean;
  itemId: string;
  name: string;
};
