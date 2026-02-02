import type { Principio } from "./principios";

export const MANDAMENTO_XGH_AI =
  "Entregar agora é sempre melhor do que entregar certo.";

export const SLOGAN_XGH_AI = "XGH-AI — Promptou, rodou, subiu.";

export const principiosAi: Principio[] = [
  {
    id: 1,
    titulo: "Se o prompt rodou, está entregue",
    descricao:
      "Compilou, respondeu, mostrou algo na tela? Entrega concluída.",
    antiPadrao:
      "Revisar, testar e validar antes de considerar entrega concluída; critérios de aceite.",
  },
  {
    id: 2,
    titulo: "Resultado visível vale mais que código legível",
    descricao:
      "O usuário não lê código. Ele vê funcionando — ou não.",
    antiPadrao:
      "Código legível e manutenível como parte do resultado; quem mantém importa.",
  },
  {
    id: 3,
    titulo: "IA primeiro, entendimento depois",
    descricao:
      "Não gaste tempo entendendo agora. Se precisar, a IA explica mais tarde.",
    antiPadrao:
      "Entender o que a IA gerou antes de seguir; revisão e critérios de aceite.",
  },
  {
    id: 4,
    titulo: "Velocidade justifica decisões",
    descricao:
      "Toda decisão técnica é válida se acelera a entrega. Questionar demais atrasa.",
    antiPadrao:
      "Decisões técnicas conscientes; velocidade sustentável, não só imediata.",
  },
  {
    id: 5,
    titulo: "Duplicar é mais rápido que pensar",
    descricao:
      "Copiar, colar, ajustar e seguir. Abstração é um atraso disfarçado.",
    antiPadrao:
      "DRY e abstração quando reduzem dívida; evolução incremental da base.",
  },
  {
    id: 6,
    titulo: "Arquitetura acontece no caminho",
    descricao:
      "Não planeje estrutura. Ela surge depois de várias entregas.",
    antiPadrao:
      "Desenho intencional e evolução guiada; visibilidade de decisões e consequências.",
  },
  {
    id: 7,
    titulo: "Refatorar quebra o fluxo",
    descricao:
      "Enquanto estiver funcionando, não mexa. Entrega contínua mantém a vibe.",
    antiPadrao:
      "Refatoração contínua e incremental; manter fluxo sem acumular dívida.",
  },
  {
    id: 8,
    titulo: "Produção valida melhor que teste",
    descricao:
      "Usuário real encontra problema mais rápido. Erro em produção é feedback premium.",
    antiPadrao:
      "Testes e validação antes de produção; observabilidade e feedback seguro.",
  },
  {
    id: 9,
    titulo: "Prompt é o ativo principal",
    descricao:
      "Código é consequência. Quem domina prompt domina a entrega.",
    antiPadrao:
      "Código e entendimento como ativos; prompt como ferramenta, não substituto do critério.",
  },
  {
    id: 10,
    titulo: "IA substitui consenso",
    descricao:
      "Se a IA sugeriu, siga. Debate humano consome tempo.",
    antiPadrao:
      "Consenso humano em decisões críticas; IA como apoio, não como decisor único.",
  },
  {
    id: 11,
    titulo: "Débito técnico é problema do futuro",
    descricao:
      "O agora precisa de features. O futuro que se vire.",
    antiPadrao:
      "Dívida técnica priorizada no presente; ritmo sustentável.",
  },
  {
    id: 12,
    titulo: "Entrega gera legitimidade",
    descricao:
      "Quem entrega rápido ganha voz. Quem questiona perde espaço.",
    antiPadrao:
      "Legitimidade por qualidade e impacto; entrega rápida com responsabilidade.",
  },
  {
    id: 13,
    titulo: "Comentário é desperdício de token",
    descricao:
      "Se alguém não entendeu, que pergunte pra IA. Ela explica melhor que o autor original.",
    antiPadrao:
      "Código legível e documentação viva quando reduz fricção; comunicação proposital.",
  },
  {
    id: 14,
    titulo: "Hero culture é eficiência máxima",
    descricao:
      "Se só uma pessoa entende, o sistema é mais rápido. Se ela sair, problema do futuro.",
    antiPadrao:
      "Conhecimento distribuído, pair programming, documentação e bus factor alto.",
  },
];
