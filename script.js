document.addEventListener('DOMContentLoaded', () => {
    // Cursor Glow Effect
    const cursorGlow = document.getElementById('cursorGlow');
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Particles Background
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    let menuOpen = false;

    mobileMenuBtn.addEventListener('click', () => {
        menuOpen = !menuOpen;
        mobileMenu.classList.toggle('active', menuOpen);
        document.body.style.overflow = menuOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
        link.addEventListener('click', () => {
            menuOpen = false;
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, parseInt(delay));
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

    // Counter Animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                const numberEl = entry.target.querySelector('.stat-number');
                animateCounter(numberEl, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-animate="counter"]').forEach(el => counterObserver.observe(el));

    function animateCounter(el, target) {
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Active Navigation Link
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (scrollY >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    });

    // Tilt Effect on Cards
    document.querySelectorAll('.solution-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Magnetic Button Effect
    document.querySelectorAll('.btn-cta, .btn-primary').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // Parallax Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero-content');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - scrolled / 800;
        }
    });

    // Modal
    const modalOverlay = document.getElementById('modalOverlay');
    const openModal = document.getElementById('openModal');
    const closeModal = document.getElementById('closeModal');
    const editBtn = document.getElementById('editBtn');
    const copyBtn = document.getElementById('copyBtn');
    const modalMessage = document.getElementById('modalMessage');

    openModal.addEventListener('click', () => {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeModal.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    let isEditing = false;
    editBtn.addEventListener('click', () => {
        isEditing = !isEditing;
        modalMessage.contentEditable = isEditing;
        editBtn.classList.toggle('active', isEditing);
        editBtn.innerHTML = isEditing 
            ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Listo'
            : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Editar';
        if (isEditing) {
            modalMessage.focus();
        }
    });

    copyBtn.addEventListener('click', () => {
        const text = modalMessage.innerText;
        const email = 'bleendcompanyoficial@gmail.com';
        const subject = encodeURIComponent('Quiero ser parte de Bleend');
        const body = encodeURIComponent(text);
        window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
        
        copyBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Abriendo Gmail...';
        setTimeout(() => {
            copyBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> Copiar y enviar';
        }, 2000);
    });

    // Chatbot
    const chatbotBtn = document.getElementById('openChatbot');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatInput = document.getElementById('chatInput');
    const sendChat = document.getElementById('sendChat');
    const chatMessages = document.getElementById('chatMessages');

    chatbotBtn.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
    });

    closeChatbot.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });

    const chatResponses = {
        'hola': '¡Hola! Bienvenido a Bleend. ¿Cómo puedo ayudarte hoy?',
        'servicios': 'Ofrecemos tres servicios principales:\n\n1. **Diseño Web Premium** - Interfaces que convierten\n2. **Automatización** - Sistemas 24/7\n3. **Infraestructura** - Base para escalar\n\n¿Te interesa alguno en particular?',
        'precios': 'Nuestros precios se adaptan a las necesidades de cada proyecto. Te recomiendo contactarnos directamente para una cotización personalizada. ¿Quieres que te ayude con eso?',
        'contacto': 'Puedes contactarnos a través de:\n\n📧 bleendcompanyoficial@gmail.com\n📞 +1 809 xxx-xxxx\n\nO haz clic en "Comenzar ahora" para enviarnos un mensaje directo.',
        'proyectos': 'Cada proyecto es único y lo tratamos como tal. Nos enfocamos en resultados, no en números. ¿Quieres saber cómo podemos ayudarte con tu marca?',
        'automatización': 'Nuestras automatizaciones incluyen:\n\n• Flujos de trabajo automatizados\n• Sistemas de seguimiento de clientes\n• Procesos de venta automatizados\n• Integraciones con herramientas existentes\n\n¿Quieres saber más sobre algún aspecto específico?',
        'diseño': 'Creamos diseños web premium que:\n\n• Convierten visitantes en clientes\n• Reflejan la esencia de tu marca\n• Son rápidos y responsivos\n• Generan confianza\n\n¿Tienes un proyecto en mente?',
        'quién': 'Somos Bleend, una empresa enfocada en construir el motor digital para marcas que quieren escalar sin excusas. Combinamos diseño, automatización e infraestructura.',
        'gracias': '¡De nada! Si tienes más preguntas, estoy aquí para ayudarte. ¡Éxito con tu marca!',
        'default': 'Interesante pregunta. Para darte la mejor respuesta, te recomiendo contactarnos directamente a bleendcompanyoficial@gmail.com o haz clic en "Comenzar ahora". ¿Hay algo más en lo que pueda ayudarte?'
    };

    function getResponse(input) {
        const lower = input.toLowerCase().trim();
        
        if (lower.includes('hola') || lower.includes('hey') || lower.includes('buenas')) {
            return chatResponses['hola'];
        }
        if (lower.includes('servicio') || lower.includes('qué hacen') || lower.includes('qué ofrecen') || lower.includes('que hacen') || lower.includes('que ofrecen')) {
            return chatResponses['servicios'];
        }
        if (lower.includes('precio') || lower.includes('costo') || lower.includes('cuánto') || lower.includes('cotización') || lower.includes('presupuesto')) {
            return chatResponses['precios'];
        }
        if (lower.includes('contacto') || lower.includes('correo') || lower.includes('email') || lower.includes('teléfono') || lower.includes('whatsapp')) {
            return chatResponses['contacto'];
        }
        if (lower.includes('proyecto') || lower.includes('trabajo') || lower.includes('portfolio')) {
            return chatResponses['proyectos'];
        }
        if (lower.includes('automatiz')) {
            return chatResponses['automatización'];
        }
        if (lower.includes('diseño') || lower.includes('web') || lower.includes('página') || lower.includes('sitio')) {
            return chatResponses['diseño'];
        }
        if (lower.includes('quién') || lower.includes('que son') || lower.includes('que es bleend') || lower.includes('qué es bleend')) {
            return chatResponses['quién'];
        }
        if (lower.includes('gracias') || lower.includes('thank')) {
            return chatResponses['gracias'];
        }
        
        return chatResponses['default'];
    }

    function addMessage(text, isUser) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chatbot-message ${isUser ? 'user' : 'bot'}`;
        msgDiv.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p>`;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleSend() {
        const input = chatInput.value.trim();
        if (!input) return;
        
        addMessage(input, true);
        chatInput.value = '';
        
        setTimeout(() => {
            const response = getResponse(input);
            addMessage(response, false);
        }, 600);
    }

    sendChat.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});
