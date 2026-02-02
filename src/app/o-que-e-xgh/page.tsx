import Link from "next/link";
import DiagramXghVsAgil from "@/components/DiagramXghVsAgil";

export const metadata = {
  title: "O que é XGH | XGH Academy",
  description:
    "Origem e contexto do Extreme Go Horse (XGH), por que estudar de forma séria e o que extrair para POC, MVP e agilidade.",
};

export default function OQueEXghPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
        O que é XGH (Extreme Go Horse)
      </h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        O eXtreme Go Horse (XGH) é uma metodologia satírica brasileira,
        documentada e popularizada a partir de 2009, que descreve de forma
        bem-humorada péssimas práticas de desenvolvimento de software. Embora
        apresentada como processo de gestão de projetos, funciona como crítica
        às gambiarras, ao improviso e à priorização cega de prazo e custo em
        detrimento da qualidade.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Por que estudar XGH de forma séria?
        </h2>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">
          Conhecer os princípios do XGH permite identificar rapidamente quando um
          projeto ou time está adotando essas práticas. Em cenários de alta
          pressão (prazos curtos, POC, MVP), é comum que equipes caiam em
          atalhos que parecem ágeis mas geram dívida técnica e risco. O estudo
          formal do XGH ajuda a:
        </p>
        <ul className="mt-4 list-inside list-disc space-y-2 text-neutral-600 dark:text-neutral-400">
          <li>Reconhecer anti-padrões antes que virem cultura</li>
          <li>Defender práticas mínimas mesmo em entregas rápidas</li>
          <li>Comunicar riscos usando uma linguagem conhecida no mercado</li>
          <li>Priorizar o que realmente entrega valor sem sacrificar sustentabilidade</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          A verdade além da brincadeira
        </h2>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">
          A &quot;verdade&quot; que extraímos não é adotar o XGH, e sim o oposto:
          ser extremamente produtivo e ágil para entregar POC, MVP e produtos
          reais mantendo um mínimo de qualidade, visibilidade e responsabilidade.
          Isso inclui testes críticos, refatoração possível, escopo negociado e
          transparência com o cliente. O XGH Academy existe para formalizar esse
          conhecimento e certificar que você domina tanto os princípios quanto as
          alternativas corretas.
        </p>
        <DiagramXghVsAgil />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Referências
        </h2>
        <ul className="mt-3 space-y-2">
          <li>
            <a
              href="https://gohorse.com.br/extreme-go-horse-xgh.html"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-teal-600 underline hover:text-teal-700 dark:text-teal-400"
            >
              gohorse.com.br – eXtreme Go Horse (XGH)
            </a>
          </li>
          <li>
            <a
              href="https://guilhermemaker.substack.com/p/extreme-go-horse-xgh-a-metodologia"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-teal-600 underline hover:text-teal-700 dark:text-teal-400"
            >
              Guilherme Maker – XGH, a metodologia
            </a>
          </li>
          <li>
            <a
              href="https://blog.rodrigoafonso.com/extreme-go-horse-process-xgh.php"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-teal-600 underline hover:text-teal-700 dark:text-teal-400"
            >
              Rodrigo Afonso – eXtreme Go Horse Process (XGH)
            </a>
          </li>
        </ul>
      </section>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/principios"
          className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-teal-600 dark:hover:bg-teal-500"
        >
          Ver os 22 princípios
        </Link>
        <Link
          href="/boas-praticas"
          className="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          POC, MVP e agilidade
        </Link>
      </div>
    </div>
  );
}
