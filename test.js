// ==UserScript==
// @name         Nwask Bets Invasion
// @namespace    http://nwask.github.io
// @version      1.0
// @description  IA Anti-Loss para Cassinos (SIMULAÇÃO)
// @match        *://*/*
// @grant        none
// ==/UserScript==

(() => {
    if (window.nwaskInjected) return;
    window.nwaskInjected = true;

    const symbols = ["🐯", "🌟", "🍒", "💎", "🔥", "⚡", "🎲", "🎯"];
    const riskEmojis = {
        low: "✅",
        medium: "⚠️",
        high: "💀"
    };
    
    // Criar UI com tema hacker vermelho/preto
    const panel = document.createElement('div');
    panel.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
            
            @keyframes glitch {
                0% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
                100% { transform: translate(0); }
            }
            
            @keyframes pulse {
                0% { box-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000; }
                50% { box-shadow: 0 0 15px #ff0000, 0 0 25px #ff0000; }
                100% { box-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000; }
            }
            
            @keyframes borderGlow {
                0% { border-color: #ff0000; }
                50% { border-color: #aa0000; }
                100% { border-color: #ff0000; }
            }
            
            @keyframes textShadowFlicker {
                0% { text-shadow: 0 0 5px #ff0000; }
                50% { text-shadow: 0 0 10px #ff0000, 0 0 15px #ff0000; }
                100% { text-shadow: 0 0 5px #ff0000; }
            }
            
            @keyframes blink {
                0% { opacity: 1; }
                49% { opacity: 1; }
                50% { opacity: 0; }
                99% { opacity: 0; }
                100% { opacity: 1; }
            }
            
            .nwask-panel {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.95);
                background-image: url('https://i.imgur.com/d7KeQow.gif');
                background-blend-mode: overlay;
                background-size: cover;
                color: #ff0000;
                padding: 20px;
                border-radius: 5px;
                border: 2px solid #ff0000;
                z-index: 9999;
                font-family: 'Share Tech Mono', 'Courier New', monospace;
                box-shadow: 0 0 20px rgba(255, 0, 0, 0.7);
                animation: pulse 3s infinite, borderGlow 2s infinite;
                width: 340px;
                backdrop-filter: blur(3px);
            }
            
            .nwask-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
                border-bottom: 1px solid #ff0000;
                padding-bottom: 10px;
                animation: textShadowFlicker 2s infinite;
            }
            
            .nwask-title {
                margin: 0;
                font-size: 18px;
                text-transform: uppercase;
                letter-spacing: 2px;
                animation: glitch 3s infinite;
            }
            
            .nwask-container {
                background: rgba(20, 0, 0, 0.7);
                border: 1px solid #aa0000;
                padding: 15px;
                margin: 10px 0;
                border-radius: 3px;
                position: relative;
                overflow: hidden;
            }
            
            .nwask-container::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(to right, transparent, #ff0000, transparent);
                animation: slide 2s infinite;
            }
            
            @keyframes slide {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
            
            .nwask-result-box {
                min-height: 120px;
                font-size: 14px;
            }
            
            .nwask-btn {
                background: linear-gradient(to bottom, #3a0000, #1a0000);
                border: 1px solid #ff0000;
                color: #ff0000;
                padding: 8px 15px;
                margin: 5px;
                border-radius: 3px;
                cursor: pointer;
                font-family: 'Share Tech Mono', 'Courier New', monospace;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-size: 12px;
                transition: all 0.3s;
                width: calc(100% - 10px);
            }
            
            .nwask-btn:hover {
                background: linear-gradient(to bottom, #4a0000, #3a0000);
                box-shadow: 0 0 10px #ff0000;
            }
            
            .nwask-symbols {
                display: flex;
                justify-content: space-around;
                font-size: 24px;
                margin: 15px 0;
                background: rgba(0,0,0,0.5);
                padding: 10px;
                border-radius: 3px;
                border: 1px dashed #aa0000;
            }
            
            .nwask-highlight {
                color: #ffffff;
                font-weight: bold;
            }
            
            .nwask-gain {
                color: #ff4444;
                font-weight: bold;
            }
            
            .nwask-terminal-text {
                display: inline-block;
                overflow: hidden;
                white-space: nowrap;
                font-size: 12px;
                letter-spacing: 1px;
                margin: 5px 0;
                position: relative;
                padding-left: 15px;
            }
            
            .nwask-terminal-text::before {
                content: ">";
                position: absolute;
                left: 0;
                color: #ff0000;
            }
            
            .nwask-cursor {
                display: inline-block;
                width: 8px;
                height: 15px;
                background-color: #ff0000;
                animation: blink 1s infinite;
                vertical-align: middle;
                margin-left: 3px;
            }
            
            .nwask-status {
                font-size: 11px;
                color: #888;
                text-align: center;
                margin-top: 10px;
            }
            
            .nwask-progress-bar {
                height: 5px;
                background-color: #1a0000;
                margin: 10px 0;
                border-radius: 3px;
                position: relative;
                overflow: hidden;
            }
            
            .nwask-progress-fill {
                height: 100%;
                background-color: #ff0000;
                position: absolute;
                left: 0;
                top: 0;
                transition: width 0.5s;
            }
            
            .nwask-risk-indicator {
                display: inline-block;
                font-size: 18px;
                vertical-align: middle;
                margin-left: 5px;
            }
            
            .nwask-info-grid {
                display: grid;
                grid-template-columns: auto 1fr;
                gap: 5px;
                margin: 10px 0;
            }
            
            .nwask-info-label {
                color: #999;
                text-align: right;
                padding-right: 8px;
            }
            
            .nwask-info-value {
                color: #ff0000;
                font-weight: bold;
            }
            
            .nwask-minimize {
                cursor: pointer;
                margin-left: 10px;
                font-size: 16px;
            }
            
            .nwask-logo {
                text-align: center;
                margin-bottom: 10px;
                font-size: 20px;
                text-transform: uppercase;
                letter-spacing: 5px;
                color: #ff0000;
                text-shadow: 0 0 10px #ff0000;
            }
        </style>
        <div class="nwask-panel" id="nwask-panel">
            <div class="nwask-header">
                <h3 class="nwask-title">[NWASK BETS INVASION]</h3>
                <span id="nwask-minimize" class="nwask-minimize">_</span>
            </div>
            <div class="nwask-logo">
                <span>Versao com o GPT (Teste)</span>
            </div>
            <div class="nwask-container nwask-result-box" id="result">
                <div class="nwask-terminal-text">Sistema inicializado<span class="nwask-cursor"></span></div>
                <div style="text-align: center; font-size: 12px; margin-top: 15px; color: #888;">
                    Clique em ANALISAR para invasão
                </div>
                <div class="nwask-progress-bar">
                    <div class="nwask-progress-fill" style="width: 15%;"></div>
                </div>
                <div class="nwask-status">AGUARDANDO COMANDO...</div>
            </div>
            <div class="nwask-symbols" id="symbols-display">
                <span>?</span><span>?</span><span>?</span>
            </div>
            <button class="nwask-btn" id="nwask-analyze">▶️ ANALISAR PADRÕES</button>
            <button class="nwask-btn" id="nwask-close">✖️ ENCERRAR INVASÃO</button>
        </div>
    `;

    // Função para simulação de análise IA
    function generatePrediction() {
        // Símbolos aleatórios
        const symbolResult = [
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)]
        ];
        
        // Valor de aposta (entre R$ 0,10 e R$ 0,50)
        const betAmount = (Math.floor(Math.random() * 41) + 10) / 100;
        
        // Ganho potencial (2x a 10x)
        const multiplier = (Math.floor(Math.random() * 81) + 20) / 10;
        const potentialGain = (betAmount * multiplier).toFixed(2);
        
        // Chance de vitória (70% de chance de sim para melhor experiência)
        const willWin = Math.random() < 0.7;
        
        // Nível de risco
        let riskLevel;
        let riskEmoji;
        if (willWin) {
            if (Math.random() < 0.7) {
                riskLevel = "baixo";
                riskEmoji = riskEmojis.low;
            } else {
                riskLevel = "médio";
                riskEmoji = riskEmojis.medium;
            }
        } else {
            if (Math.random() < 0.3) {
                riskLevel = "médio";
                riskEmoji = riskEmojis.medium;
            } else {
                riskLevel = "alto";
                riskEmoji = riskEmojis.high;
            }
        }
        
        // Porcentagem de confiança
        const confidence = willWin ? 
            Math.floor(Math.random() * 11) + 85 : // 85-95%
            Math.floor(Math.random() * 16) + 65;  // 65-80%
            
        return {
            symbols: symbolResult,
            bet: betAmount,
            gain: potentialGain,
            win: willWin,
            risk: riskLevel,
            riskEmoji: riskEmoji,
            confidence: confidence
        };
    }

    // Animação de digitação de texto terminal
    function typeText(element, text, speed = 30) {
        return new Promise(resolve => {
            element.innerHTML = '';
            let i = 0;
            
            function typing() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typing, speed);
                } else {
                    element.innerHTML += '<span class="nwask-cursor"></span>';
                    resolve();
                }
            }
            
            typing();
        });
    }

    // Sequência de carregamento da "IA"
    async function simulateAiAnalysis() {
        const resultBox = panel.querySelector('#result');
        const progressBar = resultBox.querySelector('.nwask-progress-bar .nwask-progress-fill');
        const symbolsDisplay = panel.querySelector('#symbols-display');
        
        // Resetar conteúdo
        resultBox.innerHTML = `
            <div class="nwask-terminal-text"></div>
            <div class="nwask-progress-bar">
                <div class="nwask-progress-fill" style="width: 0%;"></div>
            </div>
            <div class="nwask-status">INICIANDO INVASÃO...</div>
        `;
        
        const terminalLine = resultBox.querySelector('.nwask-terminal-text');
        const progressFill = resultBox.querySelector('.nwask-progress-fill');
        const statusLine = resultBox.querySelector('.nwask-status');
        
        symbolsDisplay.innerHTML = '<span>⌛</span><span>⌛</span><span>⌛</span>';
        
        // Sequência de mensagens
        const messages = [
            "Invadindo sistema de RNG...",
            "Analisando padrões do RNG... 87% de sincronia",
            "Calibrando algoritmo anti-loss...",
            "Bypass de segurança em andamento...",
            "Calculando sequência ideal..."
        ];
        
        // Animar progresso e mensagens
        for (let i = 0; i < messages.length; i++) {
            // Atualizar barra de progresso
            const progress = ((i + 1) / messages.length) * 100;
            progressFill.style.width = `${progress}%`;
            
            // Digitar mensagem
            await typeText(terminalLine, messages[i]);
            
            // Atualizar status
            statusLine.textContent = `INVASÃO: ${Math.round(progress)}% COMPLETA`;
            
            // Pausa entre mensagens
            if (i < messages.length - 1) {
                await new Promise(r => setTimeout(r, 800));
            }
        }
        
        return generatePrediction();
    }

    // Event Listeners
    panel.querySelector('#nwask-analyze').addEventListener('click', async () => {
        const analyzeButton = panel.querySelector('#nwask-analyze');
        analyzeButton.disabled = true;
        analyzeButton.textContent = "⏳ PROCESSANDO...";
        
        const prediction = await simulateAiAnalysis();
        const resultBox = panel.querySelector('#result');
        const symbolsDisplay = panel.querySelector('#symbols-display');
        
        // Mostrar símbolos
        symbolsDisplay.innerHTML = prediction.symbols.map(s => `<span>${s}</span>`).join('');
        
        // Construir resultado
        resultBox.innerHTML = `
            <div style="text-align: center; margin-bottom: 10px; color: #ff0000; font-weight: bold;">
                INVASÃO COMPLETA ✅
            </div>
            
            <div class="nwask-info-grid">
                <div class="nwask-info-label">APOSTA:</div>
                <div class="nwask-info-value">R$ ${prediction.bet.toFixed(2)}</div>
                
                <div class="nwask-info-label">GANHO:</div>
                <div class="nwask-info-value">R$ ${prediction.gain}</div>
                
                <div class="nwask-info-label">CONFIANÇA:</div>
                <div class="nwask-info-value">${prediction.confidence}%</div>
                
                <div class="nwask-info-label">RISCO:</div>
                <div class="nwask-info-value">${prediction.riskEmoji} ${prediction.risk}</div>
            </div>
            
            <div style="text-align: center; margin-top: 10px; border-top: 1px dashed #aa0000; padding-top: 10px;">
                <div style="font-size: 12px; color: #ff4444;">
                    PREVISÃO IA: ${prediction.symbols.join('')} | Ganho: R$ ${prediction.gain} | Risco: ${prediction.riskEmoji}
                </div>
                <div style="font-size: 11px; margin-top: 5px; color: #888;">
                    Valor seguro: R$ ${prediction.bet.toFixed(2)} (risco mínimo) 🔒
                </div>
            </div>
        `;
        
        analyzeButton.disabled = false;
        analyzeButton.textContent = "▶️ ANALISAR PADRÕES";
    });

    panel.querySelector('#nwask-close').addEventListener('click', () => {
        panel.remove();
        window.nwaskInjected = false;
    });
    
    // Funcionalidade minimizar
    let minimized = false;
    panel.querySelector('#nwask-minimize').addEventListener('click', () => {
        const panelElement = panel.querySelector('#nwask-panel');
        const minimizeButton = panel.querySelector('#nwask-minimize');
        
        if (minimized) {
            panelElement.style.height = '';
            panelElement.style.overflow = '';
            minimizeButton.textContent = '_';
            minimized = false;
        } else {
            panelElement.style.height = '30px';
            panelElement.style.overflow = 'hidden';
            minimizeButton.textContent = '□';
            minimized = true;
        }
    });

    document.body.appendChild(panel);
})();
