"use client";

import { useState } from "react";
import BadgeSpotlight from "@/components/BadgeSpotlight";
import LinkedInIntegration from "@/components/LinkedInIntegration";
import Link from "next/link";

interface CertRecord {
  certificateId: string;
  participantName: string;
  levelName: string;
  level: string;
  issuedAt: string;
}

export default function BadgesPage() {
  const [email, setEmail] = useState("");
  const [certs, setCerts] = useState<CertRecord[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setCerts(null);
    setError(null);
    try {
      const res = await fetch(
        `/api/certificates/verify?participant=${encodeURIComponent(email.trim())}`
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro na consulta.");
        setLoading(false);
        return;
      }
      if (data.valid && data.certificates?.length) {
        setCerts(data.certificates);
      } else {
        setCerts([]);
      }
    } catch {
      setError("Erro ao conectar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
        Meus Certificados
      </h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        Digite seu e-mail (o mesmo usado na certificação) para listar seus
        certificados e badges XGH. Os badges ficam anexados a cada certificado
        emitido.
      </p>

      <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          E-mail
        </label>
        <div className="mt-2 flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            placeholder="seu@email.com"
            className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
          />
          <button
            type="button"
            onClick={search}
            disabled={loading || !email.trim()}
            className="rounded-lg bg-neutral-900 px-5 py-2 font-medium text-white hover:bg-neutral-700 disabled:opacity-50 dark:bg-teal-600 dark:hover:bg-teal-500"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-4 text-red-600 dark:text-red-400">{error}</p>
      )}

      {certs !== null && (
        <div className="mt-8">
          {certs.length === 0 ? (
            <p className="text-neutral-600 dark:text-neutral-400">
              Nenhum certificado encontrado para este e-mail.
            </p>
          ) : (
            <ul className="space-y-6">
              {certs.map((c) => (
                  <li
                    key={c.certificateId}
                    className="flex flex-col items-center gap-4 rounded-xl border border-neutral-200 bg-white p-6 sm:flex-row sm:items-start dark:border-neutral-800 dark:bg-neutral-900/50"
                  >
                    <BadgeSpotlight
                      badgeUrl={`/api/badges/${c.level}?v=2`}
                      alt={`Badge ${c.levelName}`}
                      thumbnailClassName="h-24 w-24 object-contain"
                    />
                    <div className="min-w-0 flex-1 text-center sm:text-left">
                      <p className="font-semibold text-neutral-900 dark:text-white">
                        {c.levelName}
                      </p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        ID: {c.certificateId}
                      </p>
                      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                        {new Date(c.issuedAt).toLocaleDateString("pt-BR", {
                          dateStyle: "long",
                        })}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <Link
                          href={`/certificado/${c.certificateId}`}
                          className="text-sm font-medium text-teal-600 hover:underline dark:text-teal-400"
                        >
                          Ver certificado e baixar PDF
                        </Link>
                        <LinkedInIntegration
                          certificateId={c.certificateId}
                          credentialName={`${c.levelName} - XGH Academy`}
                        />
                      </div>
                    </div>
                  </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-8">
        <Link
          href="/certificacao"
          className="text-sm font-medium text-neutral-600 hover:underline dark:text-neutral-400"
        >
          Voltar à certificação
        </Link>
      </div>
    </div>
  );
}
