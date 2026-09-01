import { api } from "@/request/api";
import { links } from "@/request/links";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Taxamony, Test } from "./test-types";

export function useTest() {
  const { mutate: testDelete } = useMutation({
    mutationKey: [""],
    mutationFn: (id: string | number) =>
      api.delete(links.exams.examinationDetail(id)),
  });

  const { data: tests, refetch } = useQuery({
    queryKey: [""],
    queryFn: () => api.get(links.exams.examinations),
    select: (data) => {
      const res: Test[] = data?.data;
      return res;
    },
  });

  const { data: taxamonyTree } = useQuery({
    queryKey: ["taxamony-tree"],
    queryFn: async () => {
      const resTaxamony = await api.get<Taxamony[]>(
        links.subjects.taxonomyTree,
      );
      return resTaxamony.data;
    },
    select: (data) => {
      const taxonomyTitles = data.map((item) => item.title);
      return taxonomyTitles;
    },
  });

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
    testDelete(test.id);
  };

  return { tests: tests || [], handleDelete, refetch, taxamonyTree };
}
