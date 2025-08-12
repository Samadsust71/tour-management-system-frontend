/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddTourTypeMutation } from "@/redux/features/tour/tour.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useState } from "react";

const tourTypeSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name is too short" })
    .max(50, { message: "Name is too long" }),
});

export function AddTourTypeModal() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof tourTypeSchema>>({
    resolver: zodResolver(tourTypeSchema),
    defaultValues: {
      name: "",
    },
  });

  const [addTourType] = useAddTourTypeMutation();

  const onSubmit = async (data: z.infer<typeof tourTypeSchema>) => {
    try {
      const res = await addTourType({ name: data.name }).unwrap();
      if (res.success) {
        toast.success("Tour Type Added");
        form.reset();
        setOpen(false); 
      }
    } catch (error:any) {
      console.error("Error on tour type:", error);
      toast.error(error?.data?.message || "Failed to add tour type");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Tour Type</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Tour Type</DialogTitle>
        </DialogHeader>

        <DialogDescription className="sr-only">
          Add a new tour type
        </DialogDescription>

        <Form {...form}>
          <form id="add-tour-type" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tour Type Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tour Type Name"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          {/* ✅ Not wrapped in DialogClose, will only close in onSubmit */}
          <Button type="submit" form="add-tour-type">
            Add Tour Type
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
