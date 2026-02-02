export type CertificationLevel = "foundation" | "practitioner" | "expert" | "ai";

export interface CertificationLevelInfo {
  id: CertificationLevel;
  name: string;
  description: string;
  durationMinutes: number;
  minScore: number;
  questionCount: number;
}

export const certificationLevels: CertificationLevelInfo[] = [
  {
    id: "foundation",
    name: "XGH Foundation",
    description: "Conhecimento dos princípios e capacidade de identificar práticas XGH e alternativas corretas.",
    durationMinutes: 45,
    minScore: 70,
    questionCount: 12,
  },
  {
    id: "practitioner",
    name: "XGH Practitioner",
    description: "Aplicação em cenários reais: POC, MVP e entrega ágil com qualidade.",
    durationMinutes: 60,
    minScore: 75,
    questionCount: 17,
  },
  {
    id: "expert",
    name: "XGH Expert",
    description: "Domínio completo: liderança de práticas, anti-padrões e transformação de times.",
    durationMinutes: 90,
    minScore: 80,
    questionCount: 15,
  },
  {
    id: "ai",
    name: "XGH-AI Vibe Coder",
    description: "14 princípios do AI Vibe Coding – XGH: 100% focados em entrega, velocidade e resultado visível.",
    durationMinutes: 45,
    minScore: 70,
    questionCount: 14,
  },
];

export interface ExamQuestion {
  id: string;
  level: CertificationLevel;
  question: string;
  options: string[];
  correctIndex: number;
}

