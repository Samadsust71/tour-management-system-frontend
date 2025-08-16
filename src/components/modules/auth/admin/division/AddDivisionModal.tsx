import SingleImageUploader from "@/components/SingleImageUploader";
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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddDivisionMutation } from "@/redux/features/division/division.api";
import { toast } from "sonner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const divisionSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name is too short" })
    .max(50, { message: "Name is too long" }),
    description:z.string().optional()
});


export function AddDivisionModal() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [addDivision,{isLoading}] = useAddDivisionMutation();

  const form = useForm({
    resolver:zodResolver(divisionSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data:z.infer<typeof divisionSchema>) => {
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);

    try {
      const res = await addDivision(formData).unwrap();
      if (res.success) {
        toast.success("Division Added");
        setOpen(false);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err:any) {
      console.error(err);
      toast.error(err?.data?.message || "Something went wrong")
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Division</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Division</DialogTitle>
        </DialogHeader>
       <DialogDescription className="sr-only"> Add Division</DialogDescription>
        <Form {...form}>
          <form
            className="space-y-5"
            id="add-division"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division Name</FormLabel>
                  <FormControl>
                    <Input placeholder="example:Dhaka" {...field} />
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
                  <FormLabel>Division Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          <SingleImageUploader onChange={setImage} />
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={!image || isLoading} type="submit" form="add-division">
            Add Division
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
