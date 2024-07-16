"use client";

import {
  LuFileEdit,
  LuMoreHorizontal,
  LuTrash,
  LuInfo,
  LuPlusCircle,
  LuDownload,
} from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { cn } from "~/lib/utils";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useResumeCategories } from "~/hooks/useResumeCategories";
import { api } from "~/trpc/react";
import { Input } from "~/components/ui/input";
import { SubHeading } from "~/app/(app)/_side-panel/shared";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export const Resumes = () => {
  const { data, isLoading: isQueryLoading } = api.resumes.getAll.useQuery();

  return (
    <div className="flex flex-col gap-y-2">
      <SubHeading>
        Resumes
        <ResumeTooltip />
      </SubHeading>

      {isQueryLoading ? (
        <>
          <div className="h-10 animate-pulse rounded bg-neutral-50" />
          <div className="h-10 animate-pulse rounded bg-neutral-50" />
        </>
      ) : (
        data?.map(({ id, name }) => <Category key={id} id={id} name={name} />)
      )}

      <NewCategoryButton />
    </div>
  );
};

const ResumeTooltip = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <LuInfo />
        </TooltipTrigger>
        <TooltipContent align="start">
          <p className="max-w-72 normal-case">
            These are your refined resume categories. Assign sections from your
            CV to these categories create tailored resumes.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const newCategorySchema = z.object({ name: z.string().min(1).max(128) });
type NewCategorySchema = z.infer<typeof newCategorySchema>;

const NewCategoryButton = () => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const utils = api.useUtils();
  const { mutate } = api.resumes.create.useMutation();
  const form = useForm<NewCategorySchema>({
    resolver: zodResolver(newCategorySchema),
    defaultValues: { name: "" },
  });

  const onSubmit = (formData: NewCategorySchema) => {
    mutate(formData, {
      onSuccess: (data) => {
        const category = data[0];

        if (category) {
          setOpen(false);
          router.push(`/resume/${category.id}`);
          void utils.resumes.getAll.invalidate();
        } else {
          toast.error("There was an issue while creating a new category.");
        }
      },
      onError: () => {
        toast.error("There was an issue while creating a new category.");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-1 w-full">
          <LuPlusCircle className="mr-2 h-4 w-4" />
          New Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <DialogHeader>
              <DialogTitle>Create resume category</DialogTitle>
              <DialogDescription>
                Name your new category here. Click save when you{"'"}re done.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full-stack" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Add Category</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

interface CategoryProps {
  id: number;
  name: string;
}

const Category: React.FC<CategoryProps> = ({ id, name }) => {
  const { handleEdit, handleDownload, handleDelete } = useResumeCategories(id);

  return (
    <div className="flex flex-row gap-x-2">
      <Button
        variant="outline"
        size="lg"
        className="flex flex-1 justify-start gap-2 pl-3 pr-1"
        onClick={handleEdit}
      >
        <LuFileEdit className="h-4 w-4" />
        {name}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className={cn(
                buttonVariants({
                  size: "icon",
                  variant: "ghost",
                }),
                "ml-auto size-7 rounded-full hover:bg-neutral-100",
              )}
            >
              <LuMoreHorizontal className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="bottom" align="end">
            <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
              <LuFileEdit className="h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDownload}
              className="cursor-pointer"
            >
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
      </Button>
    </div>
  );
};
