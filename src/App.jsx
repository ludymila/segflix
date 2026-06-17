import React, { useState, useEffect, useMemo } from 'react';

const THREATS_DATA = [
  // --- CARROSSEL 1: TOP 10 (OWASP Top 10 em termos leigos) ---
  {
    id: 't1',
    rank: 1,
    title: 'Ransomware Corporativo',
    owasp: 'A02:2021 - Falhas Criptográficas',
    shortDesc: 'Sequestro digital de arquivos com cobrança de resgate.',
    desc: 'Imagine que um intruso entra no escritório à noite, tranca todas as gavetas, arquivos e armários com cadeados indestrutíveis e esconde a chave. Ele deixa um bilhete dizendo que só devolverá a chave se você pagar uma fortuna. Isso é o Ransomware no seu computador.',
    howItArrives: 'Principalmente através de e-mails de phishing com anexos falsos (como "Fatura_Vencida.pdf.exe") ou links para sites maliciosos.',
    mission: [
      'Nunca clique em links ou baixe anexos de remetentes suspeitos.',
      'Mantenha sempre o backup dos seus arquivos de trabalho atualizados na nuvem oficial.',
      'Ao notar lentidão extrema ou arquivos mudando de ícone sozinho, desconecte o computador da internet imediatamente.'
    ],
    level: 'Crítico',
    duration: '15 min de leitura',
    year: '2026',
    match: '98% relevante',
    category: 'top10',
    subCategory: 'malware',
    iconGradient: 'from-red-600 to-purple-900',
    bgEmoji: '🏴‍☠️'
  },
  {
    id: 't2',
    rank: 2,
    title: 'Phishing de Credenciais',
    owasp: 'A03:2021 - Injeção / Entrada de Dados',
    shortDesc: 'Páginas falsas idênticas às originais para roubar sua senha.',
    desc: 'É como se alguém montasse uma recepção de mentira idêntica à da nossa empresa bem na calçada externa. Você chega, deixa seu crachá e senha com o recepcionista falso, e ele anota tudo para entrar na empresa de verdade depois.',
    howItArrives: 'E-mails de urgência fingindo ser da equipe de TI ("Sua senha vai expirar em 2 horas! Clique aqui para redefinir").',
    mission: [
      'Sempre verifique o endereço (URL) do site antes de digitar sua senha corporativa.',
      'A equipe de TI nunca solicitará sua senha por e-mail ou chat.',
      'Sempre utilize a Autenticação de Dois Fatores (MFA/2FA) em todas as suas contas.'
    ],
    level: 'Altíssimo',
    duration: '10 min de leitura',
    year: '2026',
    match: '95% relevante',
    category: 'top10',
    subCategory: 'social',
    iconGradient: 'from-orange-600 to-red-900',
    bgEmoji: '🎣'
  },
  {
    id: 't3',
    rank: 3,
    title: 'Vazamento por Falha de Acesso',
    owasp: 'A01:2021 - Quebra de Controle de Acesso',
    shortDesc: 'Acesso não autorizado a relatórios confidenciais expostos.',
    desc: 'É o equivalente a deixar pastas com salários e dados médicos dos funcionários em cima de uma mesa no corredor principal onde qualquer visitante, cliente ou prestador de serviço pode folhear à vontade.',
    howItArrives: 'Compartilhamento inadequado de pastas de rede ou links do Google Drive/OneDrive sem restrição de acesso.',
    mission: [
      'Ao compartilhar links, defina permissões específicas para quem realmente precisa ver o arquivo.',
      'Nunca envie dados confidenciais por canais públicos ou chats abertos.',
      'Revise periodicamente quem tem acesso às suas pastas de trabalho.'
    ],
    level: 'Altíssimo',
    duration: '8 min de leitura',
    year: '2025',
    match: '92% relevante',
    category: 'top10',
    subCategory: 'acesso',
    iconGradient: 'from-amber-600 to-red-800',
    bgEmoji: '🔓'
  },
  {
    id: 't4',
    rank: 4,
    title: 'Invasão por Portas Trancadas por Metade',
    owasp: 'A05:2021 - Configuração Incorreta de Segurança',
    shortDesc: 'Deixar acessos padrões e portas digitais desprotegidas.',
    desc: 'Imagine comprar uma fechadura eletrônica de última geração para a porta da frente, mas deixar a senha padrão configurada como "123456" ou esquecer a janela dos fundos totalmente escancarada.',
    howItArrives: 'Sistemas internos configurados de forma padrão, com usuários e senhas como "admin" ou "1234".',
    mission: [
      'Altere todas as senhas de fábrica de qualquer dispositivo que usar na empresa ou home office.',
      'Desative recursos e portas de conexão que não estão em uso.',
      'Peça ajuda à TI para validar a segurança de novos sistemas antes do uso oficial.'
    ],
    level: 'Alto',
    duration: '12 min de leitura',
    year: '2025',
    match: '89% relevante',
    category: 'top10',
    subCategory: 'config',
    iconGradient: 'from-yellow-600 to-amber-900',
    bgEmoji: '🚪'
  },
  {
    id: 't5',
    rank: 5,
    title: 'Brecha de Softwares Desatualizados',
    owasp: 'A06:2021 - Componentes Vulneráveis e Desatualizados',
    shortDesc: 'Deixar brechas conhecidas abertas por falta de atualizações.',
    desc: 'Pense em uma cerca de segurança que possui um prego solto conhecido por todos os invasores da região. A fabricante envia uma fita de reparo gratuita, mas você decide ignorá-la e o invasor entra exatamente puxando aquele prego.',
    howItArrives: 'Adiar repetidamente as notificações de atualização do sistema operacional (Windows/macOS), navegadores ou aplicativos.',
    mission: [
      'Não adie atualizações de sistema! Programe-as para o final do expediente.',
      'Utilize apenas aplicativos homologados pelo time de TI da empresa.',
      'Reinicie seu computador pelo menos uma vez por semana para garantir as instalações pendentes.'
    ],
    level: 'Alto',
    duration: '9 min de leitura',
    year: '2026',
    match: '87% relevante',
    category: 'top10',
    subCategory: 'system',
    iconGradient: 'from-teal-600 to-blue-900',
    bgEmoji: '🔄'
  },
  {
    id: 't6',
    rank: 6,
    title: 'Sequestro de Sessão (Roubo de Cookies)',
    owasp: 'A07:2021 - Falhas de Identificação e Autenticação',
    shortDesc: 'Invasores que usam seus "crachás temporários" salvos no navegador.',
    desc: 'Quando você entra em um site e clica em "Lembrar de mim", o computador guarda um pequeno papelzinho físico chamado cookie. Se um invasor rouba esse papelzinho, ele consegue entrar na sua conta instantaneamente sem precisar digitar sua senha ou MFA.',
    howItArrives: 'Download de extensões suspeitas para o navegador, ou acesso a sites de pirataria no computador de trabalho.',
    mission: [
      'Evite salvar senhas críticas diretamente nos navegadores; utilize o gerenciador de senhas oficial da empresa.',
      'Sempre limpe os cookies e feche a sessão ao utilizar computadores compartilhados.',
      'Nunca instale extensões de navegador não aprovadas pela TI.'
    ],
    level: 'Alto',
    duration: '11 min de leitura',
    year: '2025',
    match: '84% relevante',
    category: 'top10',
    subCategory: 'acesso',
    iconGradient: 'from-blue-600 to-indigo-950',
    bgEmoji: '🍪'
  },
  {
    id: 't7',
    rank: 7,
    title: 'Ataque de Força Bruta de Senhas',
    owasp: 'A07:2021 - Falha de Autenticação Básica',
    shortDesc: 'Sistemas automatizados testando milhões de senhas por segundo.',
    desc: 'É o equivalente a um ladrão com uma máquina super veloz que consegue testar 10 mil chaves diferentes por segundo no miolo da sua fechadura até encontrar a que abre.',
    howItArrives: 'Uso de senhas curtas, óbvias ("Empresa2026", "Senha123") ou repetidas de sites pessoais que já vazaram na internet.',
    mission: [
      'Crie senhas longas usando frases simples intercaladas com números e símbolos (Ex: "EuAmoCafeComChocolate#2026").',
      'Nunca reutilize a sua senha de uso pessoal em contas do trabalho.',
      'Se receber notificações inesperadas para autorizar logins via MFA, recuse e reporte.'
    ],
    level: 'Moderado',
    duration: '7 min de leitura',
    year: '2026',
    match: '81% relevante',
    category: 'top10',
    subCategory: 'social',
    iconGradient: 'from-indigo-600 to-purple-900',
    bgEmoji: '🔑'
  },
  {
    id: 't8',
    rank: 8,
    title: 'Cavalo de Troia em Pacote "Confiável"',
    owasp: 'A08:2021 - Falhas de Integridade de Software e Dados',
    shortDesc: 'Programas legítimos adulterados na origem para incluir vírus.',
    desc: 'É como pedir água mineral lacrada de uma marca famosa, mas alguém no caminho interceptou o caminhão, injetou veneno na garrafa com uma seringa ultrafina sem danificar o lacre e te entregou.',
    howItArrives: 'Baixar instaladores de fontes não oficiais, atualizadores piratas ou "cracks" de softwares pagos.',
    mission: [
      'Baixe arquivos e softwares apenas dos canais oficiais (Portal de Aplicativos da Empresa, App Store, Microsoft Store).',
      'Desconfie de ofertas "gratuitas" de ferramentas que normalmente são pagas.',
      'Valide com o suporte se aquela ferramenta diferente é permitida antes de instalar.'
    ],
    level: 'Alto',
    duration: '13 min de leitura',
    year: '2025',
    match: '79% relevante',
    category: 'top10',
    subCategory: 'malware',
    iconGradient: 'from-pink-600 to-rose-900',
    bgEmoji: '🐴'
  },
  {
    id: 't9',
    rank: 9,
    title: 'Espionagem Silenciosa (Sem Monitoramento)',
    owasp: 'A09:2021 - Falhas de Registro e Monitoramento de Segurança',
    shortDesc: 'Invasores operando em segredo devido à falta de alarmes.',
    desc: 'Imagine um prédio comercial sem câmeras, sem vigias e sem alarmes de movimento. Um ladrão entra, passa semanas revirando as gavetas de todos os escritórios, escolhendo o que levar, sem que ninguém note nada suspeito.',
    howItArrives: 'Falha em logs de sistema ou ignorar notificações de antivírus desabilitado no computador do usuário.',
    mission: [
      'Nunca desative ou pause o antivírus instalado pela empresa sob nenhuma justificativa.',
      'Reporte imediatamente à TI se notar janelas pretas abrindo e fechando sozinhas na sua tela.',
      'Participe dos treinamentos e simulações para apurar sua visão de detecção.'
    ],
    level: 'Moderado',
    duration: '10 min de leitura',
    year: '2026',
    match: '76% relevante',
    category: 'top10',
    subCategory: 'system',
    iconGradient: 'from-violet-600 to-indigo-950',
    bgEmoji: '🕵️‍♂️'
  },
  {
    id: 't10',
    rank: 10,
    title: 'Redirecionamento Malicioso de Servidor',
    owasp: 'A10:2021 - Server-Side Request Forgery (SSRF)',
    shortDesc: 'Enganar os servidores internos para enviar dados para fora.',
    desc: 'É como convencer o mensageiro oficial da própria empresa a levar um malote cheio de contratos confidenciais diretamente para a sede de uma empresa concorrente, achando que estava entregando para a filial correta.',
    howItArrives: 'Aproveitamento de brechas em sistemas web internos que o usuário comum acessa para gerir o trabalho.',
    mission: [
      'Ao notar que um sistema interno está direcionando para uma URL externa desconhecida, pare a navegação.',
      'Não digite informações confidenciais em páginas que apresentam erros de certificado SSL (ícone de cadeado quebrado).',
      'Informe o suporte técnico caso encontre links quebrados ou estranhos nas ferramentas oficiais.'
    ],
    level: 'Moderado',
    duration: '9 min de leitura',
    year: '2025',
    match: '72% relevante',
    category: 'top10',
    subCategory: 'config',
    iconGradient: 'from-fuchsia-600 to-pink-950',
    bgEmoji: '📡'
  },

  // --- CARROSSEL 2: TENDÊNCIAS: ENGENHARIA SOCIAL ---
  {
    id: 'e1',
    title: 'Smishing (Golpe do SMS Urgente)',
    shortDesc: 'Mensagens de SMS alarmantes que induzem cliques imediatos.',
    desc: 'Um SMS chega dizendo que sua conta bancária foi bloqueada ou que há uma entrega retida. No desespero, você clica no link e insere seus dados bancários ou do trabalho.',
    howItArrives: 'SMS direto no seu celular pessoal ou corporativo contendo links encurtados e ameaças de multas ou cancelamentos.',
    mission: [
      'Nunca tome ações urgentes por mensagens recebidas via SMS ou WhatsApp.',
      'Pesquise nos canais oficiais de comunicação para checar se a informação procede.',
      'Evite clicar em links curtos (como bit.ly ou t.co) recebidos por mensagens móveis.'
    ],
    level: 'Alto',
    duration: '6 min de leitura',
    year: '2026',
    match: '94% relevante',
    category: 'social',
    subCategory: 'social',
    iconGradient: 'from-orange-500 to-amber-700',
    bgEmoji: '📱'
  },
  {
    id: 'e2',
    title: 'Fraude do CEO (Falsa Diretoria)',
    shortDesc: 'Mensagens fingindo ser um executivo pedindo favores rápidos.',
    desc: 'Um contato com a foto do presidente da empresa te chama no WhatsApp dizendo: "Estou em uma reunião secreta e urgente, preciso que você pague este boleto ou envie este relatório agora, sem contar para ninguém".',
    howItArrives: 'Aplicativos de mensagens (WhatsApp/Telegram) ou e-mails externos usando nomes de diretores da empresa com contas pessoais.',
    mission: [
      'Diretores nunca solicitarão transações fora dos canais formais e processos estabelecidos.',
      'Sempre ligue de volta no número corporativo oficial do diretor para confirmar a identidade antes de agir.',
      'Desconfie de pedidos de segredo absoluto sobre tarefas financeiras.'
    ],
    level: 'Crítico',
    duration: '11 min de leitura',
    year: '2026',
    match: '97% relevante',
    category: 'social',
    subCategory: 'social',
    iconGradient: 'from-red-700 to-slate-900',
    bgEmoji: '👔'
  },
  {
    id: 'e3',
    title: 'Vishing (Telefonemas Teatrais)',
    shortDesc: 'Ligação telefônica simulando suporte ou órgãos de segurança.',
    desc: 'Um atendente extremamente educado liga fingindo ser da área de segurança do seu banco ou da TI corporativa, alegando uma invasão na sua conta. Ele pede que você confirme dados ou digite sua senha na chamada.',
    howItArrives: 'Ligações de voz tradicionais (às vezes simulando o número de atendimento real do banco usando técnicas digitais).',
    mission: [
      'Empresas sérias e equipes de TI legítimas nunca perguntam sua senha ou pedem códigos MFA por telefone.',
      'Caso suspeite, desligue imediatamente e retorne a ligação para o canal oficial de atendimento.',
      'Não confirme dados pessoais ou corporativos para quem ligou para você de surpresa.'
    ],
    level: 'Alto',
    duration: '8 min de leitura',
    year: '2025',
    match: '88% relevante',
    category: 'social',
    subCategory: 'social',
    iconGradient: 'from-amber-500 to-yellow-800',
    bgEmoji: '📞'
  },
  {
    id: 'e4',
    title: 'Isca de Brindes e Pesquisas',
    shortDesc: 'Promessas de recompensas ou sorteios para obter informações.',
    desc: 'Uma tela brilhante aparece oferecendo uma cafeteira grátis ou um voucher de almoço se você responder a uma pesquisa rápida sobre a sua rotina de trabalho na empresa e preencher seus dados profissionais.',
    howItArrives: 'Anúncios patrocinados em redes sociais ou e-mails de marketing falsos prometendo vantagens imediatas.',
    mission: [
      'Não existem brindes de graça que exijam dados de login ou informações sobre infraestrutura de TI.',
      'Nunca responda pesquisas externas de mercado com dados detalhados da sua rotina profissional.',
      'Não compartilhe postagens corporativas em troca de cupons ou participações individuais em sorteios informais.'
    ],
    level: 'Moderado',
    duration: '5 min de leitura',
    year: '2025',
    match: '82% relevante',
    category: 'social',
    subCategory: 'social',
    iconGradient: 'from-yellow-500 to-orange-800',
    bgEmoji: '🎁'
  },

  // --- CARROSSEL 3: INVASÕES SILENCIOSAS ---
  {
    id: 's1',
    title: 'Adware Intrusivo de Navegador',
    shortDesc: 'Extensões e pop-ups que monitoram seu comportamento na web.',
    desc: 'É como ter um panfleteiro chato te seguindo pela loja, empurrando anúncios indesejados na sua cara e, de quebra, anotando cada corredor que você visita para vender essas informações para outras empresas.',
    howItArrives: 'Instalação silenciosa ao baixar programas gratuitos utilitários na internet ou aceitar notificações em sites não confiáveis.',
    mission: [
      'Nunca clique em "Permitir Notificações" em sites que você não conhece.',
      'Bloqueie anúncios pop-up nas configurações de segurança do seu navegador.',
      'Se notar que sua página inicial de pesquisa mudou do nada, avise o suporte.'
    ],
    level: 'Baixo',
    duration: '5 min de leitura',
    year: '2025',
    match: '70% relevante',
    category: 'silencioso',
    subCategory: 'malware',
    iconGradient: 'from-emerald-600 to-teal-900',
    bgEmoji: '📢'
  },
  {
    id: 's2',
    title: 'Keylogger (Gravador de Digitação)',
    shortDesc: 'Vírus invisível que registra cada tecla que você digita.',
    desc: 'Imagine um escrivão invisível sentado no seu ombro, anotando em um caderninho absolutamente tudo o que você escreve no teclado (incluindo senhas, conversas íntimas e números de cartão) e enviando folhas para um criminoso.',
    howItArrives: 'Através de cavalos de troia escondidos em downloads ou anexos de e-mail maliciosos.',
    mission: [
      'Mantenha o antivírus oficial sempre atualizado e ativo no seu computador.',
      'Utilize o teclado virtual fornecido pelos sites de bancos para transações sensíveis.',
      'Evite digitar dados extremamente críticos em computadores que não sejam da sua total confiança.'
    ],
    level: 'Crítico',
    duration: '10 min de leitura',
    year: '2026',
    match: '93% relevante',
    category: 'silencioso',
    subCategory: 'malware',
    iconGradient: 'from-rose-700 to-red-950',
    bgEmoji: '⌨️'
  },
  {
    id: 's3',
    title: 'USB Premiado (Engenharia Física)',
    shortDesc: 'Pendrives ou cabos "perdidos" que instalam vírus ao plugar.',
    desc: 'Você encontra um pendrive de marca famosa jogado no estacionamento da empresa escrito "Confidencial - Salários". Curioso, você o pluga no seu computador corporativo para ver o que tem dentro. Pronto, a invasão foi concluída.',
    howItArrives: 'Dispositivos de armazenamento deixados propositalmente em locais públicos para despertar a curiosidade de colaboradores.',
    mission: [
      'Nunca conecte pendrives, celulares ou cabos desconhecidos em máquinas da empresa.',
      'Se achar algum dispositivo de armazenamento perdido, entregue diretamente para a equipe de recepção ou TI.',
      'Utilize apenas mídias físicas fornecidas e validadas pelo seu departamento de tecnologia.'
    ],
    level: 'Crítico',
    duration: '7 min de leitura',
    year: '2026',
    match: '91% relevante',
    category: 'silencioso',
    subCategory: 'malware',
    iconGradient: 'from-purple-700 to-pink-900',
    bgEmoji: '💾'
  },
  {
    id: 's4',
    title: 'Wi-Fi Público Armadilha',
    shortDesc: 'Redes sem fio gratuitas criadas para roubar dados de tráfego.',
    desc: 'É como conversar sobre segredos industriais em uma sala cheia de microfones escondidos. O dono do Wi-Fi falso (ex: "Wi-Fi_Aeroporto_Gratis") consegue registrar tudo que transita pelo ar se seu tráfego não estiver protegido.',
    howItArrives: 'Acesso a redes Wi-Fi abertas e sem senha em cafés, aeroportos ou hotéis usando aparelhos do trabalho.',
    mission: [
      'Sempre ative a VPN corporativa ao utilizar redes de internet fora do escritório ou da sua casa.',
      'Evite acessar sistemas financeiros ou confidenciais se estiver em conexões compartilhadas sem proteção.',
      'Configure seu celular ou notebook para não conectar automaticamente em redes públicas.'
    ],
    level: 'Alto',
    duration: '9 min de leitura',
    year: '2025',
    match: '86% relevante',
    category: 'silencioso',
    subCategory: 'acesso',
    iconGradient: 'from-sky-600 to-indigo-950',
    bgEmoji: '📶'
  }
];

