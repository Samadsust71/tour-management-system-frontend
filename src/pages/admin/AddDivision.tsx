/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddDivisionModal } from "@/components/modules/auth/admin/division/AddDivisionModal";
import { DivisionCardList, type Division } from "@/components/modules/auth/admin/division/DivisionCardList";
import { UpdateDivisionModal } from "@/components/modules/auth/admin/division/UpdateDivisionModal";
import {  useDeleteDivisionMutation, useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useState } from "react";
import { toast } from "sonner";

export default function AddDivision() {
  const { data,refetch } = useGetDivisionsQuery(undefined);
  const [deleteDivision,{isLoading:deleteDivisionLoading}] = useDeleteDivisionMutation()
  const [selectedDivision, setSelectedDivision] = useState<Partial<Division>|null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleDelete = async(divisionId:string) => {
     try {
      await deleteDivision(divisionId).unwrap();
      toast.success(`Division deleted successfully`)
      refetch();
    } catch (error:any) {
      console.error("Failed to delete division", error);
      toast.error(error?.data?.message || "Failed to delete division")
    }
  };
  const handleUpdate = async(division:Partial<Division>) => {
    setSelectedDivision(division);
    setIsUpdateModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-semibold"> Add Division </h1>
        <AddDivisionModal />
      </div>

      {data && (
        <DivisionCardList
          data={data}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          isLoading={deleteDivisionLoading}
        />
      )}

      {selectedDivision && (
        <UpdateDivisionModal
          open={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          division={selectedDivision}
          refetch={refetch}
        />
      )}
    </div>
  );
}
