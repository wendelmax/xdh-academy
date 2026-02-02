import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <section className="text-center">
        <Image
          src="/xgh-certificacao-badge.png"
          alt="Logo XGH Academy"
          width={480}
          height={480}
          className="mx-auto h-72 w-auto object-contain"
          priority
        />
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
          XGH Academy
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          Aprendizado formal sobre Extreme Go Horse: da sátira à verdade
          aplicável. Produtividade e agilidade sustentáveis para POC, MVP e
          entrega de valor.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/o-que-e-xgh"
            className="rounded-lg bg-neutral-900 px-6 py-3 font-medium text-white transition hover:bg-neutral-700 dark:bg-teal-600 dark:hover:bg-teal-500"
          >
            Começar a estudar
          </Link>
          <Link
            href="/certificacao"
            className="rounded-lg border border-neutral-300 px-6 py-3 font-medium text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            Certificação XGH
          </Link>
        </div>
      </section>

      <section className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          href="/o-que-e-xgh"
          title="O que é XGH"
          description="Origem, contexto e por que estudar o Extreme Go Horse de forma séria para extrair lições e anti-padrões."
        />
        <Card
          href="/manifesto"
          title="Manifesto XGH"
          description="Declaração de valores e princípios do eXtreme Go Horse, em formato de manifesto, com contraste ao Manifesto Ágil."
        />
        <Card
          href="/principios"
          title="Os 22 Princípios"
          description="Lista completa dos princípios do XGH com contraste às práticas recomendadas para não repetir os erros."
        />
        <Card
          href="/boas-praticas"
          title="POC, MVP e Agilidade"
          description="Como ser ágil e produtivo sem cair no XGH: entregas rápidas com qualidade e visibilidade."
        />
        <Card
          href="/certificacao"
          title="Certificação"
          description="Níveis Foundation, Practitioner e Expert. Provas formais e certificado verificável."
        />
        <Card
          href="/validar"
          title="Validar Certificado"
          description="Consulte a autenticidade de um certificado pelo ID ou pela identificação do participante."
        />
      </section>

      <section className="mt-16 rounded-2xl border border-neutral-200 bg-neutral-50 p-8 dark:border-neutral-800 dark:bg-neutral-900/50">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Por que uma academia XGH?
        </h2>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">
          O Extreme Go Horse nasceu como sátira às más práticas de desenvolvimento.
          Aqui tratamos o tema com seriedade: identificar o que não fazer e,
          em contraste, o que fazer para entregar POC e MVP de forma ágil sem
          sacrificar sustentabilidade. O objetivo é certificar que você conhece
          os princípios, reconhece anti-padrões e sabe aplicar alternativas
          saudáveis no dia a dia.
        </p>
      </section>
    </div>
  );
}

function Card({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:border-neutral-300 hover:shadow dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
    >
      <h3 className="font-semibold text-neutral-900 group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-400">
        {title}
      </h3>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
      <span className="mt-3 inline-block text-sm font-medium text-teal-600 dark:text-teal-400">
        Acessar
      </span>
    </Link>
  );
}
