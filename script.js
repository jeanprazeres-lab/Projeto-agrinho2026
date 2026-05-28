// Game Variables
let money = 50000;
let production = 50;
let environment = 50;
let currentRoundIndex = 0;

// Game Content (Decisions Data)
const decisions = [
    {
        title: "Escolha do Sistema de Cultivo",
        desc: "A época do plantio chegou. Que abordagem você vai adotar para preparar o solo e iniciar a sua grande lavoura de grãos?",
        icon: "🚜",
        options: [
            {
                title: "Plantio Direto na Palha",
                desc: "Planta diretamente sobre os resíduos da colheita anterior, sem arar o solo. Protege contra erosão e mantém a umidade.",
                cost: 8000,
                impactProd: 15,
                impactEnv: 20,
                feedback: "Excelente! O plantio direto evita a erosão, preserva a água no solo e armazena carbono, garantindo um ótimo futuro."
            },
            {
                title: "Arado Convencional Intensivo",
                desc: "Prepara o solo quebrando toda a estrutura da terra. Libera nutrientes rápido, mas deixa o solo exposto a chuvas e ventos.",
                cost: 4000,
                impactProd: 25,
                impactEnv: -20,
                feedback: "A produção inicial é alta, mas a longo prazo o solo sofre degradação, compactação e forte perda de nutrientes por erosão."
            }
        ]
    },
    {
        title: "Manejo de Pragas e Insetos",
        desc: "Uma população de lagartas surgiu na plantação. O que fazer para proteger a sua lavoura antes que cause perdas?",
        icon: "🐛",
        options: [
            {
                title: "Controle Químico Massivo",
                desc: "Aplica defensivos químicos fortes em toda a área de maneira preventiva. Elimina as pragas instantaneamente.",
                cost: 12000,
                impactProd: 20,
                impactEnv: -25,
                feedback: "As pragas sumiram rápido, mas o uso excessivo contaminou o lençol freático e eliminou os polinizadores e insetos benéficos."
            },
            {
                title: "Manejo Integrado de Pragas (MIP)",
                desc: "Monitora os insetos e usa armadilhas e controle biológico (predadores naturais), aplicando químicos apenas se estritamente necessário.",
                cost: 7000,
                impactProd: 15,
                impactEnv: 15,
                feedback: "Ótima escolha! O MIP equilibra custos, protege a biodiversidade local e mantém a eficiência de controle da lavoura."
            }
        ]
    },
    {
        title: "Gestão de Recursos Hídricos",
        desc: "Os meses de calor exigirão irrigação constante. Como você planeja gerenciar o consumo de água da propriedade?",
        icon: "💧",
        options: [
            {
                title: "Irrigação por Gotejamento Automatizado",
                desc: "Instala mangueiras subterrâneas que liberam água gota a gota direto na raiz da planta, guiado por sensores de umidade.",
                cost: 15000,
                impactProd: 20,
                impactEnv: 20,
                feedback: "Investimento inteligente! A eficiência hídrica evita o desperdício de água e garante que a planta produza no máximo potencial."
            },
            {
                title: "Irrigação por Aspersão Comum (Turno Fixo)",
                desc: "Molha o campo inteiro por cima em horários fixos do dia, independente de estar chovendo ou não.",
                cost: 6000,
                impactProd: 15,
                impactEnv: -15,
                feedback: "Embora mais barato no início, o sistema gerou desperdício por evaporação e causou alagamento localizado em algumas áreas."
            }
        ]
    },
    {
        title: "Expansão da Produção",
        desc: "Você acumulou capital e quer expandir a capacidade econômica da fazenda. Qual caminho seguir?",
        icon: "🌲",
        options: [
            {
                title: "Integração Lavoura-Pecuária-Floresta (ILPF)",
                desc: "Consorcia o plantio com árvores e pastagem na mesma área. Gera sombra para o gado e diversifica a renda.",
                cost: 10000,
                impactProd: 20,
                impactEnv: 25,
                feedback: "Incrível! A ILPF recupera solos degradados, sequestra carbono da atmosfera e traz estabilidade financeira com múltiplos produtos."
            },
            {
                title: "Abertura de Nova Área de Mata Nativa",
                desc: "Derruba uma área de floresta própria da fazenda que estava protegida para abrir espaço exclusivo para mais pasto.",
                cost: 5000,
                impactProd: 25,
                impactEnv: -35,
                feedback: "A área de produção aumentou, mas o desmatamento destruiu habitats, reduziu a biodiversidade e penalizou drasticamente o Meio Ambiente."
            }
        ]
    }
];

// DOM Elements
const introScreen = document.getElementById('intro-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');

const btnStart = document.getElementById('btn-start');
const btnRestart = document.getElementById('btn-restart');

const txtMoney = document.getElementById('stat-money');
const barProd = document.getElementById('bar-prod');
const barEnv = document.getElementById('bar-env');
const txtProd = document.getElementById('txt-prod');
const txtEnv = document.getElementById('txt-env');

const currentRoundTxt = document.getElementById('current-round');
const decisionIcon = document.getElementById('decision-icon');
const decisionTitle = document.getElementById('decision-title');
const decisionDesc = document.getElementById('decision-desc');
const optionsSpace = document.getElementById('options-space');

