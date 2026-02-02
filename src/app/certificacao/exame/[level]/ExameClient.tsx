"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import type { CertificationLevel } from "@/data/certification";
import { getRandomHint, getQuestionSubtitle } from "./exam-hints";

interface QuestionData {
  id: string;
  question: string;
  options: string[];
}

interface ExamData {
  level: string;
  levelName: string;
  durationMinutes: number;
  minScore: number;
  questions: QuestionData[];
}

type Step = "identify" | "exam" | "alreadyCertified" | "submitted";

const HINT_DELAY_MS = 12000;

export default function ExameClient({ level }: { level: CertificationLevel }) {
  const [step, setStep] = useState<Step>("identify");
  const [exam, setExam] = useState<ExamData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [checking, setChecking] = useState(false);
  const [alreadyCertifiedCertificate, setAlreadyCertifiedCertificate] = useState<{
    certificateId: string;
    participantName: string;
    levelName: string;
    issuedAt: string;
  } | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{
    passed: boolean;
    score: number;
    totalQuestions: number;
    minScore: number;
    certificate?: {
      certificateId: string;
      participantName: string;
      levelName: string;
      issuedAt: string;
    };
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [hintForQuestion, setHintForQuestion] = useState<Record<string, string>>({});
  const answersRef = useRef<Record<string, number>>({});
  const hintForQuestionRef = useRef<Record<string, string>>({});

  answersRef.current = answers;
  hintForQuestionRef.current = hintForQuestion;

  useEffect(() => {
    if (step !== "exam") return;
    setLoading(true);
    setError(null);
    fetch(`/api/certificacao/exame?level=${level}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          return;
        }
        setExam(data);
        setRemainingSeconds(data.durationMinutes * 60);
      })
      .catch(() => setError("Erro ao carregar exame."))
      .finally(() => setLoading(false));
  }, [level, step]);

  useEffect(() => {
    if (!exam || submitted) return;
    const id = setInterval(() => {
      const current = answersRef.current;
      const hints = hintForQuestionRef.current;
      const next = exam.questions.find((q) => current[q.id] === undefined && !hints[q.id]);
      if (next) {
        setHintForQuestion((prev) => ({ ...prev, [next.id]: getRandomHint() }));
      }
    }, HINT_DELAY_MS);
    return () => clearInterval(id);
  }, [exam, submitted]);

  useEffect(() => {
    if (!exam || submitted || remainingSeconds <= 0) return;
    const t = setInterval(() => {
      setRemainingSeconds((s) => {
        if (s <= 1) {
          clearInterval(t);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [exam, submitted, remainingSeconds]);

  const handleContinueToExam = useCallback(async () => {
    if (!email.trim()) {
      setError("Preencha o e-mail para continuar.");
      return;
    }
    setError(null);
    setChecking(true);
    try {
      const res = await fetch(
        `/api/certificates/check?email=${encodeURIComponent(email.trim())}&level=${level}`
      );
      const data = await res.json();
      if (data.error) {
        setError(data.error || "Erro ao verificar certificação.");
        setChecking(false);
        return;
      }
      if (data.alreadyCertified && data.certificate) {
        setAlreadyCertifiedCertificate(data.certificate);
        setStep("alreadyCertified");
      } else {
        setStep("exam");
      }
    } catch {
      setError("Erro ao verificar certificação.");
    } finally {
      setChecking(false);
    }
  }, [email, level]);

  const submit = useCallback(async () => {
    if (!exam || !name.trim() || !email.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/certificates/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level: exam.level,
          participantName: name.trim(),
          participantEmail: email.trim(),
          answers,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setError(
          res.status === 409
            ? data.error
            : data.error || "Erro ao enviar exame."
        );
        setSubmitting(false);
        return;
      }
      setResult({
        passed: data.passed,
        score: data.score,
        totalQuestions: data.totalQuestions,
        minScore: data.minScore,
        certificate: data.certificate ?? undefined,
      });
      setSubmitted(true);
      setStep("submitted");
    } catch {
      setError("Erro ao enviar exame.");
    } finally {
      setSubmitting(false);
    }
  }, [exam, name, email, answers]);

  if (step === "identify") {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-8 dark:border-neutral-800 dark:bg-neutral-900/50">
        <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
          Identificação
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
          Informe seu e-mail. Verificamos por e-mail se você já possui esta certificação antes de exibir o exame.
        </p>
        <div className="mt-6 w-full max-w-sm">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            E-mail
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
            placeholder="seu@email.com"
          />
        </div>
        {error && (
          <p className="mt-4 text-red-600 dark:text-red-400">{error}</p>
        )}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={handleContinueToExam}
            disabled={checking || !email.trim()}
            className="w-full rounded-lg bg-neutral-900 px-6 py-3 text-sm sm:text-base font-medium text-white hover:bg-neutral-700 disabled:opacity-50 dark:bg-teal-600 dark:hover:bg-teal-500 sm:w-auto"
          >
            {checking ? "Verificando..." : "Continuar para o exame"}
          </button>
          <Link
            href="/certificacao"
            className="w-full rounded-lg border border-neutral-300 px-5 py-2.5 text-center text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-300 sm:w-auto"
          >
            Voltar
          </Link>
        </div>
      </div>
    );
  }

  if (step === "alreadyCertified" && alreadyCertifiedCertificate) {
    return (
      <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4 sm:p-8 dark:border-teal-800 dark:bg-teal-950/30">
        <h2 className="text-xl sm:text-2xl font-bold text-teal-900 dark:text-teal-100">
          Você já possui esta certificação
        </h2>
        <p className="mt-2 text-sm sm:text-base text-teal-800 dark:text-teal-200">
          O e-mail informado já está associado a um certificado aprovado para este nível.
        </p>
        <p className="mt-3 wrap-break-word font-mono text-xs sm:text-sm text-teal-700 dark:text-teal-300">
          {alreadyCertifiedCertificate.participantName} – {alreadyCertifiedCertificate.levelName}
        </p>
        <p className="mt-1 break-all text-xs sm:text-sm text-teal-600 dark:text-teal-400">
          ID: {alreadyCertifiedCertificate.certificateId}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={`/certificado/${alreadyCertifiedCertificate.certificateId}`}
                className="w-full rounded-lg bg-teal-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-teal-500 dark:bg-teal-500 dark:hover:bg-teal-400 sm:w-auto"
              >
                Ver certificado e baixar PDF
              </Link>
              <Link
                href="/certificacao"
                className="w-full rounded-lg border border-teal-600 bg-teal-50 px-4 py-2 text-center text-sm font-medium text-teal-700 dark:border-teal-500 dark:text-teal-300 dark:bg-teal-900/30 sm:w-auto"
              >
                Voltar à certificação
              </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-neutral-600 dark:text-neutral-400">
          Carregando exame...
        </p>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-500">
          (Não é XGH: a gente prepara as questões com carinho.)
        </p>
      </div>
    );
  }

  if (error && !exam) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/30">
        <p className="text-red-700 dark:text-red-300">{error}</p>
        <Link
          href="/certificacao"
          className="mt-4 inline-block font-medium text-red-600 dark:text-red-400"
        >
          Voltar à certificação
        </Link>
      </div>
    );
  }

  if (submitted && result) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-8 dark:border-neutral-800 dark:bg-neutral-900/50">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
          {result.passed ? "Aprovado" : "Reprovado"}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
          {result.passed
            ? "Parabéns. Você provou que consegue distinguir XGH de práticas saudáveis (e que leu as questões)."
            : "Não foi dessa vez. O lado bom: você sabe o que NÃO fazer. Revise o material e tente de novo."}
        </p>
        <p className="mt-3 text-xs sm:text-sm text-neutral-500 dark:text-neutral-500">
          Pontuação: {result.score}% ({result.score}/{result.totalQuestions}{" "}
          questões). Nota mínima: {result.minScore}%.
        </p>
        {result.passed && result.certificate && (
          <div className="mt-6 rounded-xl border border-teal-200 bg-teal-50 p-4 sm:p-6 dark:border-teal-800 dark:bg-teal-950/30">
            <p className="font-semibold text-teal-900 dark:text-teal-100">
              Certificado emitido
            </p>
            <p className="mt-2 break-all font-mono text-xs sm:text-sm text-teal-800 dark:text-teal-200">
              ID: {result.certificate.certificateId}
            </p>
            <p className="mt-1 wrap-break-word text-xs sm:text-sm text-teal-700 dark:text-teal-300">
              {result.certificate.participantName} – {result.certificate.levelName}
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={`/certificado/${result.certificate.certificateId}`}
                className="w-full rounded-lg bg-teal-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-teal-500 dark:bg-teal-500 dark:hover:bg-teal-400 sm:w-auto"
              >
                Ver certificado e baixar PDF
              </Link>
              <a
                href={`/api/certificates/${result.certificate.certificateId}/pdf`}
                download={
                  result.certificate.levelName.includes("Vibe Coder")
                    ? `XGH-AI-Vibe-Coder-${result.certificate.certificateId}.pdf`
                    : `XGH-Academy-${result.certificate.certificateId}.pdf`
                }
                className="w-full rounded-lg border border-teal-600 bg-teal-50 px-4 py-2 text-center text-sm font-medium text-teal-700 dark:border-teal-500 dark:text-teal-300 dark:bg-teal-900/30 sm:w-auto"
              >
                Baixar PDF
              </a>
              <Link
                href="/validar"
                className="w-full text-center text-sm font-medium text-teal-600 hover:underline dark:text-teal-400 sm:w-auto"
              >
                Validar certificado
              </Link>
            </div>
          </div>
        )}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/certificacao"
            className="w-full rounded-lg bg-neutral-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-neutral-700 dark:bg-teal-600 dark:hover:bg-teal-500 sm:w-auto"
          >
            Voltar à certificação
          </Link>
          <Link
            href="/"
            className="w-full rounded-lg border border-neutral-300 px-5 py-2.5 text-center text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-300 sm:w-auto"
          >
            Início
          </Link>
        </div>
      </div>
    );
  }

  if (!exam) return null;

  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;
  const timeUp = remainingSeconds <= 0;
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = exam.questions.length;
  const progressPercent = totalQuestions ? (answeredCount / totalQuestions) * 100 : 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Exame: {exam.levelName}
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {answeredCount} de {totalQuestions} respondidas. {timeUp ? "Tempo esgotado." : "Leia, pense e escolha (sem pressa de mais)."}
          </p>
        </div>
        <div
          className={`flex items-center gap-2 font-mono text-lg ${
            remainingSeconds <= 300 ? "text-amber-600 dark:text-amber-400" : "text-neutral-600 dark:text-neutral-400"
          }`}
        >
          <span aria-hidden>{mins}:{secs.toString().padStart(2, "0")}</span>
          {remainingSeconds <= 300 && remainingSeconds > 0 && (
            <span className="text-sm font-sans text-amber-600 dark:text-amber-400">
              (respira)
            </span>
          )}
        </div>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
        <div
          className="h-full rounded-full bg-teal-500 transition-all duration-300 ease-out dark:bg-teal-400"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
        <h3 className="font-semibold text-neutral-900 dark:text-white">
          Identificação
        </h3>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Quem está fazendo o exame (para o certificado sair no seu nome).
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Nome completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
              placeholder="seu@email.com"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {exam.questions.map((q, idx) => (
          <fieldset
            key={q.id}
            className="rounded-xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/50"
          >
            <legend className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Questão {idx + 1} de {totalQuestions}
              <span className="ml-2 text-neutral-400 dark:text-neutral-500">
                – {getQuestionSubtitle(idx, totalQuestions)}
              </span>
            </legend>
            <p className="mt-2 font-medium text-neutral-900 dark:text-white">
              {q.question}
            </p>
            <ul className="mt-4 space-y-2">
              {q.options.map((opt, i) => (
                <li key={i}>
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-neutral-200 p-3 transition-colors hover:bg-neutral-50 hover:border-neutral-300 dark:border-neutral-700 dark:hover:bg-neutral-800/50 dark:hover:border-neutral-600">
                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === i}
                      onChange={() =>
                        setAnswers((a) => ({ ...a, [q.id]: i }))
                      }
                      className="mt-1"
                    />
                    <span className="text-neutral-700 dark:text-neutral-300">
                      {opt}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
            {hintForQuestion[q.id] && (
              <div
                className="mt-4 rounded-lg border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm text-amber-900 dark:border-amber-800/50 dark:bg-amber-950/30 dark:text-amber-100"
                role="status"
              >
                <span className="font-medium">Dica (você demorou um pouco):</span>{" "}
                {hintForQuestion[q.id]}
              </div>
            )}
          </fieldset>
        ))}
      </div>

      {error && (
        <p className="text-red-600 dark:text-red-400">{error}</p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={submit}
          disabled={
            submitting ||
            timeUp ||
            !name.trim() ||
            !email.trim() ||
            answeredCount < totalQuestions
          }
          className="rounded-lg bg-neutral-900 px-6 py-3 font-medium text-white hover:bg-neutral-700 disabled:opacity-50 dark:bg-teal-600 dark:hover:bg-teal-500"
        >
          {submitting ? "Enviando..." : "Enviar exame"}
        </button>
        {timeUp && (
          <p className="text-amber-600 dark:text-amber-400">
            Tempo esgotado. Envie suas respostas se já preencheu tudo.
          </p>
        )}
        {answeredCount < totalQuestions && !timeUp && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Responda todas as {totalQuestions} questões para habilitar o envio.
          </p>
        )}
      </div>
    </div>
  );
}
