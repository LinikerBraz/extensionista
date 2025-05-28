// Atualizar o ano atual no footer
document.addEventListener('DOMContentLoaded', function() {
    const currentYearElements = document.querySelectorAll('#current-year');
    const currentYear = new Date().getFullYear();
    
    currentYearElements.forEach(element => {
        element.textContent = currentYear;
    });
    
    // Inicializar o carrossel com intervalo de 5 segundos
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        const carousel = new bootstrap.Carousel(heroCarousel, {
            interval: 5000,
            pause: 'hover'
        });
    }
    
    // Adicionar smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Adicionar funcionalidade aos botões de compra (exemplo)
    const buyButtons = document.querySelectorAll('.btn-gold');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.trim() === 'Comprar') {
                alert('Funcionalidade de compra será implementada em breve!');
            }
        });
    });
});
