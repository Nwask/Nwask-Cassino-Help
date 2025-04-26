// ==UserScript==
// @name         Nwask Helper
// @namespace    http://nwask.github.io
// @version      1.0
// @description  Interface Simulada
// @match        *://*/*
// @grant        none
// ==/UserScript==

(()=>{
    // Evitar injeção dupla
    if(window.nwaskInjected) return;
    window.nwaskInjected=true;
    
    // Criar UI minimalista
    const panel=document.createElement('div');
    panel.innerHTML=`
        <style>
            .nwask-panel {
                position:fixed;
                top:20px;
                right:20px;
                background:#1a1a1a;
                color:white;
                padding:15px;
                border-radius:10px;
                z-index:9999;
                font-family:Arial;
                box-shadow:0 0 10px rgba(0,0,0,0.5);
            }
            .nwask-btn {
                background:#4CAF50;
                border:none;
                color:white;
                padding:8px 12px;
                margin:5px;
                border-radius:5px;
                cursor:pointer;
            }
        </style>
        <div class="nwask-panel">
            <h3 style="margin:0 0 10px 0;">Nwask Helper</h3>
            <div id="result">Clique para analisar</div>
            <button class="nwask-btn" id="nwask-analyze">🔍 Analisar</button>
            <button class="nwask-btn" id="nwask-close">❌ Fechar</button>
        </div>
    `;

    // Lógica interativa
    panel.querySelector('#nwask-analyze').addEventListener('click',()=>{
        const symbols=["🐯","🌟","🍒","💎"];
        panel.querySelector('#result').textContent=`Resultado: ${symbols[Math.floor(Math.random()*4)]}${symbols[Math.floor(Math.random()*4)]}${symbols[Math.floor(Math.random()*4]}`;
    });

    panel.querySelector('#nwask-close').addEventListener('click',()=>panel.remove());
    document.body.appendChild(panel);
})();
