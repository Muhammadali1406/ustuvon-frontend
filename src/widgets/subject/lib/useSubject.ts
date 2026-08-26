import { useEffect, useState } from "react";
import { mockSubjects } from "./mock-test-data-subject";
import type { ScheduledTest, Subject, SubjectFormValues } from "./type-subject";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/request/api";
import { links } from "@/request/links";
import { toast } from "react-toastify";

interface UseSubjectsProps {
  editingSubject: Subject | null;
  schedulingSubject: Subject | null;
}

export function useSubjects({
  editingSubject,
  schedulingSubject,
}: UseSubjectsProps) {
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [category, setCatyegory] = useState<string[] | null>(null);

  const { data: taxamonyTreeSubject } = useQuery({
    queryKey: [""],
    queryFn: () => api.get(links.subjects.taxonomyTree),
    select: (data) => data.data,
  });
  useEffect(() => {
    console.log("taxamony tree: ", taxamonyTreeSubject);
    setCatyegory(['salom'])
  }, [taxamonyTreeSubject]);

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
    mutationFn: (data: Subject) =>
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
    mutationFn: (data: SubjectFormValues) =>
      api.post(links.subjects.subjectCreate, data),
    onSuccess: () => {
      toast.success("Yaratildi");
    },
    onError: (error) => {
      console.log("create subject: ", error);
    },
  });

  const handleCreate = (values: SubjectFormValues) => {
    const newSubject: Subject = {
      id: `subj_${Date.now()}`,
      name: values.name.trim(),
      category: values.category,
      isActive: values.isActive,
      testsCount: 0,
      createdAt: new Date().toISOString(),
      scheduledTest: null,
    };
    setSubjects((prev) => [newSubject, ...prev]);
    createSubject(newSubject);
  };

  const handleUpdate = (values: SubjectFormValues) => {
    if (!editingSubject) return;
    setSubjects((prev) =>
      prev.map((s) => (s.id === editingSubject.id ? { ...s, ...values } : s)),
    );
    updateSubject(editingSubject);
  };

  const handleDelete = (subject: Subject) => {
    setSubjects((prev) => prev.filter((s) => s.id !== subject.id));
    deleteSubjects(Number(subject.id));
  };

  const handleToggleActive = (subject: Subject) => {
    setSubjects((prev) =>
      prev.map((s) =>
        s.id === subject.id ? { ...s, isActive: !s.isActive } : s,
      ),
    );
  };

  const handleSchedule = (scheduled: ScheduledTest) => {
    if (!schedulingSubject) return;
    setSubjects((prev) =>
      prev.map((s) =>
        s.id === schedulingSubject.id ? { ...s, scheduledTest: scheduled } : s,
      ),
    );
  };

  return {
    subjects,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleToggleActive,
    handleSchedule,
    deletePending,
    updatePending,
    createPending,
    category,
  };
}
