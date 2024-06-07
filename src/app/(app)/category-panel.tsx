"use client";

import { useRouter } from "next/navigation";
import {
  LuDownload,
  LuFileEdit,
  LuMoreHorizontal,
  LuTrash,
} from "react-icons/lu";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Separator } from "~/components/ui/separator";

const MOCK_CATEGORIES = [
  { id: "0", name: "Frontend" },
  { id: "1", name: "Backend" },
  { id: "2", name: "Full-stack" },
];

export const CategoryPanel = () => {
  return (
    <div className="sticky top-0 hidden h-screen max-w-xs flex-row items-start p-4 md:flex">
      <Card className="flex w-full flex-col gap-y-5 p-4">
        <div className="space-y-2">
          <h2 className="font-mono text-lg font-medium">Categories</h2>
          <p className="text-sm text-neutral-800">
            These are your refined resume categories. Assign sections from your
            CV to these categories create tailored resumes.
          </p>
        </div>

        <Separator />

        <div className="space-y-3">
          {MOCK_CATEGORIES.map(({ id, name }) => (
            <Category key={name} id={id} name={name} />
          ))}
        </div>

        <Button className="self-start">Add Resume Category</Button>
      </Card>
    </div>
  );
};

interface CategoryProps {
  id: string;
  name: string;
}

const Category: React.FC<CategoryProps> = ({ id, name }) => {
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/resume/${id}`);
  };

  const handleDownload = () => {
    // TODO: Implement
  };

  const handleDelete = () => {
    // TODO: Implement
  };

  return (
    <div className="flex flex-row gap-x-2">
      <Button
        variant="neutral"
        className="flex-1 justify-start gap-x-2 bg-neutral-50 px-3"
        onClick={handleEdit}
      >
        <LuFileEdit className="h-4 w-4" />
        {name}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="neutral" size="icon" className="bg-neutral-50">
            <LuMoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          {/* <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator /> */}
          <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
            <LuFileEdit className="h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDownload} className="cursor-pointer">
            <LuDownload className="h-4 w-4" />
            Download
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            className="cursor-pointer text-destructive-500 focus:bg-destructive-50 focus:text-destructive-700"
          >
            <LuTrash className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
