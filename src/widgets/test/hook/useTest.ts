import { api } from "@/request/api";
import { links } from "@/request/links";
import { useMutation, useQuery } from "@tanstack/react-query";
import { mockTests } from "./mock-test-data-test";
import type { Test } from "./test-types";
import { useEffect, useState } from "react";

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

  return { tests, setTests, handleDelete };
}
