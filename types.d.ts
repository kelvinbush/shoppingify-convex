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
