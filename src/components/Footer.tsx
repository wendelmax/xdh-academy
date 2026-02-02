import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/xgh-certificacao-badge.png"
              alt="Logo XGH Academy"
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 object-contain"
            />
            <div>
              <p className="font-semibold text-neutral-900 dark:text-white">
                XGH Academy
              </p>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                Conhecimento formal sobre Extreme Go Horse e práticas ágeis
                sustentáveis para POC, MVP e entrega de valor.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <Link
              href="/certificacao"
              className="text-sm font-medium text-neutral-700 hover:underline dark:text-neutral-300"
            >
              Certificação
            </Link>
            <Link
              href="/validar"
              className="text-sm font-medium text-neutral-700 hover:underline dark:text-neutral-300"
            >
              Validar Certificado
            </Link>
            <a
              href="https://gohorse.com.br/extreme-go-horse-xgh.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-700 hover:underline dark:text-neutral-300"
            >
              Referência XGH (externo)
            </a>
            <a
              href="https://pog-academy.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-700 hover:underline dark:text-neutral-300"
            >
              POG Academy
            </a>
          </div>
        </div>
        <p className="mt-6 border-t border-neutral-200 pt-6 text-center text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          Conteúdo educacional. Certificações XGH são emitidas por XGH Academy
          para fins de comprovação de conhecimento.
        </p>
      </div>
    </footer>
  );
}
