document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => observer.observe(el));

    // --- MAP LOGIC START ---
    const btnDescontao1 = document.getElementById('btn-descontao1');
    const btnDescontao3 = document.getElementById('btn-descontao3');
    const btnDescontao4 = document.getElementById('btn-descontao4');
    const btnDescontao5 = document.getElementById('btn-descontao5');
    
    const infoDescontao1 = document.getElementById('info-descontao1');
    const infoDescontao3 = document.getElementById('info-descontao3');
    const infoDescontao4 = document.getElementById('info-descontao4');
    const infoDescontao5 = document.getElementById('info-descontao5');
    
    const mapIframe = document.getElementById('map-iframe');

    // Agrupando em arrays para facilitar a manipulação
    const buttons = [btnDescontao1, btnDescontao3, btnDescontao4, btnDescontao5];
    const infos = [infoDescontao1, infoDescontao3, infoDescontao4, infoDescontao5];
    const maps = [
        "https://www.google.com/maps/embed?pb=!3m2!1spt-BR!2sbr!4v1774363321214!5m2!1spt-BR!2sbr!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ3NtdTNfWVE.!2m2!1d-24.70373329003876!2d-47.56002420833506!3f358.2757917053241!4f9.365420876717224!5f0.7820865974627469", // Descontão 1 (Avenida)
        "https://www.google.com/maps/embed?pb=!3m2!1spt-BR!2sbr!4v1774363443708!5m2!1spt-BR!2sbr!6m8!1m7!1sHeVhoBUySwZE2n8AyVz0HQ!2m2!1d-24.71041848787652!2d-47.56654792183525!3f7.63399133512263!4f3.7691946077849963!5f0.7820865974627469", // Descontão 3 (Rocio)
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1523.4590168355337!2d-47.55375966704524!3d-24.74690132765574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94daa3520bc291ef%3A0x935952aa2abe0233!2sFarma%20Conde!5e0!3m2!1spt-BR!2sbr!4v1774362598694!5m2!1spt-BR!2sbr", // Descontão 4 (Ilha Comprida)
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.4674681453334!2d-47.55737428936568!3d-24.71082665581438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94daa3ad53c3e91d%3A0xd4bf63dd548f815c!2sFarm%C3%A1cia%20-%20Farma%20Conde%20-%20Iguape%20-%20Tiradentes!5e0!3m2!1spt-BR!2sbr!4v1774363007078!5m2!1spt-BR!2sbr"  // Descontão 5 (Centro)
    ];

    // Classes exatas do Tailwind usadas no HTML
    const activeClass = ['bg-brand-cyan', 'text-white', 'shadow-glow', 'transform', 'scale-105', 'ring-2', 'ring-brand-cyan', 'ring-offset-2', 'ring-offset-slate-900'];
    const inactiveClass = ['bg-slate-800', 'text-slate-400', 'hover:bg-slate-700', 'hover:text-white'];

    // Função para trocar a unidade selecionada
    function changeLocation(selectedIndex) {
        if(mapIframe) mapIframe.src = maps[selectedIndex];

        buttons.forEach((btn, index) => {
            if (!btn || !infos[index]) return; // Prevenção de erros caso algum elemento não exista
            
            if (index === selectedIndex) {
                // Ativa botão e mostra info
                btn.classList.remove(...inactiveClass);
                btn.classList.add(...activeClass);
                infos[index].classList.remove('hidden');
                infos[index].classList.add('block');
            } else {
                // Desativa botão e esconde info
                btn.classList.remove(...activeClass);
                btn.classList.add(...inactiveClass);
                infos[index].classList.remove('block');
                infos[index].classList.add('hidden');
            }
        });
    }

    // Adiciona os eventos de clique
    if (btnDescontao1) btnDescontao1.addEventListener('click', () => changeLocation(0));
    if (btnDescontao3) btnDescontao3.addEventListener('click', () => changeLocation(1));
    if (btnDescontao4) btnDescontao4.addEventListener('click', () => changeLocation(2));
    if (btnDescontao5) btnDescontao5.addEventListener('click', () => changeLocation(3));

    // Inicializa a primeira unidade como ativa
    changeLocation(0);
    // --- MAP LOGIC END ---

    // Header Scroll
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) header.classList.add('shadow-md');
            else header.classList.remove('shadow-md');
        });
    }
});

// --- MODAL LOGIC ---
const modal = document.getElementById('privacy-modal');
const openBtn = document.getElementById('open-privacy');
const closeBtns = document.querySelectorAll('#close-modal, #close-modal-btn');

function toggleModal(show) {
    if (!modal) return;

    if (show) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.querySelector('div').classList.remove('scale-95');
            modal.querySelector('div').classList.add('scale-100');
        }, 10);
        document.body.style.overflow = 'hidden';
    } else {
        modal.classList.add('opacity-0');
        modal.querySelector('div').classList.remove('scale-100');
        modal.querySelector('div').classList.add('scale-95');
        document.body.style.overflow = '';

        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}

if (openBtn) {
    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleModal(true);
    });
}

if (closeBtns) {
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => toggleModal(false));
    });
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            toggleModal(false);
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
        toggleModal(false);
    }
});