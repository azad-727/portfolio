/* ============================================================
   AZAD PORTFOLIO — Main Application JavaScript
   Production-Grade | Zero Dependencies
   ============================================================ */

(function() {
    'use strict';

    // ---- PROJECT DATA ----
    const projectData = {
        civiclink: {
            title: 'CivicLink',
            problem: 'Citizens couldn\'t effectively report local infrastructure issues, and authorities lacked data to prioritize effectively. Also, there was a need for a secure, scalable system that could handle geospatial data.',
            solution: 'Architected a geographically-aware microservices platform with Spring Cloud Gateway acting as a centralized HS512-signed JWT API firewall. Engineered a zero-bottleneck AWS S3 Pre-Signed URL pipeline offloading 100% of media bandwidth to the AWS edge. Implemented MongoDB 2dsphere geospatial indexing for sub-millisecond spherical radius queries.',
            tech: ['Java', 'Spring Boot', 'Microservices', 'React.js', 'Vite', 'Python', 'FastAPI', 'Machine Learning', 'Computer Vision', 'YOLOv8', 'NLP', 'Generative AI', 'Prompt Engineering', 'Google Gemini API', 'MongoDB', 'Neo4j', 'Docker', 'Docker Compose', 'RESTful APIs', 'API Gateway', 'JWT', 'RBAC', 'AWS S3', 'Cloud Deployments', 'System Design'],
            github: 'https://github.com/azad-727/civiclink-core'
        },
        tverse: {
            title: 'Tverse',
            problem: 'E-commerce operations require too much manual, repetitive work. I needed to build a highly scalable, fault-tolerant WMS/OMS for a live garment warehouse business that could process thousands of orders.',
            solution: 'Architected and deployed a production-grade OMS & WMS handling more than 5,000+ orders to date with a current velocity of 4,000 orders per month. Engineered a multi-channel order fulfillment pipeline (Amazon, Flipkart, Meesho) with composite key idempotency. Designed a 6-stage atomic inventory state machine (APPROVED → SHIPPED) preventing leaks. Solved intense scaling problems by eliminating N+1 bottlenecks via JPA JOIN FETCH and building an async BI snapshot engine via @Scheduled CRON.',
            tech: ['Java', 'Spring Boot', 'React', 'MySQL', 'Docker', 'Scaling'],
            github: 'https://github.com/azad-727/Tverse',
            live: 'https://thalasiknitfab.com'
        },
        rituals: {
            title: 'Rituals',
            problem: 'People struggle to build and maintain consistent daily routines. Most habit trackers lack intelligent insights to keep users motivated.',
            solution: 'Engineered a containerized Java 21 LTS Spring Boot backend. Designed a NoSQL schema with custom lazy-instantiation algorithm. Decoupled volatile daily states from permanent analytics. Integrated Google Gemini API for an AI contextual "Oracle" feature. Architected a Sprint Canvas chrono-engine using browser visibility APIs.',
            tech: ['React', 'Vite', 'Tailwind CSS', 'Zustand', 'Recharts', 'Java', 'Spring Boot', 'MongoDB', 'Spring Security', 'JWT', 'Lombok', 'Maven'],
            github: 'https://github.com/azad-727/rituals-api'
        },
        tykkit: {
            title: 'Tykkit.fr',
            problem: 'Students miss campus events because information is scattered. Required a highly concurrent, scalable system to handle massive traffic spikes during ticket bookings.',
            solution: 'Architected a multi-tenant modular monolith for 150+ institutes enforcing campus-scoped isolation. Engineered Redis write-buffering for high-concurrency booking — atomic DECR operations return 202 ACCEPTED in milliseconds. Containerized via Docker with a Kubernetes deployment blueprint using Helm charts.',
            tech: ['Java', 'Spring Boot', 'Spring Security', 'Spring Data MongoDB', 'JWT', 'WebSockets', 'STOMP', 'MongoDB', 'Redis', 'Geospatial Queries', 'JavaScript', 'React.js', 'React Router', 'React Hook Form', 'React Leaflet', 'HTML5', 'CSS3', 'Multi-Tenant Architecture', 'Write-Buffering', 'Atomic Operations', 'Fan-out on Read', 'Background Processing', 'RESTful API Design', 'Git', 'Maven', 'Vercel', 'Render'],
            github: 'https://github.com/azad-727/tykkit.fr'
        },
        quickcommerce: {
            title: 'Quick Commerce Clone',
            problem: 'Understanding how rapid-delivery e-commerce platforms like Blinkit handle complex logistics, inventory, and real-time order management at scale.',
            solution: 'A Blinkit-inspired clone exploring the architecture of quick commerce — from real-time inventory to rapid delivery logistics. Focused on Supply Chain Management principles and high-availability database design.',
            tech: ['HTML', 'CSS', 'JavaScript', 'Spring Boot', 'REST API', 'Supply Chain Management'],
            github: 'https://github.com/azad-727/Final_Project_Quick_Commerce'
        },
        simonsay: {
            title: 'Simon Say',
            problem: 'Classic memory games lacked modern web interactivity and engaging visual feedback that keeps players coming back.',
            solution: 'A browser-based pattern memory game with progressive difficulty, smooth animations, and satisfying audio feedback. Incorporates Digital Marketing techniques to maximize user retention and engagement loops.',
            tech: ['JavaScript', 'CSS Animations', 'Web Audio API', 'Game Design'],
            github: 'https://github.com/azad-727/simon-say'
        }
    };

    // ---- DOM ELEMENTS ----
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const navbar = $('#navbar');
    const scrollProgress = $('#scrollProgress');
    const cursorDot = $('#cursorDot');
    const cursorOutline = $('#cursorOutline');
    const mobileToggle = $('#mobileMenuToggle');
    const mobileMenu = $('#mobileMenu');
    const modalOverlay = $('#modalOverlay');
    const modalContent = $('#modalContent');
    const modalClose = $('#modalClose');
    const contactForm = $('#contactForm');
    const gestureToggle = $('#gestureToggle');
    const gestureOverlay = $('#gestureOverlay');

    // ---- CUSTOM CURSOR ----
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    function initCursor() {
        if (window.innerWidth <= 768) return;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor follow
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;

            if (cursorDot) {
                cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
            }
            if (cursorOutline) {
                cursorOutline.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
            }
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effects
        const interactiveElements = $$('a, button, .project-card, .philosophy-card, .process-card, .skill-node, .tech-card, input, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (cursorOutline) cursorOutline.classList.add('cursor--hover');
            });
            el.addEventListener('mouseleave', () => {
                if (cursorOutline) cursorOutline.classList.remove('cursor--hover');
            });
        });
    }

    // ---- NAVBAR SCROLL ----
    function initNavbar() {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            // Add scrolled class
            if (scrollY > 50) {
                navbar.classList.add('navbar--scrolled');
            } else {
                navbar.classList.remove('navbar--scrolled');
            }

            // Update scroll progress
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollY / docHeight) * 100;
            if (scrollProgress) {
                scrollProgress.style.width = progress + '%';
            }

            // Active nav link
            const sections = $$('section[id]');
            sections.forEach(section => {
                const top = section.offsetTop - 100;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');
                const link = $(`.nav-link[href="#${id}"]`);
                if (link) {
                    if (scrollY >= top && scrollY < top + height) {
                        $$('.nav-link').forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                }
            });

            lastScroll = scrollY;
        });
    }

    // ---- MOBILE MENU ----
    function initMobileMenu() {
        if (!mobileToggle || !mobileMenu) return;

        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close on link click
        $$('.nav-mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // ---- SCROLL REVEAL ----
    function initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        $$('.reveal').forEach(el => observer.observe(el));
    }

    // ---- COUNTER ANIMATION ----
    function initCounters() {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count'));
                    if (isNaN(target)) return;
                    animateCounter(el, target);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        $$('[data-count]').forEach(el => counterObserver.observe(el));
    }

    function animateCounter(el, target) {
        let current = 0;
        const increment = target / 40;
        const duration = 1500;
        const stepTime = duration / 40;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.round(current);
        }, stepTime);
    }

    // ---- PROJECT MODALS ----
    function initProjectModals() {
        $$('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-project');
                const data = projectData[projectId];
                if (!data) return;
                openModal(data);
            });
        });

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) closeModal();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    function openModal(data) {
        if (!modalContent || !modalOverlay) return;

        const techTags = data.tech.map(t => `<span class="modal-tag">${t}</span>`).join('');
        const links = [];
        if (data.github) links.push(`<a href="${data.github}" target="_blank" rel="noopener" class="btn btn-primary" style="padding:12px 24px;font-size:13px;">View on GitHub →</a>`);
        if (data.live) links.push(`<a href="${data.live}" target="_blank" rel="noopener" class="btn btn-outline" style="padding:12px 24px;font-size:13px;">Live Demo →</a>`);

        modalContent.innerHTML = `
            <h2>${data.title}</h2>
            <h3>🔍 The Problem</h3>
            <p>${data.problem}</p>
            <h3>🚀 The Solution</h3>
            <p>${data.solution}</p>
            <h3>🛠️ Tech Stack</h3>
            <div class="modal-tags">${techTags}</div>
            ${links.length ? `<div style="display:flex;gap:12px;margin-top:24px;flex-wrap:wrap;">${links.join('')}</div>` : ''}
        `;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (modalOverlay) modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ---- SMOOTH SCROLL ----
    function initSmoothScroll() {
        $$('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                const target = $(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // ---- PARALLAX MOUNTAINS ----
    function initParallax() {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const back = $('.mountain-layer--back');
            const mid = $('.mountain-layer--mid');
            const front = $('.mountain-layer--front');

            if (back) back.style.transform = `translateY(${scrollY * 0.05}px)`;
            if (mid) mid.style.transform = `translateY(${scrollY * 0.03}px)`;
            if (front) front.style.transform = `translateY(${scrollY * 0.01}px)`;
        });
    }

    // ---- CONTACT FORM ----
    function initContactForm() {
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const message = contactForm.querySelector('#message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            // Simulate form submission
            const btn = contactForm.querySelector('.btn-submit');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = '✓ Message Sent!';
                btn.style.opacity = '1';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    contactForm.reset();
                }, 2500);
            }, 1500);
        });
    }

    // ---- GESTURE CONTROL (MediaPipe Hands) ----
    let gestureActive = false;
    let videoStream = null;
    let mpHands = null;
    let mpCamera = null;

    // Scroll state
    let targetScrollVelocity = 0;
    let currentScrollVelocity = 0;
    let lastThemeToggle = 0;

    function smoothScrollLoop() {
        if (targetScrollVelocity !== 0 || Math.abs(currentScrollVelocity) > 0.1) {
            currentScrollVelocity += (targetScrollVelocity - currentScrollVelocity) * 0.1;
            window.scrollBy(0, currentScrollVelocity);
        }
        requestAnimationFrame(smoothScrollLoop);
    }
    smoothScrollLoop();


    // ---- FINGER DETECTION HELPERS ----
    function mpGetDist(a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }

    function isFingerExtended(landmarks, tipIdx, pipIdx, mcpIdx) {
        const tip = landmarks[tipIdx];
        const pip = landmarks[pipIdx];
        const mcp = landmarks[mcpIdx];
        const wrist = landmarks[0];
        const tipDist = mpGetDist(tip, wrist);
        const pipDist = mpGetDist(pip, wrist);
        const mcpDist = mpGetDist(mcp, wrist);
        return tipDist > pipDist && tipDist > mcpDist * 0.9;
    }

    function processHandResults(results) {
        if (!gestureActive) return;

        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            const lm = results.multiHandLandmarks[0];

            const isThumbUp = mpGetDist(lm[4], lm[0]) > mpGetDist(lm[3], lm[0]) * 1.1;
            const isIndexUp = isFingerExtended(lm, 8, 6, 5);
            const isMiddleUp = isFingerExtended(lm, 12, 10, 9);
            const isRingUp = isFingerExtended(lm, 16, 14, 13);
            const isPinkyUp = isFingerExtended(lm, 20, 18, 17);

            if (window.azadParticleSystem && window.azadParticleSystem.isActive) {
                // Pass index finger tip (lm[8]). X is mirrored from webcam.
                window.azadParticleSystem.updateTarget(1 - lm[8].x, lm[8].y);
            }

            // ====== NORMAL MODE: Scroll & Theme gestures ======
            // Only index → Scroll Down
            if (isIndexUp && !isMiddleUp && !isRingUp && !isPinkyUp) {
                targetScrollVelocity = 15;
            }
            // Peace sign → Scroll Up
            else if (isIndexUp && isMiddleUp && !isRingUp && !isPinkyUp) {
                targetScrollVelocity = -15;
            }
            // Three fingers → Toggle Theme
            else if (isIndexUp && isMiddleUp && isRingUp && !isPinkyUp) {
                targetScrollVelocity = 0;
                const now = Date.now();
                if (now - lastThemeToggle > 2000) {
                    const root = document.documentElement;
                    const newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                    root.setAttribute('data-theme', newTheme);
                    lastThemeToggle = now;
                }
            }
            // Everything else → Stop
            else {
                targetScrollVelocity = 0;
            }
        } else {
            targetScrollVelocity = 0;
            if (window.azadParticleSystem && window.azadParticleSystem.isActive) {
                window.azadParticleSystem.updateTarget(null, null);
            }
        }
    }

    // ---- MEDIAPIPE INITIALIZATION ----
    async function initGestureControl() {
        if (!gestureToggle) return;

        gestureToggle.addEventListener('click', async () => {
            gestureActive = !gestureActive;
            gestureToggle.classList.toggle('active', gestureActive);

            if (gestureActive) {
                if (gestureOverlay) gestureOverlay.style.display = 'block';
                const btnOriginalText = gestureToggle.innerHTML;
                gestureToggle.innerHTML = '<span style="font-size:12px;">Loading...</span>';

                try {
                    const video = $('#gestureVideo');
                    if (!video) throw new Error('Video element not found');

                    // Request camera
                    videoStream = await navigator.mediaDevices.getUserMedia({
                        video: { facingMode: 'user', width: { ideal: 320 }, height: { ideal: 240 } }
                    });
                    video.srcObject = videoStream;
                    video.setAttribute('autoplay', '');
                    video.setAttribute('muted', '');
                    video.setAttribute('playsinline', '');
                    await video.play();

                    // Initialize MediaPipe Hands (only once)
                    if (!mpHands) {
                        mpHands = new Hands({
                            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`
                        });
                        mpHands.setOptions({
                            maxNumHands: 1,
                            modelComplexity: 0,   // 0 = lite (fastest, works on mobile)
                            minDetectionConfidence: 0.6,
                            minTrackingConfidence: 0.5
                        });
                        mpHands.onResults(processHandResults);
                    }

                    // Start camera loop
                    mpCamera = new Camera(video, {
                        onFrame: async () => {
                            if (gestureActive && mpHands) {
                                await mpHands.send({ image: video });
                            }
                        },
                        width: 320,
                        height: 240
                    });
                    await mpCamera.start();

                    gestureToggle.innerHTML = btnOriginalText;
                    if (window.azadParticleSystem) window.azadParticleSystem.start();
                    console.log('Gesture control activated (MediaPipe).');

                } catch (err) {
                    console.warn('Camera access denied or MediaPipe failed:', err);
                    alert('Could not start gesture control. Check camera permissions or ensure you are on HTTPS.');
                    gestureActive = false;
                    gestureToggle.classList.remove('active');
                    gestureToggle.innerHTML = btnOriginalText;
                    if (gestureOverlay) gestureOverlay.style.display = 'none';
                    if (window.azadParticleSystem) window.azadParticleSystem.stop();
                }
            } else {
                // Deactivate
                if (gestureOverlay) gestureOverlay.style.display = 'none';
                if (window.azadParticleSystem) window.azadParticleSystem.stop();
                if (mpCamera) {
                    mpCamera.stop();
                    mpCamera = null;
                }
                if (videoStream) {
                    videoStream.getTracks().forEach(track => track.stop());
                    videoStream = null;
                }

            }
        });
    }

    // ---- KEYBOARD NAVIGATION ----
    function initKeyboardNav() {
        const sections = ['hero', 'about', 'projects', 'process', 'skills', 'experience', 'contact'];
        let currentSection = 0;

        document.addEventListener('keydown', (e) => {
            if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                currentSection = Math.min(currentSection + 1, sections.length - 1);
                const target = $(`#${sections[currentSection]}`);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                currentSection = Math.max(currentSection - 1, 0);
                const target = $(`#${sections[currentSection]}`);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Update currentSection on scroll
        window.addEventListener('scroll', () => {
            sections.forEach((id, index) => {
                const section = $(`#${id}`);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        currentSection = index;
                    }
                }
            });
        });
    }

    // ---- TYPING ANIMATION ----
    function initTypingAnimation() {
        const titleEl = document.getElementById('heroNameTitle');
        if (!titleEl) return;
        
        const fullHTML = 'Singh Azad<br><span class="hero-title-accent">Mukesh.</span>';
        titleEl.innerHTML = '<span class="typing-cursor"></span>';
        
        let i = 0;
        let isTag = false;
        let text = '';
        
        function typeWriter() {
            if (i < fullHTML.length) {
                text += fullHTML.charAt(i);
                titleEl.innerHTML = text + '<span class="typing-cursor"></span>';
                
                if (fullHTML.charAt(i) === '<') isTag = true;
                if (fullHTML.charAt(i) === '>') isTag = false;
                
                i++;
                if (isTag) {
                    typeWriter();
                } else {
                    setTimeout(typeWriter, 80);
                }
            } else {
                titleEl.innerHTML = text + '<span class="typing-cursor" style="animation: blink 1s step-end infinite;"></span>';
            }
        }
        setTimeout(typeWriter, 400);
    }



    // ---- MANUAL CONTROLS ----
    function initManualControls() {
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                const root = document.documentElement;
                const newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                root.setAttribute('data-theme', newTheme);
            });
        }
    }

    // ---- VOICE ASSISTANT ----
    let recognition;
    let isVoiceActive = false;
    
    function initVoiceAssistant() {
        const voiceToggle = document.getElementById('voiceToggle');
        const voiceOverlay = document.getElementById('voiceOverlay');
        const voiceStatus = document.getElementById('voiceStatus');
        
        if (!voiceToggle || !voiceOverlay) return;

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            voiceToggle.style.display = 'none';
            return;
        }

        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase().replace(/[.,!?;:]/g, '');
            console.log("Voice Command: ", transcript);
            voiceStatus.innerText = "Heard: " + transcript;
            
            setTimeout(() => { voiceStatus.innerText = "Listening..."; }, 2000);

            if (transcript.includes('dark mode')) {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else if (transcript.includes('light mode')) {
                document.documentElement.setAttribute('data-theme', 'light');
            } else if (transcript.includes('project')) {
                const target = document.getElementById('projects');
                if (target) { target.scrollIntoView({ behavior: 'smooth' }); closeVoice(); }
            } else if (transcript.includes('skill')) {
                const target = document.getElementById('skills');
                if (target) { target.scrollIntoView({ behavior: 'smooth' }); closeVoice(); }
            } else if (transcript.includes('journey') || transcript.includes('experience')) {
                const target = document.getElementById('experience');
                if (target) { target.scrollIntoView({ behavior: 'smooth' }); closeVoice(); }
            } else if (transcript.includes('about') || transcript.includes('who am i')) {
                const target = document.getElementById('about');
                if (target) { target.scrollIntoView({ behavior: 'smooth' }); closeVoice(); }
            } else if (transcript.includes('contact') || transcript.includes('hire')) {
                const target = document.getElementById('contact');
                if (target) { target.scrollIntoView({ behavior: 'smooth' }); closeVoice(); }
            } else if (transcript.includes('down')) {
                window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
            } else if (transcript.includes('up')) {
                window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
            } else if (transcript.includes('close') || transcript.includes('stop')) {
                closeVoice();
            }
        };

        recognition.onerror = (e) => {
            console.error(e);
            voiceStatus.innerText = "Error, please try again...";
        };

        function closeVoice() {
            isVoiceActive = false;
            voiceOverlay.classList.remove('active');
            voiceToggle.style.color = 'var(--color-text)';
            recognition.stop();
        }

        voiceToggle.addEventListener('click', () => {
            isVoiceActive = !isVoiceActive;
            if (isVoiceActive) {
                voiceOverlay.classList.add('active');
                voiceToggle.style.color = 'var(--color-primary)';
                voiceStatus.innerText = "Listening... Say 'Projects', 'Dark Mode', or 'Scroll Down'";
                recognition.start();
            } else {
                closeVoice();
            }
        });
    }

    // ---- INITIALIZE EVERYTHING ----
    function init() {
        initCursor();
        initNavbar();
        initMobileMenu();
        initScrollReveal();
        initCounters();
        initProjectModals();
        initTypingAnimation();
        initSmoothScroll();
        initParallax();
        initContactForm();
        initGestureControl();
        initKeyboardNav();
        initManualControls();
        initVoiceAssistant();

        console.log('%c✦ Azad Portfolio Loaded ✦', 'color: #1A1A1A; font-size: 16px; font-weight: bold; font-family: monospace;');
        console.log('%cBuilt by Singh Azad Mukesh — Problem Solver & Full-Stack Developer', 'color: #888; font-size: 12px; font-family: monospace;');

        // 10 Second Popup for Gesture Control
        setTimeout(() => {
            if (!gestureActive) {
                const toast = document.createElement('div');
                toast.style.cssText = 'position:fixed;bottom:24px;right:24px;background:var(--color-bg);color:var(--color-text);padding:16px 24px;border-radius:12px;z-index:10000;box-shadow:var(--shadow-lg);font-family:inherit;font-size:14px;transform:translateY(150px);opacity:0;transition:all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);max-width:320px;border:1px solid var(--color-border);';
                toast.innerHTML = '<strong>✨ Magic Awaits!</strong><br><p style="margin-top:8px;color:var(--color-text-secondary);line-height:1.4;">Click the hand icon in the navbar to control this website with gestures.</p>';
                document.body.appendChild(toast);
                
                // Show toast
                setTimeout(() => { 
                    toast.style.transform = 'translateY(0)'; 
                    toast.style.opacity = '1'; 
                }, 100);
                
                // Hide and remove toast after 7 seconds
                setTimeout(() => { 
                    toast.style.transform = 'translateY(150px)'; 
                    toast.style.opacity = '0'; 
                    setTimeout(() => toast.remove(), 600); 
                }, 7000);
            }
        }, 10000);
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
