import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteModal";

export interface Division {
  _id: string;
  name: string;
  thumbnail?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  slug?: string;
}

interface DivisionCardListProps {
  data: Division[];
  onDelete: (id: string) => void;
  onUpdate: (division: Division) => void;
  isLoading?: boolean;
}

export function DivisionCardList({
  data,
  onDelete,
  onUpdate,
}: DivisionCardListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((division) => (
        <Card key={division._id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{division.name}</CardTitle>
            {division.description && (
              <CardDescription>{division.description}</CardDescription>
            )}
          </CardHeader>

          <CardContent>
            {division.thumbnail ? (
              <img
                src={division.thumbnail}
                alt={division.name}
                className="w-full h-40 object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                No image
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-end gap-2 mt-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdate(division)}
            >
              Update
            </Button>
            <ConfirmDeleteDialog
              onConfirm={() => onDelete(division._id)}
              deleteType="division"
              isIcon={false}
            />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
