// Scroll suave para âncoras
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se há hash na URL ao carregar a página
    if(window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if(targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }, 100);
        }
    }

    // Configurar scroll suave para todos os links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Se for um link para outra página, não prevenir o comportamento padrão
            if(this.getAttribute('href').startsWith('#') && 
               window.location.pathname === this.pathname) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if(targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Atualizar URL sem recarregar a página
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

    // Ativar link atual na navbar baseado na seção visível
    function setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('href') === `#${sectionId}` || 
                       link.getAttribute('href').endsWith(`#${sectionId}`)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Configurar observador de scroll
    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Chamar na carga inicial
});