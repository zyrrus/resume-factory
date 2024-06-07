"use client";

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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Separator } from "~/components/ui/separator";

const MOCK_CATEGORIES = [
  { name: "Frontend" },
  { name: "Backend" },
  { name: "Full-stack" },
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
          {MOCK_CATEGORIES.map(({ name }) => (
            <Category key={name} name={name} />
          ))}
        </div>

        <Button className="self-start">Add Resume Category</Button>
      </Card>
    </div>
  );
};

interface CategoryProps {
  name: string;
}

const Category: React.FC<CategoryProps> = ({ name }) => {
  const handleEdit = () => {
    // TODO: Implement
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
