// ==UserScript==
// @name         Nwask Cassino Helper
// @version      3.1.1
// @description  ANÁLISE SIMULADA (FINS EDUCATIVOS)
// @author       SeuNome
// @match        *://*/*
// @grant        none
// ==/UserScript==

(() => {
    // Configurações básicas
    const VERSION = "V3.1.1";
    let isActive = true;
    const symbols = ["🐯", "🌟", "🍒", "💎"];
    
    // Detecção de dispositivo
    const device = {
        mobile: /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent),
        touch: 'ontouchstart' in window
    };

    // Funções essenciais
    const showToast = (text, duration = 3000) => {
        const toast = document.createElement('div');
        toast.style = `position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#000;color:#fff;padding:10px 20px;border-radius:5px;z-index:9999;`;
        toast.textContent = text;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), duration);
    };

    // Interface principal
    const createUI = () => {
        const panel = document.createElement('div');
        panel.innerHTML = `
            <style>
                .nwask-panel {
                    position: fixed;
                    top: ${device.mobile ? '10px' : '50%'};
                    left: 50%;
                    transform: ${device.mobile ? 'translateX(-50%)' : 'translate(-50%, -50%)'};
                    background: #1a1a1a;
                    color: white;
                    padding: 15px;
                    border-radius: 10px;
                    z-index: 9999;
                    min-width: 250px;
                    font-family: Arial;
                }
                .nwask-btn {
                    background: #4CAF50;
                    border: none;
                    color: white;
                    padding: 10px;
                    margin: 5px;
                    border-radius: 5px;
                    width: 100%;
                    cursor: pointer;
                }
            </style>
            <div class="nwask-panel">
                <h3 style="margin:0 0 10px 0;">NWASK HELPER ${VERSION}</h3>
                <div id="result" style="font-size:24px;text-align:center;">---</div>
                <button class="nwask-btn" id="analyze">🔍 Analisar</button>
                <button class="nwask-btn" id="close">❌ Fechar</button>
                <div style="color:#ff4444;font-size:10px;margin-top:10px;text-align:center;">
                    FINS EDUCATIVOS - NÃO USE EM JOGOS REAIS
                </div>
            </div>
        `;

        // Controles interativos
        panel.querySelector('#analyze').addEventListener('click', () => {
            const randomPattern = Array.from({length: 3}, () => 
                symbols[Math.floor(Math.random() * symbols.length)]
            ).join('');
            
            panel.querySelector('#result').textContent = randomPattern;
            showToast(`Padrão detectado: ${randomPattern}`);
        });

        panel.querySelector('#close').addEventListener('click', () => {
            panel.remove();
            isActive = false;
        });

        document.body.appendChild(panel);
    };

    // Inicialização segura
    if (!document.querySelector('.nwask-panel')) {
        createUI();
        showToast('NWASK Helper carregado!');
    }
})();
