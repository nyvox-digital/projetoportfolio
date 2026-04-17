document.addEventListener('DOMContentLoaded', () => {
    function showBlockedActionAlert() {
        alert('⛔ Ação bloqueada! Este conteúdo está protegido contra cópia e download.');
    }

    // Bloquear clique direito
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showBlockedActionAlert();
    });

    // Bloquear atalhos de teclado perigosos
    document.addEventListener('keydown', (e) => {
        // F12 (DevTools), Ctrl+Shift+I, Ctrl+Shift+C (Inspetor), Ctrl+C (Cópia)
        if (e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && ['i', 'c'].includes(e.key.toLowerCase())) ||
            (e.ctrlKey && ['c', 'u', 's', 'p'].includes(e.key.toLowerCase()))) {
            e.preventDefault();
            showBlockedActionAlert();
        }
        // Print Screen
        if (e.key === 'PrintScreen') {
            e.preventDefault();
            navigator.clipboard.writeText('');
            showBlockedActionAlert();
        }
    });

    // Bloquear cópia de texto
    document.addEventListener('copy', (e) => {
        e.preventDefault();
        showBlockedActionAlert();
    });

    // Bloquear drag and drop de imagens
    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            showBlockedActionAlert();
        }
    });

    // Bloquear seleção de imagens
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('mousedown', (e) => {
            e.preventDefault();
        });
        img.style.userSelect = 'none';
        img.style.pointerEvents = 'auto';
    });

    // Bloquear print
    window.addEventListener('beforeprint', (e) => {
        e.preventDefault();
        showBlockedActionAlert();
    });

    // CSS para desabilitar print
    const style = document.createElement('style');
    style.textContent = `
        @media print {
            body { display: none; }
        }
        img {
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
});