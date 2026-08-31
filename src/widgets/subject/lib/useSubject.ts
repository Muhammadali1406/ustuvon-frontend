import type { ScheduledTest, Subject, SubjectFormValues } from "./type-subject";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/request/api";
import { links } from "@/request/links";
import { toast } from "react-toastify";
import type { TaxamonySubject } from "@/widgets/test/hook/test-types";

interface UseSubjectsProps {
  editingSubject: TaxamonySubject | null;
  // schedulingSubject: TaxamonySubject | null;
}

export function useSubjects({
  editingSubject,
  // schedulingSubject,
}: UseSubjectsProps) {
  const { data: taxamonyTreeSubject } = useQuery({
    queryKey: [""],
    queryFn: () => api.get(links.subjects.taxonomyTree),
    select: (data) => data.data,
  });

  const { mutate: deleteSubjects, isPending: deletePending } = useMutation({
    mutationKey: ["subjectDelete"],
    mutationFn: (id: number) => api.delete(links.subjects.subjectDelete(id)),
    onSuccess: () => {
      toast.success("O'chirildi");
    },
    onError: (error) => {
      console.log("delete subject: ", error);
    },
  });

  const { mutate: updateSubject, isPending: updatePending } = useMutation({
    mutationKey: ["subjectUpdate"],
    mutationFn: (data: TaxamonySubject) =>
      api.patch(links.subjects.subjectUpdate(data)),
    onSuccess: () => {
      toast.success("Yangilandi");
    },
    onError: (error) => {
      console.log("update subject: ", error);
    },
  });

  const { mutate: createSubject, isPending: createPending } = useMutation({
    mutationKey: ["subjectCreate"],
    mutationFn: (data: any) => api.post(links.subjects.subjectCreate, data),
    onSuccess: () => {
      toast.success("Yaratildi");
    },
    onError: (error) => {
      console.log("create subject: ", error);
    },
  });

  const handleCreate = (values: SubjectFormValues) => {
    const newSubject = {
      title: values.name.trim(),
      category: values.category,
    };
    createSubject(newSubject);
  };

  const handleUpdate = () => {
    if (!editingSubject) return;
    updateSubject(editingSubject);
  };

  const handleDelete = (subject: TaxamonySubject) => {
    deleteSubjects(Number(subject.id));
  };

  const handleToggleActive = (subject: Subject) => {};

  // const handleSchedule = (scheduled: ScheduledTest) => {
  //   if (!schedulingSubject) return;
  // };

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    handleToggleActive,
    // handleSchedule,
    deletePending,
    updatePending,
    createPending,
    taxamonyTreeSubject,
  };
}
