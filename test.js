// ==UserScript==
// @name         Nwask Cassino Helper
// @version      3.1.1
// @description  Interface de análise simulada (FINS EDUCATIVOS)
// @author       SeuNome
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Configurações iniciais
    const version = "V3.1.1";
    let isActive = true;
    let history = [];
    const symbols = ["🐯", "🌟", "🍒", "💎", "🔔", "7️⃣"];

    // Criar elemento de UI principal
    const panel = document.createElement('div');
    panel.id = 'nwask-panel';
    panel.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        background: #1a1a1a;
        color: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(0,0,0,0.5);
        min-width: 300px;
        font-family: Arial, sans-serif;
        user-select: none;
        cursor: move;
    `;

    // Cabeçalho do painel
    const header = document.createElement('div');
    header.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <h2 style="margin: 0; color: #4CAF50;">Nwask Helper</h2>
            <button id="nwask-close" style="background: none; border: none; color: white; cursor: pointer;">✖</button>
        </div>
    `;
    panel.appendChild(header);

    // Corpo do painel
    const body = document.createElement('div');
    body.innerHTML = `
        <div id="stats" style="margin-bottom: 20px;">
            <div style="background: #2a2a2a; padding: 10px; border-radius: 8px; margin-bottom: 10px;">
                <div style="font-size: 0.9em; color: #888;">Último Padrão</div>
                <div id="last-pattern" style="font-size: 24px; margin: 5px 0;">---</div>
            </div>
            
            <div style="background: #2a2a2a; padding: 10px; border-radius: 8px;">
                <div style="font-size: 0.9em; color: #888;">Próxima Jogada</div>
                <div id="prediction" style="font-size: 32px; color: #4CAF50; font-weight: bold;">?</div>
            </div>
        </div>

        <div style="display: grid; gap: 10px;">
            <button id="analyze-btn" class="nwask-btn">🔍 Analisar Jogo</button>
            <button id="reset-btn" class="nwask-btn danger">🔄 Reiniciar</button>
        </div>

        <div style="font-size: 0.8em; color: #ff4444; margin-top: 15px; text-align: center;">
            ❗ Simulação educacional - Não use em cassinos reais!
        </div>
    `;
    panel.appendChild(body);

    // Estilos adicionais
    const style = document.createElement('style');
    style.textContent = `
        .nwask-btn {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s;
            width: 100%;
        }

        .nwask-btn:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }

        .nwask-btn.danger {
            background: #ff4444;
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // Adicionar ao corpo do documento
    document.body.appendChild(panel);

    // Controles de arrastar
    let isDragging = false;
    let startX, startY, initialX, initialY;

    panel.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);

    function startDrag(e) {
        if (e.target.closest('button')) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = panel.offsetLeft;
        initialY = panel.offsetTop;
        panel.style.transition = 'none';
    }

    function drag(e) {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        panel.style.left = `${initialX + dx}px`;
        panel.style.top = `${initialY + dy}px`;
    }

    function stopDrag() {
        isDragging = false;
        panel.style.transition = 'transform 0.2s';
    }

    // Funções principais
    document.getElementById('analyze-btn').addEventListener('click', () => {
        if (!isActive) return;

        const newPattern = Array.from({length: 3}, () => 
            symbols[Math.floor(Math.random() * symbols.length)]
        );

        history.push(newPattern);
        if (history.length > 5) history.shift();

        document.getElementById('last-pattern').textContent = newPattern.join('');
        document.getElementById('prediction').textContent = 
            Math.random() < 0.4 ? "🎯 JOGAR!" : "⛔ AGUARDAR";

        // Animação
        document.getElementById('prediction').style.animation = 'pulse 0.5s';
        setTimeout(() => {
            document.getElementById('prediction').style.animation = '';
        }, 500);
    });

    document.getElementById('reset-btn').addEventListener('click', () => {
        history = [];
        document.getElementById('last-pattern').textContent = '---';
        document.getElementById('prediction').textContent = '?';
    });

    document.getElementById('nwask-close').addEventListener('click', () => {
        panel.style.display = 'none';
        isActive = false;
    });

    // Inicialização
    console.log(`Nwask Helper ${version} carregado!`);
})();
