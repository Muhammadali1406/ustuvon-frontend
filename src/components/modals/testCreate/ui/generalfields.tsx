import { useState } from "react";
import type { TestMeta } from "../hook/useCreateTest";
import {
  type Taxamony,
  type TaxamonySubject,
  type TestFormValues,
} from "@/widgets/test/hook/test-types";

interface GeneralfieldsProps {
  meta: TestMeta;
  setMeta: React.Dispatch<React.SetStateAction<TestMeta>>;
  taxamonyTree: Taxamony[] | undefined;
}

export default function Generalfields({
  meta,
  setMeta,
  taxamonyTree,
}: GeneralfieldsProps) {
  const [subjects, setSubjects] = useState<TaxamonySubject[] | null>(null);
  console.log("create test: ", subjects);
  console.log("create test: ", taxamonyTree);
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      <div className="col-span-2">
        <label className="block text-sm font-medium text-slate-700">
          Test nomi
        </label>
        <input
          type="text"
          value={meta.title}
          onChange={(e) => setMeta((m) => ({ ...m, title: e.target.value }))}
          placeholder="Masalan: Milliy Sertifikat — Matematika #16"
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-[#12525A] focus:outline-none focus:ring-1 focus:ring-[#12525A]"
        />
      </div>

      {subjects && (
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Fan
          </label>
          <select
            value={meta.subjectId}
            onChange={(e) =>
              setMeta((m) => ({ ...m, subjectId: Number(e.target.value) }))
            }
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-[#12525A] focus:outline-none focus:ring-1 focus:ring-[#12525A]"
          >
            <option value="">Tanlang...</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {taxamonyTree ? (
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Format
          </label>
          <select
            value={meta.format}
            onChange={(e) => {
              setMeta((m) => ({
                ...m,
                format: e.target.value as TestFormValues["format"],
              }));
              const subject = taxamonyTree.find(
                (t) => t.title === e.target.value,
              );
              setSubjects(subject?.subjects || []);
            }}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-[#12525A] focus:outline-none focus:ring-1 focus:ring-[#12525A]"
          >
            <option value="">Tanlang...</option>
            {taxamonyTree.map((f) => (
              <option key={f.id} value={f.title}>
                {f.title}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p>Malumot yuklanmadi!</p>
      )}

      <div className="col-span-2">
        <label className="block text-sm font-medium text-slate-700">
          Davomiyligi (daqiqa)
        </label>
        <input
          type="number"
          min={1}
          value={meta.durationMinutes}
          onChange={(e) =>
            setMeta((m) => ({
              ...m,
              durationMinutes: Number(e.target.value),
            }))
          }
          className="mt-1 w-32 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-[#12525A] focus:outline-none focus:ring-1 focus:ring-[#12525A]"
        />
      </div>
    </div>
  );
}
