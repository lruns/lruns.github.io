// Проверяем, что это не мобильное устройство, чтобы не запускать сложную анимацию
const isMobile = window.matchMedia("(max-width: 768px)").matches;

if (!isMobile) {
    const spheres = document.querySelectorAll('.sphere');

    // Каждой сфере задаем случайные параметры для уникальности движения
    spheres.forEach(sphere => {
        sphere.dataset.speedX = (Math.random() - 0.5) * 0.4;
        sphere.dataset.speedY = (Math.random() - 0.5) * 0.4;
        sphere.dataset.amplitudeX = Math.random() * 15 + 5;
        sphere.dataset.amplitudeY = Math.random() * 15 + 5;
    });

    let time = 0;

    function animate() {
        time += 0.05;

        spheres.forEach(sphere => {
            // Игнорируем центральную сферу, чтобы она оставалась более стабильной
            if (!sphere.classList.contains('center-sphere')) {
                const baseX = 0;
                const baseY = 0;

                const moveX = baseX + Math.sin(time * parseFloat(sphere.dataset.speedX)) * parseFloat(sphere.dataset.amplitudeX);
                const moveY = baseY + Math.cos(time * parseFloat(sphere.dataset.speedY)) * parseFloat(sphere.dataset.amplitudeY);

                // Применяем transform, сохраняя изначальные сдвиги из CSS (если они есть)
                // Это важно для сфер, которые уже сдвинуты (как .youtube)
                const baseTransform = getComputedStyle(sphere).transform;
                if (baseTransform === 'none') {
                    sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
                } else {
                    // Эта логика сложнее, для простоты просто переназначаем transform
                    // Так как у нас нет сложных изначальных transform, это сработает
                     sphere.style.transform = `${sphere.classList.contains('youtube') ? 'translateY(-50%)' : ''} translate(${moveX}px, ${moveY}px)`;
                }
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
}