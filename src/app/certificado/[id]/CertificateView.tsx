"use client";

import Link from "next/link";
import BadgeSpotlight from "@/components/BadgeSpotlight";
import LinkedInIntegration from "@/components/LinkedInIntegration";

interface CertificateViewProps {
  certificate: {
    certificateId: string;
    participantName: string;
    participantEmail: string;
    level: string;
    levelName: string;
    score: number;
    totalQuestions: number;
    issuedAt: string;
  };
  certificateId: string;
}

const levelStyles: Record<
  string,
  { border: string; bg: string; accent: string; label: string }
> = {
  foundation: {
    border: "border-teal-600/40 dark:border-teal-400/30",
    bg: "bg-teal-50/80 dark:bg-teal-950/30",
    accent: "text-teal-700 dark:text-teal-300",
    label: "text-teal-600 dark:text-teal-400",
  },
  practitioner: {
    border: "border-blue-600/40 dark:border-blue-400/30",
    bg: "bg-blue-50/80 dark:bg-blue-950/30",
    accent: "text-blue-700 dark:text-blue-300",
    label: "text-blue-600 dark:text-blue-400",
  },
  expert: {
    border: "border-amber-600/40 dark:border-amber-400/30",
    bg: "bg-amber-50/80 dark:bg-amber-950/30",
    accent: "text-amber-700 dark:text-amber-300",
    label: "text-amber-600 dark:text-amber-400",
  },
  ai: {
    border: "border-violet-600/40 dark:border-violet-400/30",
    bg: "bg-violet-50/80 dark:bg-violet-950/30",
    accent: "text-violet-700 dark:text-violet-300",
    label: "text-violet-600 dark:text-violet-400",
  },
};

export default function CertificateView({
  certificate,
  certificateId,
}: CertificateViewProps) {
  const issued = new Date(certificate.issuedAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const style = levelStyles[certificate.level] ?? levelStyles.foundation;

  return (
    <div className="space-y-8">
      <article
        className={`relative mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 ${style.border} bg-[#fefdfb] shadow-xl shadow-neutral-200/50 dark:bg-neutral-900 dark:shadow-none`}
      >
        <div className="absolute inset-0 rounded-[inherit] border border-amber-200/50 dark:border-amber-800/30 pointer-events-none" />
        <div className="relative p-10 sm:p-12">
          <div className="mb-8 flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-10">
            <div
              className={`flex shrink-0 items-center justify-center rounded-2xl border-2 ${style.border} ${style.bg} p-4 shadow-inner`}
            >
              <BadgeSpotlight
                badgeUrl={`/api/badges/${certificate.level}?v=2`}
                alt={`Badge ${certificate.levelName}`}
                thumbnailClassName="h-24 w-24 object-contain sm:h-28 sm:w-28"
              />
            </div>
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p
                className={`text-xs font-semibold uppercase tracking-[0.2em] ${style.label}`}
              >
                XGH Academy
              </p>
              <h1 className="mt-2 font-serif text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 sm:text-3xl">
                Certificado de Conclusão
              </h1>
              <div className="mt-6 border-t border-neutral-200 pt-6 dark:border-neutral-700">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Certificamos que
                </p>
                <p
                  className={`mt-1 font-serif text-xl font-bold sm:text-2xl ${style.accent}`}
                >
                  {certificate.participantName}
                </p>
                <p className="mt-3 text-neutral-600 dark:text-neutral-400">
                  concluiu com aprovação o exame de{" "}
                  <span className={`font-semibold ${style.accent}`}>
                    {certificate.levelName}
                  </span>
                  .
                </p>
                {certificate.level === "ai" && (
                  <p className="mt-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    Promptou, rodou, subiu.
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 border-t border-neutral-200 py-4 text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-400 sm:justify-between">
            <span>
              Pontuação: {certificate.score}% ({certificate.score}/
              {certificate.totalQuestions} questões)
            </span>
            <span>Emitido em {issued}</span>
          </div>
          <p className="font-mono text-xs text-neutral-400 dark:text-neutral-500">
            ID: {certificate.certificateId}
          </p>
        </div>
      </article>

      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
        <h2 className="font-semibold text-neutral-900 dark:text-white">
          Exportar e LinkedIn
        </h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Baixe o PDF ou adicione esta certificação ao seu perfil do LinkedIn.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href={`/api/certificates/${certificateId}/pdf`}
            download={
              certificate.level === "ai"
                ? `XGH-AI-Vibe-Coder-${certificate.certificateId}.pdf`
                : `XGH-Academy-${certificate.certificateId}.pdf`
            }
            className="inline-flex items-center rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-teal-600 dark:hover:bg-teal-500"
          >
            Baixar certificado (PDF)
          </a>
          <LinkedInIntegration
            certificateId={certificateId}
            credentialName={`${certificate.levelName} - XGH Academy`}
          />
          <Link
            href="/badges"
            className="inline-flex items-center rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            Ver meus certificados
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/validar"
          className="text-sm font-medium text-teal-600 hover:underline dark:text-teal-400"
        >
          Validar certificado
        </Link>
        <Link
          href="/certificacao"
          className="text-sm font-medium text-neutral-600 hover:underline dark:text-neutral-400"
        >
          Certificação
        </Link>
      </div>
    </div>
  );
}
