const cards = document.querySelectorAll('.cardProyect, .perfilCard');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();

        const x = card.classList.contains('perfilCard') ? e.clientX : e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(card, {
            '--x': `${x}px`,
            '--y': `${y}px`,
            duration: 0.15,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseenter', () => {
        gsap.to(card, { '--opacity': 1, duration: 0.3 });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, { '--opacity': 0, duration: 0.3 });
    });
});