const PREVENTION_GUIDES = [
  {
    id: 'g1',
    title: 'O Escudo do MFA',
    type: 'Guia Interativo',
    duration: '5 min',
    desc: 'Aprenda por que o segundo fator de autenticação é a melhor defesa contra ataques de senhas roubadas.',
    points: ['MFA reduz em até 99% a chance de invasão de contas', 'O código muda a cada 30 segundos', 'Nunca compartilhe o código de autenticação com terceiros']
  },
  {
    id: 'g2',
    title: 'Desvendando E-mails Suspeitos',
    type: 'Infográfico Rápido',
    duration: '7 min',
    desc: 'O passo a passo para escanear a estrutura de um e-mail falso sem colocar a empresa em risco.',
    points: ['Cheque o domínio após o @ do remetente', 'Desconfie de senso de urgência extrema', 'Passe o mouse por cima do link (sem clicar) para ver o endereço real']
  },
  {
    id: 'g3',
    title: 'Limpeza Digital Completa',
    type: 'Checklist Prático',
    duration: '4 min',
    desc: 'Como manter seu ambiente de trabalho digital limpo de arquivos obsoletos e vulnerabilidades comuns.',
    points: ['Limpe a pasta de Downloads toda semana', 'Não deixe senhas anotadas em post-its colados na tela', 'Bloqueie a tela do computador (Win + L) sempre que levantar']
  }
];

