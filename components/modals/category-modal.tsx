"use client";

import { Modal } from "@/components/ui/modal";
import { useCategoryModal } from "@/hooks/use-category-modal";
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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Icons } from "../ui/icons";

const schema = z.object({
  name: z.string().min(3, "Name must contain at least 3 characters").max(255),
});

export const CategoryModal = () => {
  const categoryModal = useCategoryModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setLoading(true);
      await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Category created");
      categoryModal.onClose();
    } catch (error) {
      toast.error("Failed to create store");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={"Create Category"}
      onClose={categoryModal.onClose}
      description={"Add a new category"}
      isOpen={categoryModal.isOpen}
    >
      <div>
        <div className={"space-y-4 py-2 pb-4"}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name={"name"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={"Fruits and Vegetables"}
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className={"flex items-center justify-end space-x-2 pt-6"}>
                <Button
                  type={"button"}
                  variant={"outline"}
                  onClick={categoryModal.onClose}
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
      </div>
    </Modal>
  );
};
