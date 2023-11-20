"use client";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useCategoryModal } from "@/hooks/use-category-modal";
import { Icons } from "@/components/ui/icons";
import { useNav } from "@/hooks/useNav";

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  note: z.string().optional(),
  category: z.string({
    required_error: "Please select a category",
  }),
  imageUrl: z.string().optional(),
});

type AddItemFormValues = z.infer<typeof formSchema>;

const AddItem = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const categoryModal = useCategoryModal();
  const { onSetActive } = useNav();
  const form = useForm<AddItemFormValues>({
    resolver: zodResolver(formSchema),
  });

  const asyncGetCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    asyncGetCategories();
  }, [categoryModal]);

  const onSubmit = async (data: AddItemFormValues) => {
    try {
      setLoading(true);
      await fetch("/api/items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>AddItem</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <Input {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"note"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note(optional)</FormLabel>
                <Textarea {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"imageUrl"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL(optional)</FormLabel>
                <Input {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? categories.find(
                              (category) => category.id === field.value,
                            )?.name
                          : "Select Category"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search category..." />
                      <CommandEmpty>No categories found.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            value={category.name}
                            key={category.id}
                            onSelect={() => {
                              form.setValue("category", category.id);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                category.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {category.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      <CommandSeparator />
                      <CommandList>
                        <CommandGroup>
                          <CommandItem
                            onSelect={() => {
                              setIsOpen(false);
                              categoryModal.onOpen();
                            }}
                          >
                            <PlusCircle className={"mr-2 h-5 w-5"} />
                            Create Category
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={"flex items-center justify-end space-x-2 pt-6"}>
            <Button
              type={"button"}
              variant={"outline"}
              onClick={() => onSetActive("list")}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type={"submit"} disabled={loading}>
              {loading ? (
                <div className={"flex items-center justify-center"}>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Creating category....
                </div>
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddItem;
