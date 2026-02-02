"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { CertificateRecord } from "@/lib/certificates";

function ValidarContent() {
  const searchParams = useSearchParams();
  const idFromUrl = searchParams.get("id")?.trim() ?? "";
  const [mode, setMode] = useState<"id" | "participant">("id");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    valid: boolean;
    certificate?: CertificateRecord;
    certificates?: CertificateRecord[];
    error?: string;
  } | null>(null);

  const modeButtonClass = (active: boolean) =>
    active
      ? "bg-neutral-900 text-white dark:bg-teal-600"
      : "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300";

  const search = useCallback(async () => {
    const value = query.trim();
    if (!value) return;
    setLoading(true);
    setResult(null);
    try {
      const param = mode === "id" ? "id" : "participant";
      const res = await fetch(
        `/api/certificates/verify?${param}=${encodeURIComponent(value)}`
      );
      const data = await res.json();
      if (res.ok) {
        setResult({
          valid: data.valid,
          certificate: data.certificate,
          certificates: data.certificates,
          error: data.error,
        });
      } else {
        setResult({ valid: false, error: data.error || "Erro na consulta." });
      }
    } catch {
      setResult({ valid: false, error: "Erro ao conectar." });
    } finally {
      setLoading(false);
    }
  }, [query, mode]);

  useEffect(() => {
    if (!idFromUrl) return;
    setMode("id");
    setQuery(idFromUrl);
  }, [idFromUrl]);

  useEffect(() => {
    if (!idFromUrl || query !== idFromUrl) return;
    search();
  }, [idFromUrl, query, search]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
        Validar Certificado
      </h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        Consulte a autenticidade de um certificado XGH pelo ID do certificado
        ou pela identificação do participante (e-mail ou nome).
      </p>

      <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setMode("id")}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${modeButtonClass(mode === "id")}`}
          >
            Por ID do certificado
          </button>
          <button
            type="button"
            onClick={() => setMode("participant")}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${modeButtonClass(mode === "participant")}`}
          >
            Por participante
          </button>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {mode === "id"
              ? "ID do certificado (ex.: XGH-ABC123-DEF456-GHI789)"
              : "E-mail ou nome do participante"}
          </label>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && search()}
              placeholder={
                mode === "id"
                  ? "XGH-XXXXXX-XXXXXX-XXXXXX"
                  : "email@exemplo.com ou Nome"
              }
              className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
            />
            <button
              type="button"
              onClick={search}
              disabled={loading || !query.trim()}
              className="rounded-lg bg-neutral-900 px-5 py-2 font-medium text-white hover:bg-neutral-700 disabled:opacity-50 dark:bg-teal-600 dark:hover:bg-teal-500"
            >
              {loading ? "Consultando..." : "Validar"}
            </button>
          </div>
        </div>
      </div>

      {result && (
        <div
          className={`mt-8 rounded-xl border p-6 ${
            result.valid
              ? "border-teal-200 bg-teal-50 dark:border-teal-800 dark:bg-teal-950/30"
              : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30"
          }`}
        >
          {result.error && !result.valid && (
            <p className="font-medium text-red-700 dark:text-red-300">
              {result.error}
            </p>
          )}
          {result.valid && result.certificate && (
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
              <div className="flex shrink-0 justify-center sm:justify-start">
                <div className="rounded-xl border-2 border-teal-200 bg-white p-3 shadow-inner dark:border-teal-700 dark:bg-neutral-900/50">
                  <img
                    src={`/api/badges/${result.certificate.level}?v=2`}
                    alt={`Badge ${result.certificate.levelName}`}
                    className="h-28 w-28 object-contain sm:h-32 sm:w-32"
                  />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-teal-900 dark:text-teal-100">
                  Certificado válido
                </p>
                <dl className="mt-4 grid gap-2 text-sm">
                  <div>
                    <dt className="text-neutral-500 dark:text-neutral-400">ID</dt>
                    <dd className="break-all font-mono text-teal-800 dark:text-teal-200">
                      {result.certificate.certificateId}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-neutral-500 dark:text-neutral-400">
                      Participante
                    </dt>
                    <dd className="text-teal-800 dark:text-teal-200">
                      {result.certificate.participantName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-neutral-500 dark:text-neutral-400">
                      Nível
                    </dt>
                    <dd className="text-teal-800 dark:text-teal-200">
                      {result.certificate.levelName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-neutral-500 dark:text-neutral-400">
                      Emitido em
                    </dt>
                    <dd className="text-teal-800 dark:text-teal-200">
                      {new Date(result.certificate.issuedAt).toLocaleDateString(
                        "pt-BR",
                        {
                          dateStyle: "long",
                        }
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
          {result.valid && result.certificates && result.certificates.length > 0 && (
            <div>
              <p className="font-semibold text-teal-900 dark:text-teal-100">
                Certificados encontrados
              </p>
              <ul className="mt-4 space-y-4">
                {result.certificates.map((c) => (
                  <li
                    key={c.certificateId}
                    className="rounded-lg border border-teal-200 bg-white p-4 dark:border-teal-700 dark:bg-neutral-900/50"
                  >
                    <p className="font-mono text-sm text-teal-800 dark:text-teal-200">
                      {c.certificateId}
                    </p>
                    <p className="mt-1 text-neutral-700 dark:text-neutral-300">
                      {c.participantName} – {c.levelName}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {new Date(c.issuedAt).toLocaleDateString("pt-BR", {
                        dateStyle: "long",
                      })}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-8">
        <Link
          href="/certificacao"
          className="font-medium text-teal-600 hover:underline dark:text-teal-400"
        >
          Voltar à certificação
        </Link>
      </div>
    </div>
  );
}

export default function ValidarPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-2xl px-4 py-12">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Validar Certificado
          </h1>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Carregando...
          </p>
        </div>
      }
    >
      <ValidarContent />
    </Suspense>
  );
}
