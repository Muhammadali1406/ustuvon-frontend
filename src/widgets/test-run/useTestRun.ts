import { useQuery } from "@tanstack/react-query";
import { links } from "@/request/links";
import { api } from "@/request/api";

export function useTestRun({
  testId,
  subjectId,
}: {
  testId: string;
  subjectId: string;
}) {
  const { data: testRun } = useQuery({
    queryKey: ["test-run", testId, subjectId],
    queryFn: () => api.get(links.exams.examinationDetail(testId)),
  });
  return { testRun: testRun?.data };
}
