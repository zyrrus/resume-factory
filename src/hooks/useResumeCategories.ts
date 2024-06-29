import { useRouter } from "next/navigation";

export const useResumeCategories = (id: number) => {
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

  return { handleEdit, handleDownload, handleDelete };
};
