import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileQuestion,
  Pause,
  Play,
  RotateCcw,
  ShieldAlert,
  Volume2,
  VolumeX,
} from "lucide-react";
import { SUBJECT_CATALOG } from "@/widgets/user-subject/hook/subject-data";
import { TEST_VARIANTS } from "@/widgets/user-subject/hook/test-data";
import TestNotFound from "@/widgets/test-rule/ui/not-found-test";
import {
  FALLBACK_DURATION_SECONDS,
  RULES,
  type PlaybackStatus,
} from "@/widgets/test-rule/hook/test-rule-data";

export default function TestRules() {
  const { subjectId, testId } = useParams<{
    subjectId: string;
    testId: string;
  }>();
  const navigate = useNavigate();

  const subject = SUBJECT_CATALOG.find((s) => s.id === subjectId);
  const variant = subjectId
    ? TEST_VARIANTS[subjectId]?.find((v) => v.id === testId)
    : undefined;

  const [status, setStatus] = useState<PlaybackStatus>("idle");
  const [progress, setProgress] = useState(0); // 0-100
  const [activeRuleIndex, setActiveRuleIndex] = useState(-1);
  const [muted, setMuted] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<number | null>(null);

  // Har bir qoidaning to'liq matndagi boshlanish/tugash pozitsiyasi —
  // ovozli o'qish paytida qaysi band o'qilayotganini aniqlash uchun
  const { fullText, ruleOffsets } = useMemo(() => {
    let cursor = 0;
    const offsets = RULES.map((rule) => {
      const start = cursor;
      cursor += rule.length + 1; // bo'shliq
      return { start, end: cursor };
    });
    return { fullText: RULES.join(" "), ruleOffsets: offsets };
  }, []);

  useEffect(() => {
    setSpeechSupported(
      typeof window !== "undefined" && "speechSynthesis" in window,
    );
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Ovoz ishlamaydigan yoki o'chirilgan holatlar uchun taymer asosidagi progress
  const startFallbackTimer = useCallback(() => {
    clearTimer();
    const startedAt = Date.now();
    timerRef.current = window.setInterval(() => {
      const elapsed = (Date.now() - startedAt) / 1000;
      const pct = Math.min(100, (elapsed / FALLBACK_DURATION_SECONDS) * 100);
      setProgress(pct);
      setActiveRuleIndex(
        Math.min(RULES.length - 1, Math.floor((pct / 100) * RULES.length)),
      );
      if (pct >= 100) {
        clearTimer();
        setStatus("finished");
      }
    }, 150);
  }, []);

  const speak = useCallback(() => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = "uz-UZ";
    utterance.rate = 0.95;
    utterance.pitch = 1;

    utterance.onboundary = (event) => {
      const pct = Math.min(100, (event.charIndex / fullText.length) * 100);
      setProgress(pct);
      const ruleIndex = ruleOffsets.findIndex(
        (range) =>
          event.charIndex >= range.start && event.charIndex < range.end,
      );
      if (ruleIndex !== -1) setActiveRuleIndex(ruleIndex);
    };

    utterance.onend = () => {
      setProgress(100);
      setActiveRuleIndex(RULES.length - 1);
      setStatus("finished");
    };

    utterance.onerror = () => {
      // Ovozli o'qishda xatolik — taymer bilan davom ettiramiz
      startFallbackTimer();
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [fullText, ruleOffsets, startFallbackTimer]);

  const handlePlay = () => {
    if (status === "paused" && speechSupported && !muted) {
      window.speechSynthesis.resume();
      setStatus("playing");
      return;
    }

    setProgress(0);
    setActiveRuleIndex(0);
    setStatus("playing");

    if (speechSupported && !muted) {
      speak();
    } else {
      startFallbackTimer();
    }
  };

  const handlePause = () => {
    if (speechSupported && !muted) {
      window.speechSynthesis.pause();
    } else {
      clearTimer();
    }
    setStatus("paused");
  };

  const handleReplay = () => {
    window.speechSynthesis.cancel();
    clearTimer();
    setProgress(0);
    setActiveRuleIndex(-1);
    setStatus("idle");
    window.setTimeout(handlePlay, 50);
  };

  const toggleMute = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);

    if (status === "playing") {
      window.speechSynthesis.cancel();
      clearTimer();
      if (nextMuted) {
        startFallbackTimer();
      } else if (speechSupported) {
        speak();
      }
    }
  };

  const canStart = status === "finished";

  if (!subject || !variant) {
    return <TestNotFound />;
  }

  return (
    <div className="space-y-6">
      <Link
        to={`/app/subjects/${subject.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft size={14} />
        {subject.name}ga qaytish
      </Link>

      {/* Test meta */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-black/8 bg-white p-5">
        <div>
          <span className="rounded-md bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-500">
            {subject.category}
          </span>
          <h1 className="mt-1.5 text-lg font-semibold text-slate-900">
            {subject.name} — {variant.title}
          </h1>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <FileQuestion size={13} />
            {variant.questionCount} ta savol
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} />
            {variant.durationMinutes} daqiqa
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Rules list */}
        <div className="rounded-xl border border-black/8 bg-white p-5 lg:col-span-2">
          <div className="flex items-center gap-2">
            <ShieldAlert size={18} className="text-[#0B8E0F]" />
            <p className="text-sm font-semibold text-slate-900">
              Test qoidalari
            </p>
          </div>

          <ol className="mt-4 space-y-3">
            {RULES.map((rule, index) => {
              const isActive =
                status === "playing" && index === activeRuleIndex;
              const isRead =
                status === "finished" ||
                activeRuleIndex > index ||
                (status === "paused" && index < activeRuleIndex);

              return (
                <li
                  key={rule}
                  className={`flex items-start gap-3 rounded-lg border px-3.5 py-3 text-sm leading-relaxed transition-colors duration-300 ${
                    isActive
                      ? "border-[#0EBE15]/50 bg-[#E7F8E8] text-slate-800"
                      : isRead
                        ? "border-black/5 bg-white text-slate-500"
                        : "border-black/5 bg-white text-slate-700"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors ${
                      isRead || isActive
                        ? "bg-[#0EBE15] text-[#101826]"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {isRead && !isActive ? (
                      <CheckCircle2 size={13} />
                    ) : (
                      index + 1
                    )}
                  </span>
                  {rule}
                </li>
              );
            })}
          </ol>
        </div>

        {/* Player card */}
        <div className="h-fit space-y-4 rounded-xl border border-black/8 bg-white p-5 lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">
              Ovozli o'qish
            </p>
            <button
              type="button"
              onClick={toggleMute}
              title={muted ? "Ovozni yoqish" : "Ovozni o'chirish"}
              className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>

          {/* Progress bar */}
          <div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[#0EBE15] transition-[width] duration-150 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {status === "idle" && "Qoidalarni tinglashni boshlang"}
              {status === "playing" && "O'qilmoqda…"}
              {status === "paused" && "To'xtatildi"}
              {status === "finished" && "Tinglab bo'lindi ✓"}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {status !== "finished" ? (
              <button
                type="button"
                onClick={status === "playing" ? handlePause : handlePlay}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0EBE15] px-4 py-2.5 text-sm font-semibold text-[#101826] transition-colors hover:bg-[#09720C] hover:text-white"
              >
                {status === "playing" ? (
                  <>
                    <Pause size={15} /> To'xtatish
                  </>
                ) : (
                  <>
                    <Play size={15} />
                    {status === "paused"
                      ? "Davom ettirish"
                      : "Tinglashni boshlash"}
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReplay}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-black/10 px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:border-[#0EBE15]/40 hover:text-[#0B8E0F]"
              >
                <RotateCcw size={15} />
                Qayta tinglash
              </button>
            )}
          </div>

          {!speechSupported && (
            <p className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-700">
              <AlertTriangle size={14} className="mt-0.5 shrink-0" />
              Brauzeringiz ovozli o'qishni qo'llab-quvvatlamaydi. Qoidalarni
              diqqat bilan o'qib chiqing — {FALLBACK_DURATION_SECONDS} soniyadan
              so'ng "Boshlash" tugmasi faollashadi.
            </p>
          )}

          <div className="border-t border-black/5 pt-4">
            <button
              type="button"
              disabled={!canStart}
              onClick={() =>
                navigate(`/app/subjects/${subject.id}/tests/${variant.id}/run`)
              }
              className={`w-full rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                canStart
                  ? "bg-[#0EBE15] text-[#101826] hover:bg-[#09720C] hover:text-white"
                  : "cursor-not-allowed bg-slate-100 text-slate-400"
              }`}
            >
              Testni boshlash
            </button>
            {!canStart && (
              <p className="mt-2 text-center text-[11px] text-slate-400">
                Qoidalarni to'liq tinglagach faollashadi
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
