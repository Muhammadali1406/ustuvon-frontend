import { api } from "@/request/api";
import { links } from "@/request/links";
import { useMutation, useQuery } from "@tanstack/react-query";
import { mockTests } from "./mock-test-data-test";
import type { Test, TestFormValues } from "./test-types";
import { useEffect, useState } from "react";
import { mockSubjects } from "@/widgets/subject";

export function useTest() {
  const [tests, setTests] = useState<Test[]>(mockTests);

  const { mutate: testDelete } = useMutation({
    mutationKey: [""],
    mutationFn: (id: string | number) =>
      api.delete(links.exams.examinationDetail(id)),
  });

  const { data } = useQuery({
    queryKey: [""],
    queryFn: () => api.get(links.exams.examinations),
    select: (data) => {
      const res: Test[] = data?.data;
      return res;
    },
  });

  useEffect(() => {
    if (data) setTests(data);
    setTests(mockTests);
  }, [data]);

  const handleCreate = (values: TestFormValues) => {
    const subject = mockSubjects.find((s) => s.id === values.subjectId);
    const newTest: Test = {
      id: `test_${Date.now()}`,
      title: values.title,
      subjectId: values.subjectId,
      subjectName: subject?.name ?? "—",
      format: values.format,
      questionsCount: values.questions.length,
      totalBall: values.questions.reduce((sum, q) => sum + q.ball, 0),
      durationMinutes: values.durationMinutes,
      status: values.status,
      createdAt: new Date().toISOString(),
      createdVia: "ai", // TODO: haqiqiy oqimda tab holatidan aniqlanadi
    };
    setTests((prev) => [newTest, ...prev]);
  };

  // function handleDuplicate(test: Test) {
  //   const copy: Test = {
  //     ...test,
  //     id: `test_${Date.now()}`,
  //     title: `${test.title} (nusxa)`,
  //     status: "Qoralama",
  //     createdAt: new Date().toISOString(),
  //   };
  //   setTests((prev) => [copy, ...prev]);
  // }

  const handleDelete = (test: Test) => {
    setTests((prev) => prev.filter((t) => t.id !== test.id));
    testDelete(test.id);
  };

  return { tests, setTests, handleCreate, handleDelete };
}
