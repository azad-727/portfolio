class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.target = { x: null, y: null };
        this.isActive = false;
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.initParticles();
    }

    initParticles() {
        this.particles = [];
        const numParticles = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 10000), 120);
        
        for (let i = 0; i < numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                radius: Math.random() * 2 + 1
            });
        }
    }

    updateTarget(x, y) {
        // x and y should be normalized coordinates from MediaPipe (0 to 1)
        if (x === null || y === null) {
            this.target.x = null;
            this.target.y = null;
        } else {
            // MediaPipe X is mirrored usually, but let's map directly to canvas width/height first
            // We'll let app.js handle the mirroring logic if necessary.
            this.target.x = x * this.canvas.width;
            this.target.y = y * this.canvas.height;
        }
    }

    start() {
        if (this.isActive) return;
        this.isActive = true;
        this.canvas.style.opacity = '1';
        this.initParticles();
        this.animate();
    }

    stop() {
        this.isActive = false;
        this.canvas.style.opacity = '0';
        setTimeout(() => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }, 500); // Wait for CSS transition
    }

    animate() {
        if (!this.isActive) return;
        requestAnimationFrame(() => this.animate());
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
        const colorBase = isDarkTheme ? '255, 255, 255' : '26, 26, 26';
        
        // Update and draw particles
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            
            // Interaction with hand target (Repel effect)
            if (this.target.x !== null && this.target.y !== null) {
                let dx = p.x - this.target.x;
                let dy = p.y - this.target.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                let minDist = 150;
                
                if (dist < minDist) {
                    let force = (minDist - dist) / minDist;
                    p.vx += (dx / dist) * force * 1.5;
                    p.vy += (dy / dist) * force * 1.5;
                }
            }
            
            // Apply friction
            p.vx *= 0.98;
            p.vy *= 0.98;
            
            // Base velocity recovery
            p.vx += (Math.random() - 0.5) * 0.1;
            p.vy += (Math.random() - 0.5) * 0.1;

            // Cap max speed
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (speed > 4) {
                p.vx = (p.vx / speed) * 4;
                p.vy = (p.vy / speed) * 4;
            }
            
            p.x += p.vx;
            p.y += p.vy;
            
            // Bounce off edges
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
            
            p.x = Math.max(0, Math.min(this.canvas.width, p.x));
            p.y = Math.max(0, Math.min(this.canvas.height, p.y));
            
            // Draw node
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${colorBase}, 0.5)`;
            this.ctx.fill();
            
            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                let p2 = this.particles[j];
                let dx = p.x - p2.x;
                let dy = p.y - p2.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(${colorBase}, ${0.2 * (1 - dist / 100)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }
}

// Global instance
window.azadParticleSystem = null;

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // Canvas might be injected dynamically or already present
    setTimeout(() => {
        if(document.getElementById('particleCanvas')) {
            window.azadParticleSystem = new ParticleSystem();
        }
    }, 100);
});
