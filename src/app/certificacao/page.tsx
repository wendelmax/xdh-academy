import Link from "next/link";
import { certificationLevels } from "@/data/certification";
import BadgeSpotlight from "@/components/BadgeSpotlight";

export const metadata = {
  title: "Certificação XGH | XGH Academy",
  description:
    "Níveis Foundation, Practitioner, Expert e XGH-AI Vibe Coder. Provas formais e certificado verificável por ID ou participante.",
};

export default function CertificacaoPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
        <img
          src="/xgh-certificacao-badge.png"
          alt="Certificação oficial Extreme Go Horse"
          className="h-28 w-28 shrink-0 object-contain sm:h-32 sm:w-32"
        />
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Certificação XGH
          </h1>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        A XGH Academy oferece certificação em quatro níveis, alinhada ao formato
        de certificações profissionais: provas com tempo limitado, pontuação
        mínima e emissão de certificado com identificador único para validação
        pública. O tom é sério; o conteúdo, um pouco de sátira com aprendizado de verdade.
          </p>
        </div>
      </div>

      <section className="mt-10 space-y-6">
        {certificationLevels.map((level) => (
          <article
            key={level.id}
            className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/50"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
              <BadgeSpotlight
                badgeUrl={`/api/badges/${level.id}?v=2`}
                alt={`Badge ${level.name}`}
                thumbnailClassName="h-32 w-auto object-contain sm:h-36"
              />
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                  {level.name}
                </h2>
                <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                  {level.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                  <li>Duração: {level.durationMinutes} min</li>
                  <li>Questões: {level.questionCount}</li>
                  <li>Nota mínima: {level.minScore}%</li>
                </ul>
                <Link
                  href={`/certificacao/exame/${level.id}`}
                  className="mt-4 inline-block rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-teal-600 dark:hover:bg-teal-500"
                >
                  Iniciar exame
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Validação de certificados
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Após aprovação, você recebe um certificado com ID único. Qualquer
          pessoa pode validar a autenticidade pelo ID do certificado ou pela
          identificação do participante na página de validação.
        </p>
        <Link
          href="/validar"
          className="mt-4 inline-block font-medium text-teal-600 hover:underline dark:text-teal-400"
        >
          Validar certificado
        </Link>
      </section>
    </div>
  );
}
