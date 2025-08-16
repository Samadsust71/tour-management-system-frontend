/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useUpdateDivisionMutation } from "@/redux/features/division/division.api";
import { toast } from "sonner";
import type { Division } from "./DivisionCardList";
import SingleImageUploader from "@/components/SingleImageUploader";
import { Textarea } from "@/components/ui/textarea";

const divisionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
});

type DivisionFormValues = z.infer<typeof divisionSchema>;

interface UpdateDivisionModalProps {
  open: boolean;
  onClose: () => void;
  division: Partial<Division>; // division object from backend
  refetch: () => void;
}

export function UpdateDivisionModal({ open, onClose, division, refetch }: UpdateDivisionModalProps) {
  const [updateDivision, { isLoading }] = useUpdateDivisionMutation();
  const [image, setImage] = useState<File | null>(null);

  const form = useForm<DivisionFormValues>({
    resolver: zodResolver(divisionSchema),
    defaultValues: {
      name: division?.name || "",
      description: division?.description || "",
      thumbnail: division?.thumbnail || "",
    },
  });

  // when division changes, reset form
  useEffect(() => {
    if (division) {
      form.reset({
        name: division.name || "",
        description: division.description || "",
        thumbnail: division.thumbnail || "",
      });
    }
  }, [division, form]);

  const onSubmit = async (data:z.infer<typeof divisionSchema>) => {

     const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);
    try {
      await updateDivision({
        divisionId: division._id,
        updatedData: formData,
      }).unwrap();

      toast.success("Division updated successfully!");
      refetch();
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update division");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Division</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Division name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Division description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

           <SingleImageUploader onChange={setImage} />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
