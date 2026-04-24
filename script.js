document.addEventListener('DOMContentLoaded', () => {

    // --- INICIALIZAÇÃO DO CARROSSEL DE SERVIÇOS (SWIPER.JS) ---
    const serviceSliders = document.querySelectorAll('.service-slider');
    serviceSliders.forEach(slider => {
        new Swiper(slider, {
            loop: true,
            grabCursor: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                320: { slidesPerView: 1.2, spaceBetween: 20 },
                768: { slidesPerView: 2.5, spaceBetween: 30 },
                1024: { slidesPerView: 3.5, spaceBetween: 40 }
            }
        });
    });

    // --- NOVO CARROSSEL DE DEPOIMENTOS (SWIPER.JS) ---
    const testimonialSwiper = new Swiper('.testimonial-carousel', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // --- PLAYER DE ÁUDIO CUSTOMIZADO ---
    const audioPlayer = document.querySelector('.custom-audio-player');
    if (audioPlayer) {
        const audio = audioPlayer.querySelector('.testimonial-audio');
        const playBtn = audioPlayer.querySelector('.audio-play-btn');
        const playIcon = playBtn.querySelector('i');
        const progressFill = audioPlayer.querySelector('.audio-progress-fill');
        const progressBar = audioPlayer.querySelector('.audio-progress-bar');
        const currentTimeEl = audioPlayer.querySelector('.audio-current');
        const durationEl = audioPlayer.querySelector('.audio-duration');

        const fmt = (t) => {
            const m = Math.floor(t / 60);
            const s = Math.floor(t % 60).toString().padStart(2, '0');
            return `${m}:${s}`;
        };

        audio.addEventListener('loadedmetadata', () => {
            durationEl.textContent = fmt(audio.duration);
        });

        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playIcon.className = 'fas fa-pause';
                testimonialSwiper.autoplay.stop();
                testimonialSwiper.allowTouchMove = false;
            } else {
                audio.pause();
                playIcon.className = 'fas fa-play';
                testimonialSwiper.autoplay.start();
                testimonialSwiper.allowTouchMove = true;
            }
        });

        audio.addEventListener('timeupdate', () => {
            const pct = (audio.currentTime / audio.duration) * 100 || 0;
            progressFill.style.width = pct + '%';
            currentTimeEl.textContent = fmt(audio.currentTime);
        });

        audio.addEventListener('ended', () => {
            playIcon.className = 'fas fa-play';
            progressFill.style.width = '0%';
            currentTimeEl.textContent = '0:00';
            testimonialSwiper.autoplay.start();
            testimonialSwiper.allowTouchMove = true;
        });

        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            audio.currentTime = pct * audio.duration;
        });
    }

   // --- SCRIPT PARA O ACORDEÃO DO FAQ ---
const faqItems = document.querySelectorAll('.faq-item');
if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha todos os outros itens para ter apenas um aberto por vez
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Se o item clicado não estava ativo, abre ele.
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}
    // --- CÓDIGO PARA ATIVAR O TOQUE NO MOBILE (Seu código original mantido) ---
    function enableActiveStateOnMobile(selector) {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener('touchstart', () => {}, { passive: true });
        });
    }
    enableActiveStateOnMobile('.benefit-card, .included-card, .pricing-plan, .cta-button, .service-plan-card'); // Adicionado .service-plan-card

});

// --- SCRIPT PARA ROLAGEM SUAVE SEM ALTERAR A URL ---

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // 1. Impede o comportamento padrão do link
        e.preventDefault();

        // 2. Pega o ID do alvo (ex: '#planos')
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        // 3. Verifica se o elemento de destino existe na página
        if (targetElement) {
            // 4. Faz a rolagem suave até o elemento
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// --- SCRIPT PARA O BOTÃO "VOLTAR AO TOPO" ---
const backToTopButton = document.getElementById("back-to-top-button");

if (backToTopButton) {
    window.addEventListener("scroll", () => {
        // Se o usuário rolou mais de 300px para baixo
        if (window.pageYOffset > 300) {
            // Adiciona a classe 'show' para fazer o botão aparecer
            backToTopButton.classList.add("show");
        } else {
            // Remove a classe 'show' para esconder o botão
            backToTopButton.classList.remove("show");
        }
    });
}