const finalMoney = document.getElementById('final-money');
const finalEnv = document.getElementById('final-env');
const finalProd = document.getElementById('final-prod');
const resultTitle = document.getElementById('result-title');
const resultIcon = document.getElementById('result-icon');
const educationalText = document.getElementById('educational-text');

// Initialize / Update UI Stats
function updateStatsUI() {
    txtMoney.innerHTML = `<span class="stat-label">Orçamento:</span><span class="stat-value">R$ ${money.toLocaleString('pt-BR')}</span>`;
    
    // Clamp values between 0 and 100
    production = Math.max(0, Math.min(100, production));
    environment = Math.max(0, Math.min(100, environment));

    barProd.style.width = `${production}%`;
    txtProd.innerText = `${production}%`;
    
    barEnv.style.width = `${environment}%`;
    txtEnv.innerText = `${environment}%`;
}

// Start Game
btnStart.addEventListener('click', () => {
    introScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    resetGameData();
    loadDecision();
});

// Restart Game
btnRestart.addEventListener('click', () => {
    resultScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    resetGameData();
    loadDecision();
});

function resetGameData() {
    money = 50000;
    production = 50;
    environment = 50;
    currentRoundIndex = 0;
    updateStatsUI();
}

// Load Decision Card
function loadDecision() {
    if (currentRoundIndex >= decisions.length) {
        showResults();
        return;
    }

    const currentDecision = decisions[currentRoundIndex];
    currentRoundTxt.innerText = `Decisão ${currentRoundIndex + 1} de ${decisions.length}`;
    decisionIcon.innerText = currentDecision.icon;
    decisionTitle.innerText = currentDecision.title;
    decisionDesc.innerText = currentDecision.desc;

    // Clear old options
    optionsSpace.innerHTML = '';

    // Render new option cards
    currentDecision.options.forEach((option) => {
        const card = document.createElement('div');
        card.className = 'option-card';
        
        card.innerHTML = `
            <div class="option-title">
                <span>${option.title}</span>
                <span>- R$ ${option.cost.toLocaleString('pt-BR')}</span>
            </div>
            <div class="option-desc">${option.desc}</div>
            <div class="option-impacts">Impacto estimado no ecossistema e rentabilidade.</div>
        `;

        card.addEventListener('click', () => handleOptionClick(option));
        optionsSpace.appendChild(card);
    });
}

// Handle User choice
function handleOptionClick(option) {
    // Apply financial cost and stat changes
    money -= option.cost;
    production += option.impactProd;
    environment += option.impactEnv;
    
    updateStatsUI();
    
    // Alert feedback message to the player (educational takeaway)
    alert(`💡 Consequência da sua escolha:

${option.feedback}`);
    
    // Advance game
    currentRoundIndex++;
    loadDecision();
}

// Show End Game Screen
function showResults() {
    gameScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    finalMoney.innerText = `R$ ${money.toLocaleString('pt-BR')}`;
    finalEnv.innerText = `${environment}%`;
    finalProd.innerText = `${production}%`;

    // Calculate final scenario text
    if (money < 0) {
        resultTitle.innerText = "A Fazenda Faliu!";
        resultIcon.innerText = "📉";
        educationalText.innerHTML = "<strong>Alerta Econômico:</strong> Suas decisões exauriram os recursos financeiros da propriedade. Para o Agro ser Forte e Sustentável, a viabilidade financeira é indispensável para manter o negócio ativo.";
    } else if (environment >= 65 && production >= 65) {
        resultTitle.innerText = "Parabéns! Fazenda Nota 10!";
        resultIcon.innerText = "🏆";
        educationalText.innerHTML = "<strong>Equilíbrio Perfeito Alcançado!</strong> Você provou que é possível ter alta produtividade agrícola protegendo o ecossistema. Esse é o Agro do Futuro promovido pelo Agrinho 2026!";
    } else if (environment < 40) {
        resultTitle.innerText = "Alerta Ambiental!";
        resultIcon.innerText = "⚠️";
        educationalText.innerHTML = "<strong>Foco no Meio Ambiente:</strong> Embora sua produção tenha sido boa, o ecossistema da fazenda ficou muito degradado. Sem solo fértil, água limpa e polinizadores, sua produção vai despencar nos próximos anos.";
    } else if (production < 40) {
        resultTitle.innerText = "Baixa Produtividade!";
        resultIcon.innerText = "🌾";
        educationalText.innerHTML = "<strong>Foco em Produção:</strong> Suas práticas protegeram a natureza, mas a fazenda não gerou alimentos e receita suficientes. O Agro Forte precisa alimentar o mundo e ser economicamente viável.";
    } else {
        resultTitle.innerText = "Bom Trabalho!";
        resultIcon.innerText = "👍";
        educationalText.innerHTML = "<strong>Resultado Equilibrado:</strong> Você conseguiu manter a fazenda funcionando sem causar desastres, mas ainda há espaço para aplicar tecnologias mais inovadoras e atingir o potencial máximo de sustentabilidade!";
    }
}