const QUIZ_QUESTIONS = [
  {
    q: "Qual o principal objetivo de um ataque de Ransomware Corporativo?",
    options: [
      "Limpar arquivos desnecessários para liberar espaço em disco.",
      "Criptografar arquivos corporativos e cobrar um resgate para liberar a chave.",
      "Mudar o plano de fundo do computador para um meme inofensivo.",
      "Enviar propagandas automáticas pelo chat corporativo."
    ],
    ans: 1,
    tip: "O Ransomware atua como um sequestrador digital, criptografando os arquivos e cobrando resgate para devolver a chave de descriptografia."
  },
  {
    q: "Como o Phishing de Credenciais costuma se disfarçar para roubar seus dados?",
    options: [
      "Como um erro oficial do processador físico do computador.",
      "Como um e-mail urgente fingindo ser de bancos, TI ou diretoria contendo links enganosos.",
      "Apenas como anúncios promocionais de grandes marcas nas redes sociais.",
      "Como uma mensagem SMS de operadora oferecendo bônus de internet."
    ],
    ans: 1,
    tip: "E-mails alarmantes ou com senso de urgência forçado sobre redefinições de senha são as formas mais tradicionais de Phishing."
  },
  {
    q: "Qual informação o time oficial de TI ou suporte NUNCA solicitará para você?",
    options: [
      "Que você reinicie o computador após as atualizações de segurança.",
      "A confirmação do seu ramal ou setor de trabalho.",
      "A sua senha pessoal corporativa ou códigos temporários do aplicativo MFA.",
      "Sua presença em treinamentos programados de conscientização."
    ],
    ans: 2,
    tip: "A equipe de suporte nunca pedirá sua senha ou códigos de segurança. Elas são secretas e intransferíveis."
  },
  {
    q: "Você encontrou um pendrive no estacionamento da empresa. Qual a conduta correta?",
    options: [
      "Colocar no computador corporativo e abrir os arquivos para identificar o dono.",
      "Levar para casa e formatar em um computador pessoal sem testar.",
      "Entregar diretamente ao time de TI ou recepção sem conectá-lo a nenhuma máquina.",
      "Ignorar e jogar na lixeira comum corporativa."
    ],
    ans: 2,
    tip: "Dispositivos USB misteriosos podem carregar arquivos maliciosos de execução automática instantânea que infectam a rede corporativa."
  },
  {
    q: "O que o ranking internacional OWASP Top 10 mapeia na cibersegurança?",
    options: [
      "As 10 senhas mais fortes recomendadas pela diretoria executiva.",
      "As 10 falhas e vulnerabilidades de software mais críticas e exploradas globalmente.",
      "As 10 melhores ferramentas de produtividade para uso diário.",
      "Os 10 antivírus mais eficientes do mercado atual."
    ],
    ans: 1,
    tip: "O OWASP Top 10 é uma lista de referência que elenca as maiores brechas em aplicações web exploradas por atacantes."
  },
  {
    q: "Como atua um ataque de 'Força Bruta'?",
    options: [
      "Invasores tentando derrubar servidores com ataques físicos à central de dados.",
      "Testando de forma automatizada milhões de combinações de senhas comuns por segundo.",
      "Obrigar o usuário a revelar a senha através de ameaças diretas por e-mail.",
      "Infectar roteadores para interromper a conexão via cabo."
    ],
    ans: 1,
    tip: "A força bruta usa robôs velozes que adivinham senhas curtas, previsíveis ou comuns. Por isso, crie senhas longas."
  },
  {
    q: "Qual o risco real de manter 'cookies' salvos no navegador sem higienização?",
    options: [
      "Danificar o hardware de armazenamento e memória do notebook.",
      "Invasores interceptarem ou roubarem estes cookies para clonar sua sessão ativa sem precisar digitar senha.",
      "Impedir que novos arquivos em formato PDF sejam abertos.",
      "Apagar automaticamente o histórico de e-mails da caixa de entrada."
    ],
    ans: 1,
    tip: "Cookies salvam credenciais ativas. Ataques de Infostealer miram cookies para roubar sessões de login e contornar até o MFA."
  },
  {
    q: "Qual o principal cuidado ao utilizar redes Wi-Fi públicas ou de aeroportos?",
    options: [
      "Não navegar por mais de 30 minutos contínuos.",
      "Ativar o Bluetooth e o compartilhamento de arquivos com a vizinhança.",
      "Conectar-se imediatamente à VPN corporativa para trafegar dados com criptografia.",
      "Utilizar apenas o navegador padrão que já vem pré-instalado de fábrica."
    ],
    ans: 2,
    tip: "Redes públicas desprotegidas facilitam a interceptação de dados. A VPN corporativa envelopa todo o seu tráfego de maneira legível apenas para você."
  },
  {
    q: "O que é 'Smishing'?",
    options: [
      "Um vírus escondido em planilhas eletrônicas complexas de contabilidade.",
      "Um ataque de engenharia social direcionado exclusivamente via SMS ou mensagens de WhatsApp.",
      "O envio massivo de e-mails de marketing autorizados pela empresa.",
      "O ato de desligar intencionalmente as proteções de antivírus locais."
    ],
    ans: 1,
    tip: "O Smishing usa o SMS/WhatsApp como canal primário para espalhar falsos alertas urgentes de faturamento, pacotes retidos ou cancelamentos de contas."
  },
  {
    q: "Se um e-mail urgente em nome da diretoria solicita um pix ou ação financeira sigilosa fora do processo oficial, você deve:",
    options: [
      "Realizar a operação o mais rápido possível para evitar demissões ou atritos.",
      "Encaminhar para o e-mail pessoal para processar depois do horário de expediente.",
      "Ignorar o e-mail e não avisar ninguém do time corporativo.",
      "Entrar em contato via ramal ou telefone corporativo conhecido da diretoria para autenticar a solicitação."
    ],
    ans: 3,
    tip: "A fraude do CEO usa de pressões psicológicas para simular autoridade de diretores e solicitar depósitos fraudulentos."
  }
];

const getLevelBadge = (level) => {
  switch (level) {
    case 'Crítico':
      return 'bg-red-600 text-white font-bold';
    case 'Altíssimo':
      return 'bg-orange-600 text-white font-semibold';
    case 'Alto':
      return 'bg-amber-600 text-white font-semibold';
    case 'Moderado':
      return 'bg-yellow-600 text-black font-semibold';
    default:
      return 'bg-emerald-600 text-white font-semibold';
  }
};

const getPartialBadgeInfo = (count) => {
  if (count >= 13) {
    return { title: 'Selo de Ouro', desc: 'Defensor Avançado', color: 'text-amber-500 border-amber-500/30 bg-amber-500/5', icon: '🥇' };
  }
  if (count >= 6) {
    return { title: 'Selo de Prata', desc: 'Guardião Atento', color: 'text-zinc-300 border-zinc-400/30 bg-zinc-300/5', icon: '🥈' };
  }
  return { title: 'Selo de Bronze', desc: 'Protetor Iniciante', color: 'text-orange-500 border-orange-500/30 bg-orange-500/5', icon: '🥉' };
};

