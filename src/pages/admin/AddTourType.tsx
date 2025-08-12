/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteModal";
import { AddTourTypeModal } from "@/components/modules/auth/admin/tour-type/AddTourTypeModal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetTourTypesQuery, useDeleteTourTypeMutation } from "@/redux/features/tour/tour.api";
import { toast } from "sonner";

export default function AddTourType() {
  const { data, refetch } = useGetTourTypesQuery(undefined);
  const [deleteTourType] = useDeleteTourTypeMutation();

  const handleDeleteTourType = async (tourTypeId: string) => {
    try {
      const response = await deleteTourType(tourTypeId).unwrap();
      toast.success(`${response?.data?.name} tour type deleted successfully`)
      refetch();
    } catch (error:any) {
      console.error("Failed to delete tour type", error);
      toast.error(error?.data?.message || "Failed to delete tour type")
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Types</h1>
        <AddTourTypeModal />
      </div>
      <div className="border border-muted rounded-md px-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item: { _id: string; name: string }) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-right">
                  <ConfirmDeleteDialog
                    onConfirm={() => handleDeleteTourType(item._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