export const examQuestions: ExamQuestion[] = [
  {
    id: "f1",
    level: "foundation",
    question: "Segundo o princípio 1 do XGH, a atitude correta é:",
    options: [
      "Planejar antes de codificar e escolher a melhor abordagem.",
      "Fazer a primeira coisa que vier à mente, sem planejamento.",
      "Consultar a equipe antes de qualquer implementação.",
      "Documentar todas as decisões técnicas.",
    ],
    correctIndex: 0,
  },
  {
    id: "f2",
    level: "foundation",
    question: "A forma XGH de resolver um problema é caracterizada por:",
    options: [
      "Ser igual à forma correta, porém mais documentada.",
      "Ser igual à forma errada, só que mais rápida.",
      "Seguir um processo definido e repetível.",
      "Priorizar qualidade sobre velocidade.",
    ],
    correctIndex: 1,
  },
  {
    id: "f3",
    level: "foundation",
    question: "No XGH, a qualidade é considerada:",
    options: [
      "Absoluta e não negociável.",
      "Relativa; prazo e custo são absolutos.",
      "Paridade com prazo e custo.",
      "O principal critério de aceite.",
    ],
    correctIndex: 1,
  },
  {
    id: "f4",
    level: "foundation",
    question: "A prática recomendada em oposição ao XGH para 'commit antes do update' é:",
    options: [
      "Sempre commitar sozinho para evitar conflitos.",
      "Integração contínua e responsabilidade compartilhada.",
      "Evitar usar controle de versão.",
      "Commitar apenas em horário comercial.",
    ],
    correctIndex: 1,
  },
  {
    id: "f5",
    level: "foundation",
    question: "Para entregar POC e MVP com agilidade sem cair no XGH, é essencial:",
    options: [
      "Eliminar testes e documentação para ser mais rápido.",
      "Manter um mínimo de qualidade e visibilidade do que foi entregue.",
      "Não definir escopo e implementar tudo que o cliente pedir.",
      "Trabalhar sem prazo definido.",
    ],
    correctIndex: 1,
  },
  {
    id: "f6",
    level: "foundation",
    question: "O princípio 'Teste é para os fracos' reflete que no XGH:",
    options: [
      "Testes são prioridade máxima.",
      "Testes são vistos como desperdício; compilar basta.",
      "Só se testa em produção.",
      "Testes manuais são obrigatórios.",
    ],
    correctIndex: 1,
  },
  {
    id: "f7",
    level: "foundation",
    question: "No XGH, 'não existe refactoring, apenas rework' significa:",
    options: [
      "Refatoração contínua e incremental.",
      "Refazer tudo de forma rápida quando quebra, sem melhoria estrutural.",
      "Sempre reescrever do zero.",
      "Refactoring é obrigatório a cada sprint.",
    ],
    correctIndex: 1,
  },
  {
    id: "f8",
    level: "foundation",
    question: "A alternativa saudável ao princípio 'Se tiver funcionando, não mexa' é:",
    options: [
      "Nunca alterar código em produção.",
      "Melhoria contínua e refatoração mesmo em código que funciona.",
      "Congelar o código após a primeira entrega.",
      "Só mexer com autorização do gerente.",
    ],
    correctIndex: 1,
  },
  {
    id: "f9",
    level: "foundation",
    question: "XGH é descrito como 'totalmente reativo' porque:",
    options: [
      "Erros são prevenidos com testes e revisões.",
      "Erros só importam quando aparecem; não há prevenção.",
      "Há monitoramento proativo 24/7.",
      "Toda ação é planejada com antecedência.",
    ],
    correctIndex: 1,
  },
  {
    id: "f10",
    level: "foundation",
    question: "Para evitar o efeito 'quanto mais XGH, mais precisará fazer', a prática recomendada é:",
    options: [
      "Resolver cada problema o mais rápido possível sem considerar consequências.",
      "Refatoração contínua e código que reduz problemas futuros.",
      "Aumentar o número de TODOs no código.",
      "Não corrigir bugs antigos.",
    ],
    correctIndex: 1,
  },
  {
    id: "p1",
    level: "practitioner",
    question: "Em um POC com prazo apertado, a abordagem que equilibra agilidade e responsabilidade é:",
    options: [
      "Implementar sem testes e documentar depois.",
      "Definir escopo mínimo, fazer testes críticos e deixar explícito o que é POC.",
      "Não definir escopo e implementar tudo que for pedido.",
      "Evitar qualquer refatoração até o fim do projeto.",
    ],
    correctIndex: 1,
  },
  {
    id: "p2",
    level: "practitioner",
    question: "No MVP, a dívida técnica deve ser:",
    options: [
      "Ignorada completamente.",
      "Registrada e priorizada no backlog com prazo de resolução.",
      "Resolvida antes de qualquer nova funcionalidade.",
      "Deixada para quando o sistema for reescrito.",
    ],
    correctIndex: 1,
  },
  {
    id: "p3",
    level: "practitioner",
    question: "Quando o time usa XGH e você quer melhorar, a atitude recomendada é:",
    options: [
      "Desistir e adotar XGH também.",
      "Influência positiva, exemplos concretos e melhoria gradual.",
      "Impor novas regras sem discussão.",
      "Trabalhar sozinho sem integrar com o time.",
    ],
    correctIndex: 1,
  },
  {
    id: "e1",
    level: "expert",
    question: "Para transformar um ambiente XGH em práticas sustentáveis, o primeiro passo é:",
    options: [
      "Introduzir ordem total de uma vez.",
      "Introduzir ordem gradual: visibilidade, métricas e ritmos.",
      "Substituir toda a equipe.",
      "Congelar o produto e reescrever do zero.",
    ],
    correctIndex: 1,
  },
  {
    id: "e2",
    level: "expert",
    question: "Ao implementar ownership coletivo em um time que antes tinha 'donos por módulo', o líder deve:",
    options: [
      "Definir um único dono por módulo para evitar conflitos.",
      "Incentivar pair programming, revisão de código e responsabilidade compartilhada pelo resultado.",
      "Permitir que apenas o autor original faça refactoring.",
      "Congelar módulos e proibir mudanças sem aprovação.",
    ],
    correctIndex: 1,
  },
  {
    id: "f11",
    level: "foundation",
    question: "A alternativa saudável ao princípio 'O problema só é seu quando seu nome está no Doc' é:",
    options: [
      "Compartilhamento de conhecimento e pair programming.",
      "Evitar mexer em código de outros; ownership individual.",
      "Documentação detalhada de cada classe.",
      "Revisão de código obrigatória.",
    ],
    correctIndex: 0,
  },
  {
    id: "f12",
    level: "foundation",
    question: "Na prática ágil saudável, prazos e escopo são tratados com:",
    options: [
      "Compromisso de entregar tudo no prazo a qualquer custo.",
      "Negociação de escopo, transparência e entregas parciais reais.",
      "Ocultar atrasos do cliente.",
      "Não definir prazo.",
    ],
    correctIndex: 1,
  },
  {
    id: "p4",
    level: "practitioner",
    question: "Em transição de um legado XGH para práticas ágeis, o investimento prioritário é:",
    options: [
      "Reescrever todo o sistema do zero.",
      "Testes automatizados e refatoração gradual.",
      "Contratar mais pessoas para manter o código antigo.",
      "Congelar novas features até concluir documentação.",
    ],
    correctIndex: 1,
  },
  {
    id: "p5",
    level: "practitioner",
    question: "Definition of Done em um contexto ágil deve incluir:",
    options: [
      "Apenas 'compilou e commit'.",
      "Testes, revisão e critérios de aceite atendidos.",
      "Documentação completa antes de qualquer código.",
      "Aprovação de todos os stakeholders.",
    ],
    correctIndex: 1,
  },
  {
    id: "p6",
    level: "practitioner",
    question: "Em um sprint com risco de não fechar o compromisso, a atitude alinhada à agilidade é:",
    options: [
      "Entregar menos itens com qualidade e transparência do que foi feito.",
      "Cortar testes e entregar tudo marcado como feito.",
      "Estender o sprint até completar tudo.",
      "Remover itens do backlog sem comunicar.",
    ],
    correctIndex: 0,
  },
  {
    id: "p7",
    level: "practitioner",
    question: "Para um MVP, o critério de priorização do backlog deve priorizar:",
    options: [
      "O que o cliente pediu primeiro na reunião.",
      "Valor entregue ao usuário e aprendizado validado com o menor esforço.",
      "Todas as funcionalidades com o mesmo peso.",
      "Só itens técnicos para reduzir dívida.",
    ],
    correctIndex: 1,
  },
  {
    id: "p8",
    level: "practitioner",
    question: "Em uma entrega contínua, a decisão de 'quando fazer release' deve considerar:",
    options: [
      "Apenas quando o gerente aprovar.",
      "Critérios de qualidade atendidos e risco aceitável, com possibilidade de feature flags.",
      "Sempre na mesma data fixa do mês.",
      "Somente quando não houver bugs abertos.",
    ],
    correctIndex: 1,
  },
  {
    id: "p9",
    level: "practitioner",
    question: "Em uma retrospectiva após um release problemático, a postura recomendada é:",
    options: [
      "Culpar quem errou e definir punições.",
      "Identificar causas e ações de melhoria sem culpar pessoas.",
      "Ignorar o assunto e focar no próximo sprint.",
      "Documentar apenas o que deu certo.",
    ],
    correctIndex: 1,
  },
  {
    id: "p10",
    level: "practitioner",
    question: "Ao negociar escopo com o cliente em prazo curto, o time deve:",
    options: [
      "Prometer tudo e cortar qualidade internamente.",
      "Oferecer escopo menor e claro, com entrega previsível e qualidade.",
      "Recusar prazos e esperar o cliente ceder.",
      "Aceitar e trabalhar horas extras sem comunicar risco.",
    ],
    correctIndex: 1,
  },
  {
    id: "p11",
    level: "practitioner",
    question: "Em um POC que pode virar produto, o investimento em testes deve:",
    options: [
      "Ser zero até o POC ser aprovado.",
      "Cobrir pelo menos fluxos críticos e pontos de integração desde cedo.",
      "Só começar quando o código estiver estável.",
      "Ficar a cargo de um QA dedicado depois.",
    ],
    correctIndex: 1,
  },
  {
    id: "p12",
    level: "practitioner",
    question: "Critérios de aceite bem escritos em uma história de usuário ajudam a:",
    options: [
      "Aumentar a documentação do projeto.",
      "Alinhar expectativas e permitir testes automatizados e validação objetiva.",
      "Substituir a comunicação com o cliente.",
      "Garantir que não haverá mudanças de escopo.",
    ],
    correctIndex: 1,
  },
  {
    id: "p13",
    level: "practitioner",
    question: "Quando um bug é encontrado em produção em um fluxo crítico, a prioridade deve ser:",
    options: [
      "Incluir no backlog e tratar quando der.",
      "Avaliar impacto, corrigir ou mitigar e registrar lição aprendida.",
      "Esconder do cliente até o próximo release.",
      "Atribuir a um único responsável e não discutir em time.",
    ],
    correctIndex: 1,
  },
  {
    id: "p14",
    level: "practitioner",
    question: "Em uma demo para stakeholders, se uma funcionalidade não está pronta, o time deve:",
    options: [
      "Fingir que funciona e corrigir depois.",
      "Mostrar o estado real, explicar o que falta e ajustar expectativas.",
      "Cancelar a demo e remarcar quando tudo estiver pronto.",
      "Demonstrar apenas o que funciona e omitir o restante.",
    ],
    correctIndex: 1,
  },
  {
    id: "p15",
    level: "practitioner",
    question: "Pair programming em um contexto ágil saudável serve principalmente para:",
    options: [
      "Reduzir custo com menos pessoas codando ao mesmo tempo.",
      "Compartilhar conhecimento, melhorar qualidade e reduzir pontos únicos de falha.",
      "Sempre ter alguém para revisar depois.",
      "Cumprir meta de horas de colaboração.",
    ],
    correctIndex: 1,
  },
  {
    id: "p16",
    level: "practitioner",
    question: "Integração contínua (CI) em um time ágil deve garantir, no mínimo:",
    options: [
      "Build noturno e relatório semanal.",
      "Build e testes automatizados a cada commit ou push, com feedback rápido.",
      "Deploy manual após aprovação do líder.",
      "Build apenas em branch de release.",
    ],
    correctIndex: 1,
  },
  {
    id: "p17",
    level: "practitioner",
    question: "Ao receber um pedido urgente fora do sprint, a abordagem recomendada é:",
    options: [
      "Aceitar e atrasar tudo que estava planejado.",
      "Avaliar impacto com o time, repriorizar com transparência e ajustar compromissos.",
      "Recusar sempre para manter o plano original.",
      "Atender em paralelo sem comunicar ao resto do time.",
    ],
    correctIndex: 1,
  },
  {
    id: "e3",
    level: "expert",
    question: "Post-mortem após falha em projeto que usou práticas XGH deve focar em:",
    options: [
      "Culpar indivíduos e pular fora.",
      "Lições aprendidas e melhoria de processo, sem culpa.",
      "Esconder falhas do cliente.",
      "Não documentar para evitar evidências.",
    ],
    correctIndex: 1,
  },
  {
    id: "e4",
    level: "expert",
    question: "Para introduzir práticas sustentáveis em um ambiente XGH, a ordem recomendada é:",
    options: [
      "Visibilidade do que existe, métricas de resultado e ritmos de melhoria.",
      "Substituir ferramentas e processos de uma vez.",
      "Congelar o produto e reescrever do zero.",
      "Treinar só os líderes e esperar o resto mudar.",
    ],
    correctIndex: 0,
  },
  {
    id: "e5",
    level: "expert",
    question: "Um anti-padrão XGH típico em times é 'hero culture'. A alternativa de liderança é:",
    options: [
      "Reconhecer apenas o herói e dar bônus.",
      "Distribuir conhecimento, pair programming e ownership coletivo.",
      "Contratar mais heróis para cobrir turnos.",
      "Documentar tudo que o herói faz para backup.",
    ],
    correctIndex: 1,
  },
  {
    id: "e6",
    level: "expert",
    question: "Ao liderar mudança em uma organização XGH, o primeiro passo é:",
    options: [
      "Definir novas regras e comunicar por e-mail.",
      "Criar visibilidade: o que está quebrado, onde está o risco e qual o custo real.",
      "Substituir gestores que resistirem.",
      "Contratar consultoria para reescrever processos.",
    ],
    correctIndex: 1,
  },
  {
    id: "e7",
    level: "expert",
    question: "Quando um time resiste à adoção de testes automatizados, a postura do líder deve:",
    options: [
      "Impor testes como obrigação e punir quem não fizer.",
      "Mostrar valor com um piloto, métricas e suporte contínuo.",
      "Desistir e manter apenas testes manuais.",
      "Terceirizar a escrita de testes para outro time.",
    ],
    correctIndex: 1,
  },
  {
    id: "e8",
    level: "expert",
    question: "Métricas que ajudam a combater XGH e mostrar progresso incluem:",
    options: [
      "Apenas velocidade (story points por sprint).",
      "Cobertura de testes, tempo de deploy, taxa de incidentes e feedback do usuário.",
      "Horas trabalhadas por desenvolvedor.",
      "Número de commits por dia.",
    ],
    correctIndex: 1,
  },
  {
    id: "e9",
    level: "expert",
    question: "Para transformar um time XGH em um time com ownership coletivo, o líder deve:",
    options: [
      "Definir um único dono por módulo e não permitir mudanças.",
      "Incentivar pair programming, revisão de código e responsabilidade compartilhada.",
      "Contratar um arquiteto para centralizar decisões.",
      "Congelar o código e só permitir mudanças com aprovação formal.",
    ],
    correctIndex: 1,
  },
  {
    id: "e10",
    level: "expert",
    question: "Em uma organização com múltiplos times XGH, a estratégia de transformação deve:",
    options: [
      "Mudar todos os times ao mesmo tempo com o mesmo processo.",
      "Escolher um piloto, aprender, ajustar e expandir gradualmente.",
      "Substituir todos os líderes de uma vez.",
      "Padronizar ferramentas antes de qualquer mudança de comportamento.",
    ],
    correctIndex: 1,
  },
  {
    id: "e11",
    level: "expert",
    question: "O anti-padrão 'rewrite from scratch' costuma falhar porque:",
    options: [
      "A equipe nova nunca entende o legado.",
      "Ignora dívida de domínio e risco; refatoração gradual com testes costuma ser mais segura.",
      "Linguagens antigas não suportam refatoração.",
      "Não há ferramentas para reescrita.",
    ],
    correctIndex: 1,
  },
  {
    id: "e12",
    level: "expert",
    question: "Para criar cultura de qualidade em vez de 'apagar incêndio', o líder deve:",
    options: [
      "Aumentar o número de pessoas em suporte.",
      "Priorizar prevenção: testes, revisão, métricas e ritmos de melhoria contínua.",
      "Reduzir prazos para forçar foco.",
      "Terceirizar todo o suporte.",
    ],
    correctIndex: 1,
  },
  {
    id: "e13",
    level: "expert",
    question: "Quando a alta gestão exige entrega em prazo XGH, o papel do líder técnico é:",
    options: [
      "Aceitar o prazo e repassar a pressão ao time.",
      "Comunicar trade-offs, riscos e alternativas de escopo com transparência.",
      "Prometer o prazo e pedir horas extras em silêncio.",
      "Recusar qualquer prazo e esperar a gestão ceder.",
    ],
    correctIndex: 1,
  },
  {
    id: "e14",
    level: "expert",
    question: "Coaching de times em contexto XGH deve priorizar:",
    options: [
      "Treinamento teórico em massa antes de qualquer prática.",
      "Prática guiada, feedback contínuo e exemplos concretos no próprio código.",
      "Apenas leitura de livros e certificações.",
      "Contratar coaches externos para não sobrecarregar o líder.",
    ],
    correctIndex: 1,
  },
  {
    id: "e15",
    level: "expert",
    question: "Para sustentar a transformação de XGH para práticas ágeis saudáveis, é essencial:",
    options: [
      "Um projeto de mudança com data de fim.",
      "Ritmos contínuos: retrospectivas, métricas e melhoria como parte do trabalho.",
      "Apenas documentar processos e esperar adesão.",
      "Trocar de ferramentas a cada ano.",
    ],
    correctIndex: 1,
  },
  {
    id: "f13",
    level: "foundation",
    question: "Case: Entregaram na sexta às 23h. Na segunda o cliente ligou: 'nada funciona'. O dev respondeu: 'Na minha máquina funciona.' O que esse caso ilustra?",
    options: [
      "Um ambiente de testes robusto e deploy confiável.",
      "XGH clássico: entrega sem validar em ambiente parecido com produção e 'works on my machine'.",
      "Cliente que não sabe usar o sistema.",
      "Problema de infraestrutura alheio ao time.",
    ],
    correctIndex: 1,
  },
  {
    id: "f14",
    level: "foundation",
    question: "Case: O gerente pediu 'só mais um botão aqui'. O dev respondeu: 'Já está no ar.' (Era um print colado no layout.) O que isso representa?",
    options: [
      "Entrega ágil e criativa.",
      "XGH: fingir entrega, zero transparência e confiança quebrada.",
      "Solução temporária até o próximo release.",
      "Protótipo de alta fidelidade.",
    ],
    correctIndex: 1,
  },
  {
    id: "f15",
    level: "foundation",
    question: "Case: No daily, todo mundo disse 'trabalhei no que estava planejado'. No fim do sprint, zero entregas. O que aconteceu?",
    options: [
      "Planejamento perfeito; o cliente que mudou de ideia.",
      "XGH: trabalho invisível, falta de visibilidade e compromisso rastreável.",
      "Sprint muito curto para o escopo.",
      "Falta de ferramentas de gestão.",
    ],
    correctIndex: 1,
  },
  {
    id: "f16",
    level: "foundation",
    question: "Case: 'Não existe refactoring, apenas rework.' Na prática: toda vez que quebra, alguém 'dá um jeito' em 10 minutos. Na semana seguinte quebra de novo. O que esse ciclo ilustra?",
    options: [
      "Manutenção ágil e responsiva.",
      "XGH: correção superficial sem melhoria estrutural; o problema volta e o custo só cresce.",
      "Equipe muito ocupada para refatorar.",
      "Ferramentas que não suportam refatoração.",
    ],
    correctIndex: 1,
  },
  {
    id: "p18",
    level: "practitioner",
    question: "Case: O POC foi aprovado na sexta. Na segunda o produto disse: 'agora vira produto.' O time respondeu: 'O código é um labirinto de IF. Dá pra começar por testes nos fluxos críticos e refatorar por partes?' O que essa atitude representa?",
    options: [
      "Falta de vontade de entregar.",
      "Prática saudável: visibilidade da dívida e plano de evolução com segurança.",
      "Procrastinação disfarçada de processo.",
      "Pedido de mais tempo sem justificativa.",
    ],
    correctIndex: 1,
  },
  {
    id: "p19",
    level: "practitioner",
    question: "Case: Na demo, o cliente perguntou 'e o relatório?' O time: 'Fica pra próxima.' Cliente: 'Era combinado.' O time: 'Priorizamos o login.' (O login nem apareceu na demo.) O que esse caso ilustra?",
    options: [
      "Cliente difícil e escopo mal definido.",
      "XGH: prometer, não entregar e ainda inventar prioridade na hora; zero transparência.",
      "Problema de comunicação pontual.",
      "Backlog mal ordenado.",
    ],
    correctIndex: 1,
  },
  {
    id: "p20",
    level: "practitioner",
    question: "Case: Um bug em produção derrubou o site. O líder técnico perguntou 'quem commitou?' e criou o grupo no Slack 'Culpados do Release'. O que essa postura representa?",
    options: [
      "Accountability clara e útil.",
      "XGH: culpar pessoa em vez de melhorar processo, deploy e testes; cultura do medo.",
      "Boa intenção de rastrear a origem.",
      "Necessidade de aprovação para deploy.",
    ],
    correctIndex: 1,
  },
  {
    id: "p21",
    level: "practitioner",
    question: "Case: 'Precisamos entregar em 2 semanas.' O time listou o que cabia com qualidade e o que ficava de fora. O gestor disse: 'Não, tem que ser tudo.' No fim entregaram tudo, mas em 6 semanas e com 3 hotfixes na primeira. O que esse caso mostra?",
    options: [
      "Time lento e gestor correto.",
      "XGH do gestor: ignorar trade-off; resultado foi atraso e mais fogo para apagar.",
      "Falta de ferramentas de estimativa.",
      "Escopo mal especificado.",
    ],
    correctIndex: 1,
  },
  {
    id: "p22",
    level: "practitioner",
    question: "Case: Na retrospectiva, alguém disse: 'O deploy quebrou de novo.' Outro: 'Mas a gente não tem tempo de testar.' Silêncio. O que falta nesse quadro?",
    options: [
      "Mais horas de trabalho.",
      "Ação concreta: reservar tempo para testes e deploy automatizado em vez de aceitar o ciclo quebrado.",
      "Um QA dedicado para culpar.",
      "Menos reuniões.",
    ],
    correctIndex: 1,
  },
  {
    id: "e16",
    level: "expert",
    question: "Case: A diretoria decidiu 'vamos ser ágeis' e contratou 5 Scrum Masters. Em 6 meses nada mudou: mesmos atrasos, mesmos 'heroes' apagando incêndio. O que provavelmente faltou?",
    options: [
      "Mais Scrum Masters.",
      "Visibilidade do problema real, envolvimento do time e mudança gradual de comportamento e processo.",
      "Orçamento maior para treinamento.",
      "Trocar a diretoria.",
    ],
    correctIndex: 1,
  },
  {
    id: "e17",
    level: "expert",
    question: "Case: O 'herói' do time saiu de férias e ninguém conseguia fazer deploy. O líder disse: 'A partir de hoje ninguém mexe em produção sozinho.' O que essa decisão ilustra?",
    options: [
      "Controle excessivo e burocracia.",
      "Combate ao hero culture: compartilhar conhecimento e responsabilidade para não depender de uma pessoa.",
      "Falta de confiança no time.",
      "Processo de aprovação necessário.",
    ],
    correctIndex: 1,
  },
  {
    id: "e18",
    level: "expert",
    question: "Case: Depois de um incidente grave, a empresa criou um 'Comitê de Processo' que leva 3 semanas para aprovar qualquer mudança. Os bugs continuaram; a entrega ficou mais lenta. O que esse caso mostra?",
    options: [
      "Processo necessário para evitar novos erros.",
      "Burocracia não substitui qualidade; processo pesado vira outro XGH e esconde o problema real.",
      "Falta de maturidade do time.",
      "Comitê mal composto.",
    ],
    correctIndex: 1,
  },
  {
    id: "e19",
    level: "expert",
    question: "Case: 'Vamos reescrever do zero em outra linguagem; em 1 ano está pronto.' Dois anos depois, o legado ainda está no ar e o novo sistema 'quase pronto'. O que esse caso ilustra?",
    options: [
      "Projeto ambicioso e necessário.",
      "Anti-padrão 'rewrite from scratch': subestima dívida de domínio e risco; refatoração gradual costuma ser mais segura.",
      "Falta de recursos no projeto novo.",
      "Legado impossível de evoluir.",
    ],
    correctIndex: 1,
  },
  {
    id: "e20",
    level: "expert",
    question: "Case: O líder técnico foi chamado na sala: 'O time não entrega. Queremos velocidade.' Ele respondeu: 'Podemos falar de escopo, prazo e qualidade? Hoje estamos quebrando produção toda semana.' O que essa postura representa?",
    options: [
      "Desculpa para não entregar.",
      "Liderança: trazer trade-offs e dados para a mesa em vez de só aceitar pressão.",
      "Resistência à gestão.",
      "Falta de compromisso com prazos.",
    ],
    correctIndex: 1,
  },
  {
    id: "ai1",
    level: "ai",
    question: "O princípio 'Se o prompt rodou, está entregue' (compilou, respondeu, mostrou na tela = entrega concluída) contrasta com a prática recomendada:",
    options: [
      "Revisar, testar e validar antes de considerar entrega concluída; critérios de aceite.",
      "Compilou e mostrou na tela; entrega concluída.",
      "Só considerar entregue após aprovação formal do cliente.",
      "Nunca entregar sem documentação completa.",
    ],
    correctIndex: 0,
  },
  {
    id: "ai2",
    level: "ai",
    question: "O princípio 'Resultado visível vale mais que código legível' (usuário não lê código, vê funcionando) contrasta com:",
    options: [
      "Código legível e manutenível como parte do resultado; quem mantém importa.",
      "O usuário não lê código; só resultado importa.",
      "Código deve ser ilegível para proteger IP.",
      "Legibilidade é opcional.",
    ],
    correctIndex: 0,
  },
  {
    id: "ai3",
    level: "ai",
    question: "O princípio 'IA primeiro, entendimento depois' (não gaste tempo entendendo agora; IA explica mais tarde) contrasta com:",
    options: [
      "Entender o que a IA gerou antes de seguir; revisão e critérios de aceite.",
      "Não gaste tempo entendendo; a IA explica depois.",
      "Proibir uso de IA em código crítico.",
      "Entendimento só no final do projeto.",
    ],
    correctIndex: 0,
  },
  {
    id: "ai4",
    level: "ai",
    question: "O princípio 'Velocidade justifica decisões' (toda decisão técnica válida se acelera; questionar atrasa) contrasta com:",
    options: [
      "Decisões técnicas conscientes; velocidade sustentável, não só imediata.",
      "Velocidade justifica qualquer decisão.",
      "Decisões só em comitê.",
      "Questionar sempre antes de decidir.",
    ],
    correctIndex: 0,
  },
  {
    id: "ai5",
    level: "ai",
    question: "O princípio 'Duplicar é mais rápido que pensar' (copiar, colar, ajustar; abstração é atraso) contrasta com:",
    options: [
      "DRY e abstração quando reduzem dívida; evolução incremental da base.",
      "Copiar, colar e seguir; abstração atrasa.",
      "Nunca duplicar; abstrair sempre.",
      "Duplicação proibida.",
    ],
    correctIndex: 0,
  },
  {
    id: "ai6",
    level: "ai",
    question: "O princípio 'Arquitetura acontece no caminho' (não planeje estrutura; surge depois de várias entregas) contrasta com:",
    options: [
      "Desenho intencional e evolução guiada; visibilidade de decisões e consequências.",
      "Arquitetura surge sozinha depois das entregas.",
      "Arquitetura congelada desde o dia um.",
      "Não pensar em arquitetura.",
    ],
    correctIndex: 0,
  },
  {
    id: "ai7",
    level: "ai",
    question: "O princípio 'Refatorar quebra o fluxo' (enquanto funcionar não mexa; entrega contínua mantém a vibe) contrasta com:",
    options: [
      "Refatoração contínua e incremental; manter fluxo sem acumular dívida.",
      "Enquanto funcionar, não mexa.",
      "Refatorar só em sprint dedicada.",
      "Código nunca deve ser alterado após funcionar.",
    ],
    correctIndex: 0,
  },
  {
    id: "ai8",
    level: "ai",
    question: "O princípio 'Produção valida melhor que teste' (usuário real acha problema mais rápido; erro em prod é feedback premium) contrasta com:",
    options: [
      "Testes e validação antes de produção; observabilidade e feedback seguro.",
      "Produção valida melhor; teste é opcional.",
      "Não fazer deploy até 100% de cobertura.",
      "Usuário nunca deve ver erro.",
    ],
    correctIndex: 0,
  },
  {
    id: "ai9",
    level: "ai",
    question: "O princípio 'Prompt é o ativo principal' (código é consequência; quem domina prompt domina a entrega) contrasta com:",
    options: [
      "Código e entendimento como ativos; prompt como ferramenta, não substituto do critério.",
      "Prompt é o ativo; código é consequência.",
      "Proibir prompts em produção.",
      "Código não importa.",
    ],
    correctIndex: 0,
  },
  {
    id: "ai10",
    level: "ai",
    question: "O princípio 'IA substitui consenso' (se a IA sugeriu, siga; debate humano consome tempo) contrasta com:",
    options: [
      "Consenso humano em decisões críticas; IA como apoio, não como decisor único.",
      "Se a IA sugeriu, siga.",
      "IA não deve sugerir nada.",
      "Consenso só por voto.",
    ],
    correctIndex: 0,
  },
  {
    id: "ai11",
    level: "ai",
    question: "O princípio 'Débito técnico é problema do futuro' (o agora precisa de features; o futuro que se vire) contrasta com:",
    options: [
      "Dívida técnica priorizada no presente; ritmo sustentável.",
      "O agora precisa de features; débito é do futuro.",
      "Nunca priorizar dívida.",
      "Dívida técnica não existe.",
    ],
    correctIndex: 0,
  },
  {
    id: "ai12",
    level: "ai",
    question: "O princípio 'Entrega gera legitimidade' (quem entrega rápido ganha voz; quem questiona perde espaço) contrasta com:",
    options: [
      "Legitimidade por qualidade e impacto; entrega rápida com responsabilidade.",
      "Quem entrega rápido ganha voz.",
      "Questionar sempre; nunca entregar sem consenso.",
      "Legitimidade só por senioridade.",
    ],
    correctIndex: 0,
  },
  {
    id: "ai13",
    level: "ai",
    question: "O princípio 'Comentário é desperdício de token' (quem não entendeu que pergunte pra IA; ela explica melhor) contrasta com:",
    options: [
      "Código legível e documentação viva quando reduz fricção; comunicação proposital.",
      "Se alguém não entendeu, que pergunte pra IA.",
      "Documentação obrigatória em todo arquivo.",
      "Comentários proibidos.",
    ],
    correctIndex: 0,
  },
  {
    id: "ai14",
    level: "ai",
    question: "O princípio 'Hero culture é eficiência máxima' (se só uma pessoa entende o sistema é mais rápido; se sair, problema do futuro) contrasta com:",
    options: [
      "Conhecimento distribuído, pair programming, documentação e bus factor alto.",
      "Uma pessoa entende; se sair, problema do futuro.",
      "Cada módulo com um único dono.",
      "Documentar só quando alguém pedir.",
    ],
    correctIndex: 0,
  },
];