export default function App() {
  // --- ESTADOS GLOBAIS ---
  const [profileSelected, setProfileSelected] = useState(false);
  const [userProfile, setUserProfile] = useState({ name: 'Colaborador Safe', avatarColor: 'bg-red-600' });
  const [activeTab, setActiveTab] = useState('inicio'); // inicio, ameacas, guias, lista, concluidos
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [myList, setMyList] = useState([]);
  const [completedThreats, setCompletedThreats] = useState([]); // Lista de Ids de ameaças concluídas
  const [completedMissions, setCompletedMissions] = useState({}); // Controla progresso das missões no modal
  const [scrolled, setScrolled] = useState(false);
  const [customNotification, setCustomNotification] = useState(null); // Toast customizado de 5 segundos
  const [showCertificate, setShowCertificate] = useState(false); // Modal certificado completo
  const [showPartialCertificate, setShowPartialCertificate] = useState(false); // Modal certificado parcial

  // --- ESTADOS DO QUIZ INTERATIVO ---
  const [quizActive, setQuizActive] = useState(false);
  const [quizCurrentIndex, setQuizCurrentIndex] = useState(0);
  const [quizSelectedAnswer, setQuizSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (selectedThreat || showCertificate || showPartialCertificate) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedThreat, showCertificate, showPartialCertificate]);

  useEffect(() => {
    if (customNotification) {
      const timer = setTimeout(() => {
        setCustomNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [customNotification]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (selectedThreat) {
      if (completedThreats.includes(selectedThreat.id)) {
        const prefilled = {};
        selectedThreat.mission.forEach((_, idx) => {
          prefilled[idx] = true;
        });
        setCompletedMissions(prefilled);
      } else {
        setCompletedMissions({});
      }
    }
  }, [selectedThreat, completedThreats]);

  const filteredThreats = useMemo(() => {
    if (!searchQuery) return THREATS_DATA;
    return THREATS_DATA.filter(threat => 
      threat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (threat.owasp && threat.owasp.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const threatsToDisplay = useMemo(() => {
    if (activeTab === 'lista') {
      return filteredThreats.filter(t => myList.includes(t.id));
    }
    if (activeTab === 'concluidos') {
      return filteredThreats.filter(t => completedThreats.includes(t.id));
    }
    if (activeTab === 'ameacas') {
      return filteredThreats.filter(t => t.category === 'top10');
    }
    return filteredThreats;
  }, [activeTab, filteredThreats, myList, completedThreats]);

  const isAllCompleted = useMemo(() => {
    return completedThreats.length === THREATS_DATA.length;
  }, [completedThreats]);

  const allMissionsChecked = useMemo(() => {
    if (!selectedThreat) return false;
    return selectedThreat.mission.every((_, idx) => !!completedMissions[idx]);
  }, [selectedThreat, completedMissions]);

  const handleDownloadPDF = (guide) => {
    const sanitize = (text) => text.replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    const title = sanitize(guide.title);
    const desc = sanitize(guide.desc);
    
    const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 595 842] /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 500 >>
stream
BT
/F1 18 Tf
50 780 Td
(SegFlix Security Awareness) Tj
/F1 12 Tf
0 -35 Td
(Guia de Prevencion Corporativa e Pratica) Tj
/F1 14 Tf
0 -45 Td
(${title}) Tj
/F1 10 Tf
0 -30 Td
(Descricao do Tema:) Tj
0 -20 Td
(${desc}) Tj
0 -45 Td
(Principais Diretrizes de Comportamento Seguro:) Tj
0 -25 Td
(1. ${sanitize(guide.points[0] || '')}) Tj
0 -20 Td
(2. ${sanitize(guide.points[1] || '')}) Tj
0 -20 Td
(3. ${sanitize(guide.points[2] || '')}) Tj
0 -60 Td
(Equipe de Seguranca da Informacao - SegFlix. Contato: seg@empresa.com) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000242 00000 n 
0000000311 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
760
%%EOF`;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SegFlix_Manual_${guide.title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCustomNotification(`Manual "${guide.title}" baixado com sucesso!`);
  };

  const toggleMyList = (id) => {
    if (myList.includes(id)) {
      setMyList(myList.filter(item => item !== id));
      setCustomNotification('Título removido da sua lista de aprendizado.');
    } else {
      setMyList([...myList, id]);
      setCustomNotification('Título adicionado à sua lista de aprendizado!');
    }
  };

  const handleCompleteStudy = (threatId) => {
    if (!completedThreats.includes(threatId)) {
      const nextCompleted = [...completedThreats, threatId];
      setCompletedThreats(nextCompleted);
      
      if (nextCompleted.length === THREATS_DATA.length) {
        setCustomNotification(`👑 INCRÍVEL! Você completou todos os cursos! Emita seu Certificado Completo na aba Concluídos.`);
      } else {
        setCustomNotification(`🏆 Concluído! Você absorveu as lições de "${THREATS_DATA.find(t => t.id === threatId)?.title}"!`);
      }
    }
  };

  if (!profileSelected) {
    return (
      <div className="min-h-screen bg-[#141414] text-white flex flex-col justify-center items-center p-4">
        <h1 className="text-red-600 text-4xl md:text-5xl font-bold tracking-wider mb-12 animate-pulse">SEGFLIX</h1>
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 text-gray-200">Quem está protegendo a empresa hoje?</h2>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12">
            <button 
              onClick={() => {
                setUserProfile({ name: 'Colaborador Vigilante', avatarColor: 'bg-red-600' });
                setProfileSelected(true);
                setCustomNotification('Bem-vindo ao SegFlix! Sua jornada de conscientização iniciou.');
              }}
              className="group focus:outline-none"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-md overflow-hidden bg-red-600 border-4 border-transparent group-hover:border-white transition-all duration-300 flex items-center justify-center relative shadow-lg">
                <span className="text-5xl md:text-6xl text-white select-none">🛡️</span>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>
              <p className="mt-4 text-gray-400 group-hover:text-white transition-colors duration-200 font-medium text-base md:text-lg">
                Colaborador Vigilante
              </p>
            </button>

            <button 
              onClick={() => {
                setUserProfile({ name: 'Novato Curioso', avatarColor: 'bg-indigo-600' });
                setProfileSelected(true);
                setCustomNotification('Olá! Prepare-se para dominar as defesas digitais.');
              }}
              className="group focus:outline-none"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-md overflow-hidden bg-indigo-600 border-4 border-transparent group-hover:border-white transition-all duration-300 flex items-center justify-center relative shadow-lg">
                <span className="text-5xl md:text-6xl text-white select-none">👀</span>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>
              <p className="mt-4 text-gray-400 group-hover:text-white transition-colors duration-200 font-medium text-base md:text-lg">
                Novato Curioso
              </p>
            </button>

            <button 
              onClick={() => {
                setUserProfile({ name: 'TI Especialista', avatarColor: 'bg-emerald-600' });
                setProfileSelected(true);
                setCustomNotification('Acesso técnico habilitado para proteção avançada.');
              }}
              className="group focus:outline-none"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-md overflow-hidden bg-emerald-600 border-4 border-transparent group-hover:border-white transition-all duration-300 flex items-center justify-center relative shadow-lg">
                <span className="text-5xl md:text-6xl text-white select-none">🤖</span>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>
              <p className="mt-4 text-gray-400 group-hover:text-white transition-colors duration-200 font-medium text-base md:text-lg">
                Defesa da TI
              </p>
            </button>
          </div>

          <button className="px-6 py-2 border border-gray-500 text-gray-500 hover:border-white hover:text-white transition-all duration-200 uppercase tracking-widest text-sm rounded">
            Gerenciar Perfis
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white font-sans antialiased selection:bg-red-600 selection:text-white pb-24 overflow-x-hidden">
      
      {/* 1. NAVBAR FIXA */}
      <nav className={`fixed top-0 w-full z-50 transition-colors duration-500 ${scrolled ? 'bg-[#141414]/95 shadow-md backdrop-blur-md border-b border-zinc-800/50' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
        <div className="max-w-[1920px] mx-auto px-4 md:px-12 py-4 flex items-center justify-between">
          
          <div className="flex items-center gap-4 md:gap-10">
            <button 
              onClick={() => { setActiveTab('inicio'); setSearchQuery(''); }}
              className="text-red-600 font-extrabold text-2xl md:text-3xl tracking-widest hover:scale-105 transition-transform"
            >
              SEGFLIX
            </button>
            
            <div className="hidden lg:flex items-center gap-6 text-sm text-gray-300">
              <button 
                onClick={() => { setActiveTab('inicio'); setSearchQuery(''); }}
                className={`hover:text-white transition-colors py-2 px-1 ${activeTab === 'inicio' ? 'text-white font-bold border-b-2 border-red-600' : ''}`}
              >
                Início
              </button>
              <button 
                onClick={() => { setActiveTab('ameacas'); setSearchQuery(''); }}
                className={`hover:text-white transition-colors py-2 px-1 ${activeTab === 'ameacas' ? 'text-white font-bold border-b-2 border-red-600' : ''}`}
              >
                Ameaças Críticas (OWASP)
              </button>
              <button 
                onClick={() => { setActiveTab('guias'); setSearchQuery(''); }}
                className={`hover:text-white transition-colors py-2 px-1 ${activeTab === 'guias' ? 'text-white font-bold border-b-2 border-red-600' : ''}`}
              >
                Guias de Prevenção
              </button>
              <button 
                onClick={() => { setActiveTab('lista'); setSearchQuery(''); }}
                className={`hover:text-white transition-colors py-2 px-1 ${activeTab === 'lista' ? 'text-white font-bold border-b-2 border-red-600' : ''}`}
              >
                Minha Lista 
                {myList.length > 0 && (
                  <span className="ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    {myList.length}
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => { setActiveTab('concluidos'); setSearchQuery(''); }}
                className={`hover:text-white transition-colors py-2 px-1 flex items-center gap-1.5 ${activeTab === 'concluidos' ? 'text-white font-bold border-b-2 border-red-600' : ''}`}
              >
                Concluídos
                <span className={`h-2 w-2 rounded-full ${completedThreats.length > 0 ? 'bg-emerald-500 animate-ping' : 'bg-zinc-600'}`} />
                {completedThreats.length > 0 && (
                  <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full font-bold font-mono">
                    {completedThreats.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400 pointer-events-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Buscar ameaça..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-900/80 text-white placeholder-gray-500 pl-10 pr-4 py-1.5 rounded-full border border-transparent focus:border-red-600 focus:outline-none w-36 md:w-60 text-sm transition-all focus:bg-zinc-950"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="relative group cursor-pointer hidden md:block">
              <svg className="w-6 h-6 text-gray-300 hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-600 text-[10px] text-white font-bold h-4 w-4 flex items-center justify-center rounded-full">
                1
              </span>
              
              <div className="absolute right-0 mt-3 w-80 bg-zinc-950 border border-zinc-800 rounded shadow-xl py-4 px-4 hidden group-hover:block z-50">
                <h4 className="font-bold border-b border-zinc-800 pb-2 mb-2 text-sm text-red-500">🔥 ALERTA DE SEGURANÇA</h4>
                <p className="text-xs text-gray-300 leading-relaxed mb-2">Simulado de engenharia social ativo. Proteja sua conta e não informe senhas corporativas por canais não oficiais.</p>
                <button 
                  onClick={() => {
                    const findPhishing = THREATS_DATA.find(t => t.id === 't2');
                    if (findPhishing) setSelectedThreat(findPhishing);
                  }}
                  className="text-xs text-red-400 hover:underline font-medium"
                >
                  Ver lição de phishing &rarr;
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 group relative">
              <div className={`w-8 h-8 rounded ${userProfile.avatarColor} flex items-center justify-center text-sm font-bold shadow`}>
                🛡️
              </div>
              <span className="text-xs text-gray-400 hidden sm:inline select-none max-w-[120px] truncate">{userProfile.name}</span>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>

              <div className="absolute right-0 top-full pt-2 w-48 hidden group-hover:block z-50">
                <div className="bg-zinc-950 border border-zinc-800 rounded p-2 shadow-2xl">
                  <button 
                    onClick={() => {
                      setCompletedThreats(THREATS_DATA.map(t => t.id));
                      setCustomNotification('Simulação: Todos os 18 cursos foram marcados como concluídos!');
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-amber-400 hover:bg-zinc-900 rounded font-bold"
                  >
                    ⚡ Simular Conclusão de Tudo
                  </button>
                  <button 
                    onClick={() => setProfileSelected(false)}
                    className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:bg-zinc-900 hover:text-white rounded"
                  >
                    Trocar de Perfil
                  </button>
                  <button 
                    onClick={() => { 
                      setMyList([]); 
                      setCompletedThreats([]); 
                      setCustomNotification('Sua trilha e estudos de segurança foram reiniciados!'); 
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:bg-zinc-900 hover:text-red-400 rounded"
                  >
                    Limpar Progresso
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Abas Mobile */}
        <div className="lg:hidden flex justify-around border-t border-zinc-800/80 bg-[#141414]/95 py-2.5 text-[10px] text-gray-400">
          <button 
            onClick={() => { setActiveTab('inicio'); setSearchQuery(''); }}
            className={`px-3 py-1 font-semibold ${activeTab === 'inicio' ? 'text-white font-bold border-b border-red-600' : ''}`}
          >
            Início
          </button>
          <button 
            onClick={() => { setActiveTab('ameacas'); setSearchQuery(''); }}
            className={`px-3 py-1 font-semibold ${activeTab === 'ameacas' ? 'text-white font-bold border-b border-red-600' : ''}`}
          >
            Ameaças
          </button>
          <button 
            onClick={() => { setActiveTab('guias'); setSearchQuery(''); }}
            className={`px-3 py-1 font-semibold ${activeTab === 'guias' ? 'text-white font-bold border-b border-red-600' : ''}`}
          >
            Prevenção
          </button>
          <button 
            onClick={() => { setActiveTab('lista'); setSearchQuery(''); }}
            className={`px-3 py-1 font-semibold ${activeTab === 'lista' ? 'text-white font-bold border-b border-red-600' : ''}`}
          >
            Lista ({myList.length})
          </button>
          <button 
            onClick={() => { setActiveTab('concluidos'); setSearchQuery(''); }}
            className={`px-3 py-1 flex items-center gap-1 font-semibold ${activeTab === 'concluidos' ? 'text-emerald-400 font-bold border-b border-emerald-500' : ''}`}
          >
            Concluídos ({completedThreats.length})
          </button>
        </div>
      </nav>

      {/* --- STREAMING_CHUNK: Deciding between standard hero template or catalogs... --- */}
      {searchQuery || (activeTab !== 'guias' && activeTab !== 'concluidos') ? (
        <>
          {/* 2. HERO BANNER PRINCIPAL */}
          {!searchQuery && activeTab === 'inicio' && (
            <div className="relative w-full h-[65vh] md:h-[85vh] flex items-center justify-start overflow-hidden bg-black">
              
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/70 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30 z-10" />
                <div className="w-full h-full bg-gradient-to-br from-red-950/40 via-zinc-950 to-zinc-950 flex justify-center items-center relative overflow-hidden">
                  
                  <div className="absolute inset-0 opacity-10 flex flex-wrap gap-4 text-xs font-mono p-4 select-none pointer-events-none">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <span key={i} className="text-red-500">
                        DECRYPT_KEY_REQUIRED_ERROR: 0x80070005 SYSTEM_LOCKED_BY_CYBER_THREAT_SEGFLIX_FATAL_RECOVERY
                      </span>
                    ))}
                  </div>
                  <div className="text-[120px] md:text-[220px] filter blur-sm opacity-25 select-none animate-pulse">
                    🏴‍☠️
                  </div>
                  <div className="absolute border border-red-600/30 w-[400px] h-[400px] rounded-full animate-ping opacity-15" />
                </div>
              </div>

              <div className="relative z-20 max-w-[1920px] w-full mx-auto px-4 md:px-12 flex flex-col items-start gap-4 md:gap-6">
                
                <div className="flex items-center gap-2 bg-zinc-900/90 border border-red-600/40 px-3 py-1 rounded text-xs md:text-sm text-red-500 font-bold tracking-widest uppercase">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block" />
                  EM DESTAQUE HOJE
                </div>

                <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight max-w-xl md:max-w-2xl leading-none uppercase text-white drop-shadow-md">
                  Ransomware <span className="text-red-600 font-black block">Corporativo</span>
                </h1>

                <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-semibold">
                  <span className="text-green-500">98% Recomendado</span>
                  <span className="text-gray-400 font-semibold">2026</span>
                  <span className="bg-red-600/20 text-red-500 border border-red-600/40 px-1.5 py-0.5 rounded text-xs font-black">CRÍTICO</span>
                  {completedThreats.includes('t1') && (
                    <span className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 px-1.5 py-0.5 rounded text-xs font-black flex items-center gap-1">
                      ✓ CONCLUÍDO
                    </span>
                  )}
                  <span className="text-gray-300">OWASP A02</span>
                </div>

                <p className="text-sm md:text-lg text-gray-300 max-w-lg leading-relaxed drop-shadow">
                  O pior pesadelo do mundo digital corporativo. Sequestradores cibernéticos bloqueiam e criptografam todos os computadores da empresa inteira e exigem resgates absurdos. Saiba como identificar as portas de entrada e neutralizá-las.
                </p>

                <div className="flex flex-wrap gap-3 md:gap-4 mt-2">
                  <button 
                    onClick={() => setSelectedThreat(THREATS_DATA[0])}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold py-3 px-6 rounded text-sm md:text-base transition-all shadow-lg cursor-pointer"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                    </svg>
                    Como se Proteger
                  </button>

                  <button 
                    onClick={() => setSelectedThreat(THREATS_DATA[0])}
                    className="flex items-center gap-2 bg-zinc-800/80 hover:bg-zinc-700/80 active:scale-95 text-white font-semibold py-3 px-6 rounded text-sm md:text-base transition-all backdrop-blur"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Mais Informações
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* 3. LISTAGEM DE CARROSSEIS / GRIDS DE CONTEÚDO */}
          <div className={`px-4 md:px-12 max-w-[1920px] mx-auto ${searchQuery || activeTab !== 'inicio' ? 'pt-32' : '-mt-12 md:-mt-24 relative z-30'}`}>
            
            {searchQuery && (
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-300">
                Resultados de busca para: <span className="text-red-500">"{searchQuery}"</span>
              </h2>
            )}

            {activeTab === 'lista' && !searchQuery && (
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-2 tracking-wide text-white">MINHA LISTA DE APRENDIZADO</h2>
                <p className="text-gray-400 text-sm">Organize e priorize o seu estudo de segurança digital no trabalho.</p>
                {myList.length === 0 && (
                  <div className="bg-zinc-900 border border-zinc-800/80 rounded-lg p-12 text-center mt-6">
                    <span className="text-5xl mb-4 block">🎬</span>
                    <p className="text-gray-300 font-semibold text-lg mb-2">Sua lista de aprendizado está vazia</p>
                    <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">Navegue pelas ameaças e selecione o botão de adicionar ("+") para fixar seus conteúdos favoritos aqui.</p>
                    <button 
                      onClick={() => setActiveTab('inicio')}
                      className="px-5 py-2.5 bg-red-600 hover:bg-red-700 font-bold rounded transition"
                    >
                      Explorar Catálogo
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'ameacas' && !searchQuery && (
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-2 tracking-wide text-white">TOP 10 CRITICIDADES (OWASP)</h2>
                <p className="text-gray-400 text-sm">O ranking oficial com as vulnerabilidades de sistemas mais perigosas do mercado de cibersegurança.</p>
              </div>
            )}

            {/* SE O USUÁRIO ESTIVER BUSCANDO OU NAS ABAS ESPECÍFICAS (EXIBE EM GRID) */}
            {searchQuery || activeTab !== 'inicio' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {threatsToDisplay.map((threat) => {
                  const isCompleted = completedThreats.includes(threat.id);
                  return (
                    <div 
                      key={threat.id} 
                      className={`relative group bg-zinc-900 border rounded-md overflow-hidden transition-all duration-300 hover:scale-[1.05] hover:z-40 hover:shadow-2xl flex flex-col justify-between h-80 ${
                        isCompleted 
                          ? 'border-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]' 
                          : 'border-zinc-800 hover:border-red-600/60 hover:shadow-red-950/20'
                      }`}
                    >
                      
                      <div className={`h-1/2 bg-gradient-to-br ${threat.iconGradient} flex flex-col items-center justify-center p-4 relative`}>
                        <span className="text-5xl transform group-hover:scale-125 transition-transform duration-300 drop-shadow-md select-none">{threat.bgEmoji}</span>
                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                          <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded shadow ${getLevelBadge(threat.level)}`}>
                            {threat.level}
                          </span>
                          {threat.rank && (
                            <span className="text-red-500 font-black text-lg bg-black/60 px-2 py-0.5 rounded border border-red-600/30">
                              #{threat.rank}
                            </span>
                          )}
                        </div>

                        {isCompleted && (
                          <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-lg flex items-center gap-1">
                            ✓ CONCLUÍDO
                          </div>
                        )}
                      </div>

                      <div className="p-4 flex flex-col justify-between flex-grow bg-zinc-950">
                        <div>
                          <h3 className={`font-extrabold text-base truncate transition-colors ${isCompleted ? 'text-emerald-400 group-hover:text-emerald-300' : 'text-white group-hover:text-red-500'}`}>
                            {threat.title}
                          </h3>
                          {threat.owasp && (
                            <p className="text-[10px] text-gray-500 font-bold mt-0.5 uppercase truncate">
                              {threat.owasp}
                            </p>
                          )}
                          <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                            {threat.shortDesc}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-900">
                          <button 
                            onClick={() => setSelectedThreat(threat)}
                            className={`text-xs font-bold hover:underline ${isCompleted ? 'text-emerald-400' : 'text-red-500'}`}
                          >
                            {isCompleted ? 'Revisar Estudo' : 'Mais Detalhes'}
                          </button>
                          
                          <button 
                            onClick={() => toggleMyList(threat.id)}
                            className="text-gray-400 hover:text-white transition-colors"
                            title={myList.includes(threat.id) ? "Remover da minha lista" : "Adicionar à minha lista"}
                          >
                            {myList.includes(threat.id) ? (
                              <svg className="w-5 h-5 text-red-500 fill-current" viewBox="0 0 20 20">
                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col gap-12">
                
                {/* 1. CARROSSEL DO TOP 10 */}
                <div className="relative">
                  <h2 className="text-lg md:text-2xl font-extrabold tracking-wide mb-6 flex items-center gap-2">
                    <span className="text-red-600">🏆</span>
                    TOP 10 Ameaças Mais Críticas do Momento (OWASP)
                  </h2>
                  
                  <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent snap-x snap-mandatory">
                    {THREATS_DATA.filter(t => t.category === 'top10').map((threat, index) => {
                      const isCompleted = completedThreats.includes(threat.id);
                      return (
                        <div 
                          key={threat.id} 
                          className="relative min-w-[280px] md:min-w-[340px] h-[210px] md:h-[230px] flex snap-start group cursor-pointer focus:outline-none transition-all duration-300"
                          onClick={() => setSelectedThreat(threat)}
                        >
                          
                          <div className="absolute left-0 bottom-0 top-0 select-none pointer-events-none z-10 flex items-center justify-start">
                            <span className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-zinc-950 font-sans opacity-95 transition-colors duration-300" 
                                  style={{
                                    WebkitTextStroke: '2px #3f3f46',
                                    textShadow: '0px 0px 10px rgba(0,0,0,0.8)'
                                  }}>
                              {index + 1}
                            </span>
                          </div>

                          <div className={`ml-14 md:ml-20 flex-grow bg-zinc-900 border rounded-md overflow-hidden relative z-20 flex flex-col justify-between p-4 shadow-lg hover:scale-[1.04] transition-all duration-300 ${
                            isCompleted 
                              ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:border-emerald-400' 
                              : 'border-zinc-800 hover:border-red-600'
                          }`}>
                            
                            <div>
                              <div className="flex items-start justify-between">
                                <span className="text-3xl md:text-4xl drop-shadow-sm select-none">{threat.bgEmoji}</span>
                                <div className="flex gap-1.5">
                                  {isCompleted && (
                                    <span className="bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                                      ✓
                                    </span>
                                  )}
                                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shadow ${getLevelBadge(threat.level)}`}>
                                    {threat.level}
                                  </span>
                                </div>
                              </div>
                              <h3 className={`font-extrabold text-sm md:text-base mt-2 transition-colors line-clamp-1 ${isCompleted ? 'text-emerald-400 group-hover:text-emerald-300' : 'text-white group-hover:text-red-500'}`}>
                                {threat.title}
                              </h3>
                              <p className="text-[10px] text-gray-500 font-bold truncate">
                                {threat.owasp}
                              </p>
                            </div>

                            <div className="mt-2 border-t border-zinc-800/60 pt-2">
                              <p className="text-xs text-gray-400 line-clamp-2 leading-snug">
                                {threat.shortDesc}
                              </p>
                              <div className="flex items-center justify-between mt-2 text-[10px] font-semibold uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className={isCompleted ? 'text-emerald-400' : 'text-red-500'}>
                                  {isCompleted ? 'Revisar estudo →' : 'Aprender lição →'}
                                </span>
                                <span className="text-gray-500 normal-case">{threat.duration}</span>
                              </div>
                            </div>

                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. CARROSSEL: ENGENHARIA SOCIAL */}
                <div>
                  <h2 className="text-lg md:text-2xl font-extrabold tracking-wide mb-6 flex items-center gap-2">
                    <span className="text-red-600">💬</span>
                    Tendências: Engenharia Social & Foco Humano
                  </h2>
                  <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent snap-x snap-mandatory">
                    {THREATS_DATA.filter(t => t.category === 'social').map((threat) => {
                      const isCompleted = completedThreats.includes(threat.id);
                      return (
                        <div 
                          key={threat.id} 
                          className={`relative min-w-[240px] md:min-w-[280px] bg-zinc-900 border rounded-md overflow-hidden snap-start group cursor-pointer hover:scale-[1.05] transition-all duration-300 p-4 flex flex-col justify-between h-56 ${
                            isCompleted 
                              ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:border-emerald-400' 
                              : 'border-zinc-800 hover:border-red-600'
                          }`}
                          onClick={() => setSelectedThreat(threat)}
                        >
                          <div>
                            <div className="flex justify-between items-center">
                              <span className="text-3xl select-none">{threat.bgEmoji}</span>
                              <div className="flex gap-1">
                                {isCompleted && (
                                  <span className="bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                                    ✓
                                  </span>
                                )}
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${getLevelBadge(threat.level)}`}>
                                  {threat.level}
                                </span>
                              </div>
                            </div>
                            <h3 className={`font-extrabold text-sm md:text-base mt-3 transition-colors ${isCompleted ? 'text-emerald-400 group-hover:text-emerald-300' : 'text-white group-hover:text-red-500'}`}>
                              {threat.title}
                            </h3>
                            <p className="text-xs text-gray-400 mt-2 line-clamp-3">
                              {threat.shortDesc}
                            </p>
                          </div>
                          <div className="text-[10px] text-gray-500 flex justify-between border-t border-zinc-800/80 pt-2 mt-2">
                            <span>{threat.duration}</span>
                            <span className={`font-bold group-hover:underline ${isCompleted ? 'text-emerald-400' : 'text-red-500'}`}>
                              {isCompleted ? 'Revisar' : 'Explorar'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. CARROSSEL: INVASÕES SILENCIOSAS */}
                <div>
                  <h2 className="text-lg md:text-2xl font-extrabold tracking-wide mb-6 flex items-center gap-2">
                    <span className="text-red-600">🕵️‍♀️</span>
                    Invasões Silenciosas e Códigos Maliciosos
                  </h2>
                  <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent snap-x snap-mandatory">
                    {THREATS_DATA.filter(t => t.category === 'silencioso').map((threat) => {
                      const isCompleted = completedThreats.includes(threat.id);
                      return (
                        <div 
                          key={threat.id} 
                          className={`relative min-w-[240px] md:min-w-[280px] bg-zinc-900 border rounded-md overflow-hidden snap-start group cursor-pointer hover:scale-[1.05] transition-all duration-300 p-4 flex flex-col justify-between h-56 ${
                            isCompleted 
                              ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:border-emerald-400' 
                              : 'border-zinc-800 hover:border-red-600'
                          }`}
                          onClick={() => setSelectedThreat(threat)}
                        >
                          <div>
                            <div className="flex justify-between items-center">
                              <span className="text-3xl select-none">{threat.bgEmoji}</span>
                              <div className="flex gap-1">
                                {isCompleted && (
                                  <span className="bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                                    ✓
                                  </span>
                                )}
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${getLevelBadge(threat.level)}`}>
                                  {threat.level}
                                </span>
                              </div>
                            </div>
                            <h3 className={`font-extrabold text-sm md:text-base mt-3 transition-colors ${isCompleted ? 'text-emerald-400 group-hover:text-emerald-300' : 'text-white group-hover:text-red-500'}`}>
                              {threat.title}
                            </h3>
                            <p className="text-xs text-gray-400 mt-2 line-clamp-3">
                              {threat.shortDesc}
                            </p>
                          </div>
                          <div className="text-[10px] text-gray-500 flex justify-between border-t border-zinc-800/80 pt-2 mt-2">
                            <span>{threat.duration}</span>
                            <span className={`font-bold group-hover:underline ${isCompleted ? 'text-emerald-400' : 'text-red-500'}`}>
                              {isCompleted ? 'Revisar' : 'Explorar'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}
          </div>
        </>
      ) : activeTab === 'concluidos' ? (
        /* --- STREAMING_CHUNK: Rendering completed content panel... --- */
        <div className="pt-32 px-4 md:px-12 max-w-[1920px] mx-auto">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-wide flex items-center justify-center md:justify-start gap-3">
              Estudos <span className="text-emerald-500">Concluídos</span>
              <span className="text-3xl">🏆</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl">
              Você é a defesa mais importante da nossa infraestrutura. Confira sua estante de certificações e treinamentos concluídos.
            </p>
          </div>

          {completedThreats.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-800/80 rounded-lg p-16 text-center">
              <span className="text-6xl mb-4 block">📚</span>
              <p className="text-gray-300 font-semibold text-xl mb-2">Nenhum estudo concluído ainda</p>
              <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
                Abra qualquer card de ameaça digital corporativa, cumpra os itens do checklist ("Sua Missão") de proteção e garanta seu selo de proteção corporativa!
              </p>
              <button 
                onClick={() => setActiveTab('inicio')}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 font-extrabold rounded-lg tracking-wider transition active:scale-95 text-sm"
              >
                Escolher Minha Primeira Lição
              </button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {threatsToDisplay.map((threat) => (
                  <div 
                    key={threat.id} 
                    className="relative group bg-zinc-900 border border-emerald-500/80 rounded-md overflow-hidden transition-all duration-300 hover:scale-[1.05] hover:z-40 shadow-[0_0_15px_rgba(16,185,129,0.15)] flex flex-col justify-between h-80"
                  >
                    
                    <div className={`h-1/2 bg-gradient-to-br ${threat.iconGradient} flex flex-col items-center justify-center p-4 relative`}>
                      <span className="text-5xl drop-shadow-md select-none">{threat.bgEmoji}</span>
                      
                      <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-lg flex items-center gap-1">
                        ✓ CONCLUÍDO
                      </div>

                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                        <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded shadow ${getLevelBadge(threat.level)}`}>
                          {threat.level}
                        </span>
                        {threat.rank && (
                          <span className="text-red-500 font-black text-lg bg-black/60 px-2 py-0.5 rounded border border-red-600/30">
                            #{threat.rank}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-4 flex flex-col justify-between flex-grow bg-zinc-950">
                      <div>
                        <h3 className="font-extrabold text-emerald-400 text-base truncate">
                          {threat.title}
                        </h3>
                        {threat.owasp && (
                          <p className="text-[10px] text-gray-500 font-bold mt-0.5 uppercase truncate">
                            {threat.owasp}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                          {threat.shortDesc}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-900">
                        <button 
                          onClick={() => setSelectedThreat(threat)}
                          className="text-xs text-emerald-400 font-bold hover:underline"
                        >
                          Revisar Diretrizes
                        </button>
                        
                        <span className="text-[10px] font-bold text-gray-500">100% Absorvido</span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* Box de Emissão de Certificados */}
              <div className="mt-16 bg-gradient-to-r from-emerald-950/20 to-zinc-950 border border-emerald-500/30 rounded-lg p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-wide flex items-center gap-2 justify-center md:justify-start">
                    <span className="text-emerald-400">🛡️</span> Selo Defensor Consagrado
                  </h3>
                  <p className="text-sm text-gray-400 max-w-xl">
                    Excelente progresso! Você completou {completedThreats.length} de {THREATS_DATA.length} lições recomendadas do nosso catálogo de segurança corporativa.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <button 
                    onClick={() => {
                      if (isAllCompleted) {
                        setShowCertificate(true);
                      } else {
                        setCustomNotification('Você precisa completar todos os 18 treinamentos para emitir o Certificado Completo de Conscientização.');
                      }
                    }}
                    className={`font-extrabold px-6 py-3 rounded text-xs md:text-sm tracking-wider transition-all active:scale-95 duration-300 ${
                      isAllCompleted 
                        ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 text-black shadow-lg shadow-amber-500/20 hover:brightness-110 border-2 border-amber-300' 
                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    }`}
                  >
                    🎓 Certificado Completo
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (completedThreats.length > 0) {
                        setShowPartialCertificate(true);
                      } else {
                        setCustomNotification('Você precisa completar ao menos 1 lição preventiva para emitir seu Certificado Parcial.');
                      }
                    }}
                    className="font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded text-xs md:text-sm tracking-wider transition-all active:scale-95 duration-300 shadow-md shadow-emerald-600/10"
                  >
                    📃 Emitir Certificado Parcial ({completedThreats.length} concluintes)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* --- STREAMING_CHUNK: Rendering prevention manuals and interactive quiz... --- */
        <div className="pt-32 px-4 md:px-12 max-w-[1200px] mx-auto">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-wide">
              Manuais de <span className="text-red-600">Prevenção</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl">
              Nossos "Documentários Especiais". Guias passo a passo rápidos e dinâmicos para blindar seu dia de trabalho contra armadilhas e ciberataques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PREVENTION_GUIDES.map((guide) => (
              <div key={guide.id} className="bg-zinc-900 border border-zinc-800/80 rounded-lg p-6 hover:border-red-500 transition-all duration-300 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs bg-red-600/20 text-red-500 border border-red-600/40 px-2 py-1 rounded font-bold uppercase tracking-wider">
                      {guide.type}
                    </span>
                    <span className="text-xs text-gray-400 font-semibold">{guide.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{guide.title}</h3>
                  <p className="text-sm text-gray-400 mb-6">{guide.desc}</p>
                  
                  <div className="border-t border-zinc-800 pt-4">
                    <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wide mb-3">Tópicos Essenciais:</h4>
                    <ul className="space-y-2">
                      {guide.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 text-xs text-gray-400">
                          <span className="text-red-500 select-none">✔</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button 
                  onClick={() => handleDownloadPDF(guide)}
                  className="w-full mt-6 bg-zinc-800 hover:bg-red-600 hover:text-white text-gray-300 font-bold py-2 rounded text-xs transition-colors flex items-center justify-center gap-2"
                >
                  📥 Baixar Conteúdo Completo (PDF)
                </button>
              </div>
            ))}
          </div>

          {/* QUIZ DE CONFORMIDADE */}
          {!quizActive && !quizCompleted ? (
            <div className="mt-16 bg-gradient-to-r from-red-950/40 to-zinc-950 border border-red-600/30 rounded-lg p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-wide flex items-center justify-center md:justify-start gap-2">
                  <span>🧠</span> Quer testar seus conhecimentos?
                </h3>
                <p className="text-sm text-gray-400 max-w-xl">
                  Responda o nosso Quiz de conformidade de 10 perguntas baseado nas ameaças que impactam o ecossistema corporativo e garanta sua nota!
                </p>
              </div>
              <button 
                onClick={() => {
                  setQuizActive(true);
                  setQuizCurrentIndex(0);
                  setQuizScore(0);
                  setQuizSelectedAnswer(null);
                  setQuizCompleted(false);
                }}
                className="bg-red-600 hover:bg-red-700 font-extrabold text-white px-6 py-3 rounded text-sm tracking-wider transition-colors active:scale-95 shadow-md shadow-red-600/15"
              >
                Iniciar Quiz de Conformidade
              </button>
            </div>
          ) : quizCompleted ? (
            <div className="mt-16 bg-zinc-900 border border-zinc-800 rounded-lg p-8 md:p-12 text-center">
              <span className="text-5xl mb-4 block animate-bounce">🛡️</span>
              <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">Quiz Concluído!</h3>
              <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                Você completou o teste de prontidão do SegFlix com uma taxa de acerto de <span className="text-red-500 font-bold">{quizScore * 10}%</span>!
              </p>
              
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 max-w-md mx-auto mb-8 shadow-inner">
                <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-2">Desempenho Geral</p>
                <p className="text-5xl font-black text-red-500 font-mono">{quizScore} <span className="text-2xl text-zinc-600">/ 10</span></p>
                <p className="text-sm text-gray-300 mt-4 font-semibold">
                  {quizScore === 10 ? "🥇 Selo de Elite - Especialista Absoluto" : 
                   quizScore >= 7 ? "🥈 Selo Protetor - Excelente Desempenho" : 
                   "🥉 Em Aprendizado - Revise os manuais de cibersegurança!"}
                </p>
              </div>

              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => {
                    setQuizActive(true);
                    setQuizCurrentIndex(0);
                    setQuizScore(0);
                    setQuizSelectedAnswer(null);
                    setQuizCompleted(false);
                  }}
                  className="bg-red-600 hover:bg-red-700 font-bold text-white px-5 py-2.5 rounded text-xs transition active:scale-95"
                >
                  Refazer Quiz
                </button>
                <button 
                  onClick={() => {
                    setQuizActive(false);
                    setQuizCompleted(false);
                  }}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-5 py-2.5 rounded text-xs transition"
                >
                  Fechar Desafio
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-16 bg-zinc-900 border border-red-600/30 rounded-lg p-6 md:p-8 shadow-xl">
              <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
                <span className="text-xs bg-red-600/20 text-red-500 border border-red-600/40 px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                  Quiz SegFlix • Desafio Rápido
                </span>
                <span className="text-xs text-gray-400 font-semibold font-mono">
                  Questão {quizCurrentIndex + 1} de 10
                </span>
              </div>

              <h4 className="text-lg md:text-xl font-bold text-white mb-6 leading-relaxed">
                {QUIZ_QUESTIONS[quizCurrentIndex].q}
              </h4>

              <div className="space-y-3 mb-6">
                {QUIZ_QUESTIONS[quizCurrentIndex].options.map((option, idx) => {
                  const isSelected = quizSelectedAnswer === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (quizSelectedAnswer === null) {
                          setQuizSelectedAnswer(idx);
                        }
                      }}
                      disabled={quizSelectedAnswer !== null}
                      className={`w-full text-left p-4 rounded-lg border transition-all text-sm flex items-start gap-3 ${
                        quizSelectedAnswer === null
                          ? "bg-zinc-950/40 border-zinc-800 hover:bg-zinc-850 hover:border-zinc-700 text-gray-300"
                          : idx === QUIZ_QUESTIONS[quizCurrentIndex].ans
                          ? "bg-emerald-950/30 border-emerald-600/60 text-emerald-400 font-medium"
                          : isSelected
                          ? "bg-red-950/30 border-red-600/60 text-red-400"
                          : "bg-zinc-950/20 border-zinc-900 text-zinc-500"
                      }`}
                    >
                      <span className="font-mono font-bold text-red-500">{String.fromCharCode(65 + idx)})</span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              {quizSelectedAnswer !== null && (
                <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800/80 mb-6">
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans italic">
                    💡 <span className="font-bold text-gray-300 not-italic uppercase">Dica de Proteção:</span> {QUIZ_QUESTIONS[quizCurrentIndex].tip}
                  </p>
                </div>
              )}

              {quizSelectedAnswer !== null && (
                <button
                  onClick={() => {
                    if (quizSelectedAnswer === QUIZ_QUESTIONS[quizCurrentIndex].ans) {
                      setQuizScore(prev => prev + 1);
                    }
                    if (quizCurrentIndex + 1 < 10) {
                      setQuizCurrentIndex(prev => prev + 1);
                      setQuizSelectedAnswer(null);
                    } else {
                      setQuizCompleted(true);
                    }
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded text-xs uppercase tracking-wider transition-all active:scale-95"
                >
                  {quizCurrentIndex + 1 < 10 ? "Próxima Pergunta →" : "Finalizar Desafio e Ver Pontuação"}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* --- STREAMING_CHUNK: Rendering modals, overlay backdrops, and toasts... --- */}
      {/* 4. MODAL DETALHADO DO TÍTULO */}
      {selectedThreat && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={() => { setSelectedThreat(null); setCompletedMissions({}); }}
        >
          <div 
            className="bg-zinc-900 w-full max-w-3xl rounded-lg overflow-hidden border border-zinc-800 shadow-2xl relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            
            <div className={`p-8 md:p-12 bg-gradient-to-b ${selectedThreat.iconGradient} relative flex flex-col justify-end h-48 md:h-64`}>
              
              <button 
                onClick={() => { setSelectedThreat(null); setCompletedMissions({}); }}
                className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition shadow-md focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="absolute top-4 left-4 bg-black/50 text-[10px] tracking-widest font-black text-white px-3 py-1 rounded">
                CATEGORIA: {selectedThreat.category === 'top10' ? 'OWASP TOP 10' : 'SISTEMA E COMPORTAMENTO'}
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase drop-shadow-md leading-tight">
                  {selectedThreat.title}
                </h2>
                
                {selectedThreat.owasp && (
                  <p className="text-xs font-mono font-bold text-red-300 mt-1 uppercase drop-shadow">
                    Mapeado ao {selectedThreat.owasp}
                  </p>
                )}
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent pointer-events-none" />
            </div>

            <div className="p-6 md:p-8 overflow-y-auto flex-grow space-y-6 scrollbar-thin scrollbar-thumb-zinc-700">
              
              <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-gray-400 font-semibold pb-4 border-b border-zinc-800">
                <span className="text-green-500">{selectedThreat.match}</span>
                <span>{selectedThreat.year}</span>
                <span className={`px-2.5 py-0.5 rounded text-xs ${getLevelBadge(selectedThreat.level)}`}>
                  Nível de Perigo: {selectedThreat.level}
                </span>
                <span>{selectedThreat.duration}</span>
                
                <button 
                  onClick={() => toggleMyList(selectedThreat.id)}
                  className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded text-xs transition"
                >
                  {myList.includes(selectedThreat.id) ? (
                    <>
                      <span className="text-red-500 font-bold">✓</span> Na Minha Lista
                    </>
                  ) : (
                    <>
                      <span>+</span> Adicionar à Lista
                    </>
                  )}
                </button>
              </div>

              <div>
                <h3 className="text-red-500 font-bold text-sm tracking-widest uppercase mb-2">
                  🛡️ O que é e Como Funciona? (Explicado de forma simples)
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed bg-zinc-950 p-4 rounded border border-zinc-800/50">
                  {selectedThreat.desc}
                </p>
              </div>

              <div>
                <h3 className="text-red-500 font-bold text-sm tracking-widest uppercase mb-2">
                  🚪 Como isso chega até você na rotina de trabalho?
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  {selectedThreat.howItArrives}
                </p>
              </div>

              <div className="border-t border-zinc-800 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-emerald-500 font-extrabold text-sm tracking-widest uppercase flex items-center gap-2">
                    <span>🚀</span>
                    Sua Missão Prática de Proteção:
                  </h3>
                  <span className="text-xs text-gray-500">Marque para concluir a lição</span>
                </div>
                
                <div className="space-y-3">
                  {selectedThreat.mission.map((item, index) => (
                    <label 
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                        completedMissions[index] 
                          ? 'bg-emerald-950/20 border-emerald-600/40 text-emerald-400' 
                          : 'bg-zinc-950/40 border-zinc-800 text-gray-300 hover:bg-zinc-850'
                      }`}
                    >
                      <input 
                        type="checkbox"
                        checked={!!completedMissions[index]}
                        onChange={() => setCompletedMissions({
                          ...completedMissions,
                          [index]: !completedMissions[index]
                        })}
                        className="mt-1 h-4 w-4 text-emerald-600 border-zinc-700 bg-zinc-800 rounded focus:ring-emerald-500 focus:ring-2"
                      />
                      <span className="text-xs md:text-sm leading-relaxed">
                        <strong className="text-white block mb-0.5">Ação #{index + 1}:</strong>
                        {item}
                      </span>
                    </label>
                  ))}
                </div>

                {allMissionsChecked && !completedThreats.includes(selectedThreat.id) && (
                  <button
                    onClick={() => handleCompleteStudy(selectedThreat.id)}
                    className="w-full mt-6 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold py-3.5 px-6 rounded-lg uppercase tracking-wider text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>🎓</span> Concluir Estudo da Ameaça
                  </button>
                )}

                {completedThreats.includes(selectedThreat.id) && (
                  <div className="w-full mt-6 bg-emerald-950/30 border border-emerald-500/40 text-emerald-400 font-extrabold py-3 px-6 rounded-lg uppercase tracking-wider text-sm flex items-center justify-center gap-2">
                    <span>🎉</span> Treinamento Concluído!
                  </div>
                )}
              </div>

            </div>

            <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Lembre-se: Você é a defesa mais importante da nossa infraestrutura digital.
              </span>
              <button 
                onClick={() => { setSelectedThreat(null); setCompletedMissions({}); }}
                className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs py-2 px-5 rounded uppercase tracking-wider transition-colors"
              >
                Fechar Painel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL DE CERTIFICADO COMPLETO */}
      {showCertificate && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setShowCertificate(false)}
        >
          <div 
            className="w-full max-w-4xl bg-zinc-950 border border-amber-500/50 rounded-2xl p-6 md:p-12 relative shadow-[0_0_50px_rgba(245,158,11,0.15)] flex flex-col justify-between overflow-hidden"
            style={{ 
              backgroundImage: 'radial-gradient(circle at center, rgba(30, 27, 22, 0.4) 0%, rgba(10, 10, 10, 0.8) 100%)' 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600" />
            <div className="absolute inset-4 border border-amber-600/20 rounded-xl pointer-events-none" />
            
            <button 
              onClick={() => setShowCertificate(false)}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
            >
              ✕
            </button>

            <div className="text-center space-y-6 md:space-y-8 my-4">
              
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-xl scale-125" />
                  <span className="text-6xl md:text-7xl filter drop-shadow">🎖️</span>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-amber-400 font-serif font-black text-2xl md:text-4xl tracking-widest uppercase">
                  Certificado de Excelência
                </h2>
                <p className="text-zinc-500 text-xs md:text-sm tracking-wider uppercase font-semibold">
                  SegFlix Security Awareness • Conformidade de Segurança
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-zinc-400 text-xs md:text-sm font-sans italic">Este documento atesta com louvor que</p>
                <h3 className="text-3xl md:text-5xl font-black tracking-tight text-white font-serif border-b-2 border-zinc-800 pb-2 max-w-lg mx-auto">
                  {userProfile.name}
                </h3>
                <p className="text-zinc-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
                  Completou com êxito todas as avaliações práticas e estudos preventivos do catálogo corporativo de cibersegurança do mês vigente.
                </p>
              </div>

              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 md:p-6 max-w-2xl mx-auto">
                <p className="text-amber-300 font-serif text-sm md:text-base leading-relaxed tracking-wide italic font-medium">
                  "Parabéns! Voce concluiu a leitura sobre todas as vulnerabilidades disponíveis na plataforma este mês. Continue assim! "
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 max-w-xl mx-auto text-center">
                <div className="border-t border-zinc-800 pt-3">
                  <p className="text-white text-xs font-semibold font-serif">Equipe SecOps</p>
                  <p className="text-zinc-600 text-[10px]">Segurança da Informação</p>
                </div>
                <div className="border-t border-zinc-800 pt-3">
                  <p className="text-white text-xs font-semibold font-serif">Diretoria Executiva</p>
                  <p className="text-zinc-600 text-[10px]">Segurança & Compliance</p>
                </div>
              </div>

              <div className="text-[10px] text-zinc-600 font-mono pt-4">
                Emissão Oficial em 2026 • ID Autenticação: SFX-ALLCOMPLETED-998
              </div>

            </div>

            <div className="flex justify-center gap-4 mt-8 border-t border-zinc-800/80 pt-6">
              <button 
                onClick={() => window.print()}
                className="bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-xs py-2.5 px-6 rounded uppercase tracking-wider transition"
              >
                🖨️ Imprimir Certificado
              </button>
              <button 
                onClick={() => setShowCertificate(false)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs py-2.5 px-6 rounded uppercase tracking-wider transition"
              >
                Fechar Painel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL DE CERTIFICADO PARCIAL */}
      {showPartialCertificate && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setShowPartialCertificate(false)}
        >
          <div 
            className="w-full max-w-4xl bg-zinc-950 border border-emerald-500/50 rounded-2xl p-6 md:p-12 relative shadow-[0_0_50px_rgba(16,185,129,0.15)] flex flex-col justify-between overflow-hidden"
            style={{ 
              backgroundImage: 'radial-gradient(circle at center, rgba(16, 28, 23, 0.4) 0%, rgba(10, 10, 10, 0.8) 100%)' 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-600" />
            <div className="absolute inset-4 border border-emerald-600/20 rounded-xl pointer-events-none" />
            
            <button 
              onClick={() => setShowPartialCertificate(false)}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors z-10"
            >
              ✕
            </button>

            <div className="text-center space-y-6 md:space-y-8 my-4">
              
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl scale-125" />
                  <span className="text-6xl md:text-7xl filter drop-shadow">
                    {getPartialBadgeInfo(completedThreats.length).icon}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-emerald-400 font-serif font-black text-2xl md:text-4xl tracking-widest uppercase">
                  Certificação de Segurança Parcial
                </h2>
                <p className="text-zinc-500 text-xs md:text-sm tracking-wider uppercase font-semibold">
                  Plataforma de Treinamento SegFlix Security Awareness
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-zinc-400 text-xs md:text-sm italic">Concedemos esta honraria de prontidão à:</p>
                <h3 className="text-3xl md:text-5xl font-black tracking-tight text-white font-serif border-b-2 border-zinc-800 pb-2 max-w-lg mx-auto">
                  {userProfile.name}
                </h3>
                
                <div className="pt-4 max-w-md mx-auto space-y-2">
                  <p className="text-zinc-300 text-sm md:text-base font-semibold">
                    Classificação: <span className="text-emerald-400 uppercase tracking-wider">{getPartialBadgeInfo(completedThreats.length).title}</span> ({getPartialBadgeInfo(completedThreats.length).desc})
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-zinc-500 px-1 pt-2 font-mono">
                    <span>Lições Absorvidas: {completedThreats.length} / 18</span>
                    <span>{Math.round((completedThreats.length / 18) * 100)}% de Conclusão</span>
                  </div>

                  <div className="w-full bg-zinc-900 rounded-full h-2 border border-zinc-800">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${(completedThreats.length / 18) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-emerald-950/10 border border-emerald-500/20 rounded-xl p-4 md:p-6 max-w-2xl mx-auto">
                <p className="text-emerald-300 font-serif text-sm md:text-base leading-relaxed tracking-wide italic font-medium">
                  "Certificamos que o colaborador concluiu com êxito {completedThreats.length} das 18 lições preventivas recomendadas de cibersegurança do SegFlix, blindando a rotina corporativa contra incidentes digitais."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 max-w-xl mx-auto text-center">
                <div className="border-t border-zinc-800 pt-3">
                  <p className="text-white text-xs font-semibold font-serif">Equipe de TI & SecOps</p>
                  <p className="text-zinc-600 text-[10px]">Cibersegurança e Proteção</p>
                </div>
                <div className="border-t border-zinc-800 pt-3">
                  <p className="text-white text-xs font-semibold font-serif">SegFlix Stream</p>
                  <p className="text-zinc-600 text-[10px]">Portal de Conscientização</p>
                </div>
              </div>

              <div className="text-[10px] text-zinc-600 font-mono pt-4">
                Emissão Oficial Corporativa • Autenticação: SFX-PARTIAL-{completedThreats.length}LI-2026
              </div>

            </div>

            <div className="flex justify-center gap-4 mt-8 border-t border-zinc-800/80 pt-6">
              <button 
                onClick={() => window.print()}
                className="bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-xs py-2.5 px-6 rounded uppercase tracking-wider transition active:scale-95"
              >
                🖨️ Imprimir Parcial
              </button>
              <button 
                onClick={() => setShowPartialCertificate(false)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs py-2.5 px-6 rounded uppercase tracking-wider transition"
              >
                Fechar Painel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* TOAST DE NOTIFICAÇÃO PERSONALIZADO */}
      {customNotification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-zinc-950 border border-zinc-800 border-l-4 border-l-emerald-500 text-white p-4 rounded shadow-2xl flex items-start gap-3 animate-fadeIn">
          <div className="flex-grow">
            <p className="text-xs font-semibold tracking-wide text-emerald-400 uppercase">Aviso do SegFlix</p>
            <p className="text-xs text-gray-300 mt-1">{customNotification}</p>
          </div>
          <button onClick={() => setCustomNotification(null)} className="text-gray-400 hover:text-white font-bold text-xs p-1">
            ✕
          </button>
        </div>
      )}

      {/* 5. RODAPÉ INSTITUCIONAL */}
      <footer className="mt-24 border-t border-zinc-800/80 pt-12 pb-8 px-4 md:px-12 text-xs text-gray-500">
        <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <span className="text-red-600 font-extrabold text-lg tracking-widest">SEGFLIX</span>
            <p className="max-w-md">Uma iniciativa interna da equipe de Segurança da Informação. Todos os dados são fictícios e adaptados do OWASP Top 10 e de incidentes cibernéticos comuns.</p>
          </div>
          <div className="flex gap-6 text-gray-400 font-medium">
            <a href="#" onClick={(e) => {e.preventDefault(); setCustomNotification("Equipe de Segurança de TI: ramal 4455 / email: seg@empresa.com");}} className="hover:underline">Suporte de TI</a>
            <a href="#" onClick={(e) => {e.preventDefault(); setCustomNotification("Regulamento de Segurança da Informação, Versão 4.0 (2026).");}} className="hover:underline">Políticas Corporativas</a>
            <a href="#" onClick={(e) => {e.preventDefault(); setCustomNotification("Canais oficiais para denúncia de fraudes e suspeitas.");}} className="hover:underline">Canal de Denúncias</a>
          </div>
        </div>
        <div className="text-center mt-12 text-gray-600">
          © 2026 SegFlix Security Awareness. Todos os direitos reservados. Promovendo a cultura de segurança da informação.
        </div>
      </footer>

    </div>
  );
}