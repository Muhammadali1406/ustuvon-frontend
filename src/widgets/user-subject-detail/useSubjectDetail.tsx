import { useQuery } from "@tanstack/react-query";
import { api } from "@/request/api";
import { links } from "@/request/links";
import type { Test } from "@/widgets/test/hook/test-types";

export function useSubjectDetail() {
  // Diqqat: queryKey ataylab ["examinations"] — bu admin panelidagi
  // useTest.ts bilan BIR XIL kalit. React Query keshni kalit bo'yicha
  // ulashadi, ya'ni ikkala joy ham bir xil ma'lumotni so'rasa, faqat
  // bitta tarmoq so'rovi ketadi (ikkinchisi keshdan olinadi).
  const { data: examinations, isLoading } = useQuery({
    queryKey: ["examinations"],
    queryFn: async () => {
      const { data } = await api.get<Test[]>(links.exams.examinations);
      return data;
    },
  });

  return { examinations: examinations ?? [], isLoading };
}