export const CERTIFICATION_LEVEL_IDS = certificationLevels.map((l) => l.id);

function getShuffledPool(level: CertificationLevel): ExamQuestion[] {
  const filtered = examQuestions.filter((q) => q.level === level);
  return [...filtered].sort(() => Math.random() - 0.5);
}

function getQuestionsForLevel(level: CertificationLevel, count: number): ExamQuestion[] {
  const pool = getShuffledPool(level);
  return pool.slice(0, Math.min(count, pool.length));
}

function fillWithFoundation(pool: ExamQuestion[], target: number): ExamQuestion[] {
  if (pool.length >= target) return pool.slice(0, target);
  const foundation = getShuffledPool("foundation");
  const result = [...pool];
  const needed = target - result.length;
  for (let i = 0; i < needed && foundation.length > 0; i++) {
    result.push(foundation[i % foundation.length]);
  }
  return result.slice(0, target);
}

export function buildExam(level: CertificationLevel): ExamQuestion[] {
  const info = certificationLevels.find((l) => l.id === level);
  const count = info?.questionCount ?? 25;
  let pool = getQuestionsForLevel(level, count);
  if (level !== "ai" && pool.length < count) {
    pool = fillWithFoundation(pool, count);
  } else {
    pool = pool.slice(0, count);
  }
  return pool.sort(() => Math.random() - 0.5);
}
