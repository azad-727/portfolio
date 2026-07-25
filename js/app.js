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
            tech: ['Java', 'Spring Cloud Gateway', 'MongoDB Atlas', 'AWS S3', 'React', 'Microservices'],
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
            tech: ['Java 21 LTS', 'Google Gemini API', 'React', 'MongoDB Atlas', 'Docker'],
            github: 'https://github.com/azad-727/rituals-api'
        },
        tykkit: {
            title: 'Tykkit.fr',
            problem: 'Students miss campus events because information is scattered. Required a highly concurrent, scalable system to handle massive traffic spikes during ticket bookings.',
            solution: 'Architected a multi-tenant modular monolith for 150+ institutes enforcing campus-scoped isolation. Engineered Redis write-buffering for high-concurrency booking — atomic DECR operations return 202 ACCEPTED in milliseconds. Containerized via Docker with a Kubernetes deployment blueprint using Helm charts.',
            tech: ['Java', 'Spring Boot', 'Redis', 'Kubernetes', 'Helm'],
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
    let drawModeActive = false;
    let videoStream = null;
    let mpHands = null;
    let mpCamera = null;

    // Scroll state
    let targetScrollVelocity = 0;
    let currentScrollVelocity = 0;
    let lastThemeToggle = 0;

    // EMA Smoothing Variables
    const EMA_ALPHA = 0.3; // Lower = smoother but more delay
    let smoothedLandmarks = null;

    function smoothScrollLoop() {
        if (targetScrollVelocity !== 0 || Math.abs(currentScrollVelocity) > 0.1) {
            currentScrollVelocity += (targetScrollVelocity - currentScrollVelocity) * 0.1;
            window.scrollBy(0, currentScrollVelocity);
        }
        requestAnimationFrame(smoothScrollLoop);
    }
    smoothScrollLoop();

    // ---- LETTER TRAIL & RECOGNITION ----
    const letterTrailCanvas = document.getElementById('letterTrailCanvas');
    const trailCtx = letterTrailCanvas ? letterTrailCanvas.getContext('2d') : null;
    let letterPath = [];
    const MIN_PATH_POINTS = 8;
    let isDrawingStroke = false;
    let idleTimeout = null;
    let lastValidPos = null;
    const MOVEMENT_THRESHOLD = 0.005;

    function resizeTrailCanvas() {
        if (!letterTrailCanvas) return;
        letterTrailCanvas.width = window.innerWidth;
        letterTrailCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeTrailCanvas);

    function clearTrail() {
        if (!trailCtx || !letterTrailCanvas) return;
        trailCtx.clearRect(0, 0, letterTrailCanvas.width, letterTrailCanvas.height);
    }

    function drawTrail() {
        if (!trailCtx || letterPath.length < 2) return;
        clearTrail();
        const w = letterTrailCanvas.width;
        const h = letterTrailCanvas.height;

        trailCtx.beginPath();
        trailCtx.moveTo((1 - letterPath[0].x) * w, letterPath[0].y * h);
        for (let i = 1; i < letterPath.length; i++) {
            trailCtx.lineTo((1 - letterPath[i].x) * w, letterPath[i].y * h);
        }
        trailCtx.strokeStyle = '#00ccff';
        trailCtx.lineWidth = 6;
        trailCtx.lineCap = 'round';
        trailCtx.lineJoin = 'round';
        trailCtx.shadowColor = '#00ccff';
        trailCtx.shadowBlur = 16;
        trailCtx.stroke();
    }

    function showGestureToast(msg, duration) {
        const existing = document.getElementById('gesture-toast');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.id = 'gesture-toast';
        toast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(0.8);background:var(--color-bg);color:var(--color-text);padding:20px 32px;border-radius:16px;z-index:10001;box-shadow:0 8px 32px rgba(0,0,0,0.4);font-family:inherit;font-size:18px;font-weight:600;text-align:center;border:1.5px solid var(--color-accent, #00ccff);opacity:0;transition:all 0.3s ease;';
        toast.innerHTML = msg;
        document.body.appendChild(toast);
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translate(-50%,-50%) scale(1)';
        });
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translate(-50%,-50%) scale(0.8)';
            setTimeout(() => toast.remove(), 300);
        }, duration || 2000);
    }

    function showDrawModeIndicator(active) {
        let indicator = document.getElementById('draw-mode-indicator');
        if (active) {
            if (!indicator) {
                indicator = document.createElement('div');
                indicator.id = 'draw-mode-indicator';
                indicator.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:rgba(0,204,255,0.15);color:#00ccff;padding:10px 24px;border-radius:30px;z-index:10001;font-family:inherit;font-size:14px;font-weight:600;text-align:center;border:1.5px solid #00ccff;backdrop-filter:blur(8px);letter-spacing:1px;animation:pulse-draw 1.5s infinite;';
                indicator.innerHTML = '✍️ DRAW MODE ACTIVE — Trace L, R, C, or P with your index finger';
                const style = document.createElement('style');
                style.id = 'draw-mode-style';
                style.textContent = '@keyframes pulse-draw{0%,100%{box-shadow:0 0 8px rgba(0,204,255,0.3)}50%{box-shadow:0 0 20px rgba(0,204,255,0.6)}}';
                document.head.appendChild(style);
                document.body.appendChild(indicator);
            }
        } else {
            if (indicator) indicator.remove();
            const style = document.getElementById('draw-mode-style');
            if (style) style.remove();
        }
    }

    function finishDrawing() {
        if (letterPath.length >= MIN_PATH_POINTS) {
            const letter = recognizeLetter(letterPath);
            if (letter) {
                executeLetterAction(letter);
            } else {
                showGestureToast('❓ Not recognized. Try: L, R, C, or P');
            }
        }
        letterPath = [];
        isDrawingStroke = false;
        setTimeout(() => { clearTrail(); }, 1200);
    }

    function recognizeLetter(path) {
        if (path.length < MIN_PATH_POINTS) return null;

        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        path.forEach(p => {
            minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
            minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
        });
        const rangeX = maxX - minX || 0.001;
        const rangeY = maxY - minY || 0.001;
        const norm = path.map(p => ({
            x: (p.x - minX) / rangeX,
            y: (p.y - minY) / rangeY
        }));

        let dirChangesX = 0, dirChangesY = 0;
        let prevDx = 0, prevDy = 0;
        for (let i = 1; i < norm.length; i++) {
            const dx = norm[i].x - norm[i-1].x;
            const dy = norm[i].y - norm[i-1].y;
            if (i > 1) {
                if (Math.sign(dx) !== 0 && Math.sign(dx) !== Math.sign(prevDx)) dirChangesX++;
                if (Math.sign(dy) !== 0 && Math.sign(dy) !== Math.sign(prevDy)) dirChangesY++;
            }
            prevDx = dx; prevDy = dy;
        }

        const startPt = norm[0];
        const endPt = norm[norm.length - 1];

        const topThird = norm.filter(p => p.y < 0.33);
        const botThird = norm.filter(p => p.y >= 0.66);
        const avgXMid = norm.filter(p => p.y >= 0.33 && p.y < 0.66).reduce((s,p,_,a) => s + p.x / a.length, 0) || 0.5;

        // L: Down then right
        if (startPt.y < 0.3 && endPt.y > 0.6 && endPt.x > 0.5 &&
            dirChangesX <= 3 && dirChangesY <= 3) {
            const mid = Math.floor(norm.length / 2);
            if (Math.abs(norm[mid].y - norm[0].y) > 0.3 && 
                Math.abs(norm[norm.length-1].x - norm[mid].x) > 0.2) return 'L';
        }

        // P: Down stroke + bump right at top only
        if (startPt.y < 0.35 && dirChangesX >= 1) {
            const rightTop = topThird.filter(p => p.x > 0.5).length;
            const rightBot = botThird.filter(p => p.x > 0.5).length;
            if (rightTop > topThird.length * 0.2 && rightBot < botThird.length * 0.3 &&
                !(endPt.x > 0.5 && endPt.y > 0.6)) return 'P';
        }

        // R: Like P but ends bottom-right (has a leg)
        if (startPt.y < 0.35 && dirChangesX >= 1) {
            const rightTop = topThird.filter(p => p.x > 0.5).length;
            if (rightTop > topThird.length * 0.2 && endPt.x > 0.5 && endPt.y > 0.6) return 'R';
        }

        // C: Arc — starts right, curves left, ends right
        if (dirChangesX >= 1 && dirChangesY <= 5 && startPt.x > 0.4 && avgXMid < 0.5 && endPt.x > 0.3) {
            if (norm.filter(p => p.x < 0.4).length > norm.length * 0.2) return 'C';
        }
        return null;
    }

    function executeLetterAction(letter) {
        const actions = {
            'L': { url: 'https://linkedin.com/in/azad-727', label: '🔗 Opening LinkedIn...' },
            'R': { url: 'https://drive.google.com/file/d/1Spi1A-WnD8az35EzA-en18wNk3JS-3Yb/view', label: '📄 Opening Resume...' },
            'C': { url: 'mailto:azad.mukesh727@gmail.com', label: '✉️ Opening Email...' },
            'P': { section: 'projects', label: '🚀 Scrolling to Projects...' }
        };
        const action = actions[letter];
        if (!action) return;

        showGestureToast(action.label);
        setTimeout(() => {
            if (action.url) window.open(action.url, '_blank');
            else if (action.section) {
                const el = document.getElementById(action.section);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
        }, 600);
    }

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
        if (!gestureActive && !drawModeActive) return;

        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            const rawLandmarks = results.multiHandLandmarks[0];

            // Apply EMA Smoothing to landmarks
            if (!smoothedLandmarks) {
                smoothedLandmarks = JSON.parse(JSON.stringify(rawLandmarks));
            } else {
                for (let i = 0; i < rawLandmarks.length; i++) {
                    smoothedLandmarks[i].x = EMA_ALPHA * rawLandmarks[i].x + (1 - EMA_ALPHA) * smoothedLandmarks[i].x;
                    smoothedLandmarks[i].y = EMA_ALPHA * rawLandmarks[i].y + (1 - EMA_ALPHA) * smoothedLandmarks[i].y;
                    smoothedLandmarks[i].z = EMA_ALPHA * rawLandmarks[i].z + (1 - EMA_ALPHA) * smoothedLandmarks[i].z;
                }
            }

            const lm = smoothedLandmarks;
            const isIndexUp = isFingerExtended(lm, 8, 6, 5);
            const isMiddleUp = isFingerExtended(lm, 12, 10, 9);
            const isRingUp = isFingerExtended(lm, 16, 14, 13);
            const isPinkyUp = isFingerExtended(lm, 20, 18, 17);

            // ====== DRAW MODE LOGIC ======
            if (drawModeActive) {
                if (isIndexUp && !isMiddleUp && !isRingUp && !isPinkyUp) {
                    const tip = lm[8];
                    if (!lastValidPos || mpGetDist(lastValidPos, tip) > MOVEMENT_THRESHOLD) {
                        isDrawingStroke = true;
                        letterPath.push({ x: tip.x, y: tip.y });
                        lastValidPos = { x: tip.x, y: tip.y };
                        drawTrail();
                        if (idleTimeout) clearTimeout(idleTimeout);
                        idleTimeout = setTimeout(() => {
                            if (isDrawingStroke) finishDrawing();
                        }, 1000); // 1 second of stillness triggers recognition
                    }
                }
                return;
            }

            // ====== SCROLL MODE LOGIC ======
            if (gestureActive) {
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
                // Stop
                else {
                    targetScrollVelocity = 0;
                }
            }
        } else {
            smoothedLandmarks = null;
            targetScrollVelocity = 0;
        }
    }

    // ---- MEDIAPIPE INITIALIZATION ----
    async function startCamera() {
        try {
            const video = $('#gestureVideo');
            if (!video) throw new Error('Video element not found');

            if (!videoStream) {
                videoStream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'user', width: { ideal: 320 }, height: { ideal: 240 } }
                });
                video.srcObject = videoStream;
                video.setAttribute('autoplay', '');
                video.setAttribute('muted', '');
                video.setAttribute('playsinline', '');
                await video.play();
            }

            if (!mpHands) {
                mpHands = new Hands({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}` });
                mpHands.setOptions({
                    maxNumHands: 1,
                    modelComplexity: 0,
                    minDetectionConfidence: 0.6,
                    minTrackingConfidence: 0.5
                });
                mpHands.onResults(processHandResults);
            }

            if (!mpCamera) {
                mpCamera = new Camera(video, {
                    onFrame: async () => {
                        if ((gestureActive || drawModeActive) && mpHands) {
                            await mpHands.send({ image: video });
                        }
                    },
                    width: 320,
                    height: 240
                });
                await mpCamera.start();
            }
            return true;
        } catch (err) {
            console.warn('Camera failed:', err);
            alert('Could not start camera. Check permissions or ensure HTTPS.');
            return false;
        }
    }

    function stopCamera() {
        if (mpCamera) { mpCamera.stop(); mpCamera = null; }
        if (videoStream) { videoStream.getTracks().forEach(t => t.stop()); videoStream = null; }
        smoothedLandmarks = null;
    }

    async function initGestureControl() {
        const gestureToggle = document.getElementById('gestureToggle');
        const drawToggle = document.getElementById('drawToggle');
        if (!gestureToggle || !drawToggle) return;

        gestureToggle.addEventListener('click', async () => {
            if (drawModeActive) drawToggle.click(); // Turn off draw mode if on
            
            gestureActive = !gestureActive;
            gestureToggle.classList.toggle('active', gestureActive);

            if (gestureActive) {
                if (gestureOverlay) gestureOverlay.style.display = 'block';
                document.getElementById('gestureInfoText').innerHTML = '<p>☝️ Down | ✌️ Up | 3️⃣ Theme</p>';
                const btnOriginalText = gestureToggle.innerHTML;
                gestureToggle.innerHTML = '<span style="font-size:12px;">Loading...</span>';
                
                const success = await startCamera();
                if (!success) {
                    gestureActive = false;
                    gestureToggle.classList.remove('active');
                    if (gestureOverlay) gestureOverlay.style.display = 'none';
                }
                gestureToggle.innerHTML = btnOriginalText;
            } else {
                if (gestureOverlay) gestureOverlay.style.display = 'none';
                if (!drawModeActive) stopCamera();
            }
        });

        drawToggle.addEventListener('click', async () => {
            if (gestureActive) gestureToggle.click(); // Turn off scroll mode if on

            drawModeActive = !drawModeActive;
            drawToggle.classList.toggle('active', drawModeActive);

            if (drawModeActive) {
                if (letterTrailCanvas) {
                    resizeTrailCanvas();
                    letterTrailCanvas.style.display = 'block';
                }
                const btnOriginalText = drawToggle.innerHTML;
                drawToggle.innerHTML = '<span style="font-size:12px;">Loading...</span>';
                
                const success = await startCamera();
                if (success) {
                    showDrawModeIndicator(true);
                } else {
                    drawModeActive = false;
                    drawToggle.classList.remove('active');
                    if (letterTrailCanvas) letterTrailCanvas.style.display = 'none';
                }
                drawToggle.innerHTML = btnOriginalText;
            } else {
                if (letterTrailCanvas) letterTrailCanvas.style.display = 'none';
                showDrawModeIndicator(false);
                clearTrail();
                letterPath = [];
                if (!gestureActive) stopCamera();
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
                toast.innerHTML = '<strong>✨ Magic Awaits!</strong><br><p style="margin-top:8px;color:var(--color-text-secondary);line-height:1.4;">Click the hand icon in the navbar to control this website with gestures. Draw <b>L</b> for LinkedIn, <b>R</b> for Resume, <b>C</b> for Contact, <b>P</b> for Projects!</p>';
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
