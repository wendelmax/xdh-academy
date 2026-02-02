import { principios } from "@/data/principios";
import {
  principiosAi,
  MANDAMENTO_XGH_AI,
  SLOGAN_XGH_AI,
} from "@/data/principios-ai";
import Link from "next/link";

type PageProps = {
  searchParams: Promise<{ edition?: string }>;
};

export async function generateMetadata({ searchParams }: PageProps) {
  const params = await searchParams;
  const isAi = params.edition === "ai";
  return {
    title: isAi
      ? "Os 14 Princípios do AI Vibe Coding – XGH | XGH Academy"
      : "Os 22 Princípios do XGH | XGH Academy",
    description: isAi
      ? "Princípios XGH aplicados a paradigmas atuais: IA, planejamento, remoto, plataforma e qualidade. Cada princípio descreve uma prática XGH e a prática recomendada."
      : "Lista completa dos 22 princípios do Extreme Go Horse com contraste às práticas recomendadas.",
  };
}

export default async function PrincipiosPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const isAi = params.edition === "ai";
  const lista = isAi ? principiosAi : principios;
  const titulo = isAi ? "Os 14 Princípios do AI Vibe Coding – XGH" : "Os 22 Princípios do XGH";
  const intro = isAi
    ? "100% focados em entrega, velocidade e resultado visível. Nada de padrão, nada de cheiro, nada de consciência técnica. Cada princípio descreve a vibe XGH e a prática recomendada."
    : "Cada princípio descreve uma prática XGH. Em contraste, indicamos o anti-padrão recomendado para não repetir o erro e manter produtividade sustentável em POC, MVP e projetos ágeis.";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-neutral-200 pb-4 dark:border-neutral-800">
        <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          Edição:
        </span>
        <div className="flex rounded-lg border border-neutral-200 bg-neutral-50 p-0.5 dark:border-neutral-700 dark:bg-neutral-800/50">
          <Link
            href="/principios"
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              !isAi
                ? "bg-white text-neutral-900 shadow dark:bg-neutral-700 dark:text-white"
                : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            }`}
          >
            XGH clássico
          </Link>
          <Link
            href="/principios?edition=ai"
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              isAi
                ? "bg-white text-neutral-900 shadow dark:bg-neutral-700 dark:text-white"
                : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            }`}
          >
            XGH-AI Vibe Coder
          </Link>
        </div>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
        {titulo}
      </h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">{intro}</p>

      {isAi && (
        <div className="mt-8 space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
          <blockquote className="border-l-4 border-teal-500 pl-4 text-lg font-medium italic text-neutral-800 dark:text-neutral-200">
            {MANDAMENTO_XGH_AI}
          </blockquote>
          <p className="text-right text-sm font-semibold text-teal-700 dark:text-teal-400">
            {SLOGAN_XGH_AI}
          </p>
        </div>
      )}

      <div className="mt-10 space-y-8">
        {lista.map((a) => (
          <article
            key={a.id}
            className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/50"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-sm font-bold text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
                {a.id}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-neutral-900 dark:text-white">
                  {a.titulo}
                </h2>
                <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                  {a.descricao}
                </p>
                <div className="mt-4 rounded-lg border-l-4 border-teal-500 bg-teal-50/50 py-2 pl-4 dark:bg-teal-950/30">
                  <p className="text-sm font-medium text-teal-800 dark:text-teal-200">
                    Prática recomendada
                  </p>
                  <p className="mt-1 text-sm text-teal-700 dark:text-teal-300">
                    {a.antiPadrao}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/boas-praticas"
          className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-teal-600 dark:hover:bg-teal-500"
        >
          POC, MVP e agilidade
        </Link>
        <Link
          href="/certificacao"
          className="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          Certificação XGH
        </Link>
      </div>
    </div>
  );
}
