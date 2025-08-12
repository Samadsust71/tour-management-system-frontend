
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// ✅ Zod Schema
const tourSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  images: z.array(z.url("Invalid image URL")).optional(),
  location: z.string().optional(),
  costFrom: z.number().min(0, "Cost must be positive").optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  included: z.array(z.string()).optional(),
  excluded: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  tourPlan: z.array(z.string()).optional(),
  maxGuest: z.number().min(1, "Max guest must be at least 1").optional(),
  departureLocation: z.string().optional(),
  arrivalLocation: z.string().optional(),
  minAge: z.number().optional(),
  division: z.string().min(1, "Division is required"),
  tourType: z.string().min(1, "Tour Type is required"),
});

type TourFormValues = z.infer<typeof tourSchema>;

export default function AddTourForm() {
  const form = useForm<TourFormValues>({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      title: "",
      description: "",
      images: [],
      location: "",
      costFrom: undefined,
      startDate: "",
      endDate: "",
      included: [],
      excluded: [],
      amenities: [],
      tourPlan: [],
      maxGuest: undefined,
      departureLocation: "",
      arrivalLocation: "",
      minAge: undefined,
      division: "",
      tourType: "",
    },
  });

  const onSubmit = (data: TourFormValues) => {
    console.log("Form Submitted:", data);
    // TODO: send to backend API
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add New Tour</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter tour title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tour details..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Division */}
          <FormField
            control={form.control}
            name="division"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Division</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select division" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="dhaka">Dhaka</SelectItem>
                    <SelectItem value="sylhet">Sylhet</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tour Type */}
          <FormField
            control={form.control}
            name="tourType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tour Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tour type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">Add Tour</Button>
        </form>
      </Form>
    </div>
  );
}
