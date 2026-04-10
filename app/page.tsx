"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Shield, Cpu, Cloud, Code, Database, Server, 
  Lock, Network, ChevronRight, Mail, 
  ExternalLink, FileText, Award, Crosshair, MapPin, Target, Zap,
  User, Briefcase
} from 'lucide-react';

// --- CUSTOM BRAND ICONS ---
const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

// --- DATA ---
const personalInfo = {
  name: "Daouda David COULIBALY",
  alias: "Dave454545",
  title: "Ingénieur d'État en Réseaux Intelligents & Cybersécurité",
  location: "Toulouse, France",
  email: "coulibalydavid31@gmail.com",
  phone: "+33 7 53 29 02 44",
  about: "Actuellement en dernière année du cycle d'Ingénieur d'État, et en stage de recherche au LAAS-CNRS. Je développe un fort intérêt pour l'architecture des systèmes distribués, la cybersécurité et l'optimisation des ressources informatiques. Mon but : bâtir des infrastructures critiques, résilientes et invulnérables."
};

const experience = [
  {
    role: "Chercheur Orchestration Cloud & Optimisation",
    company: "LAAS-CNRS",
    location: "Toulouse, France",
    date: "Fév. 2026 - Août 2026",
    desc: "Conception et implémentation d'algorithmes d'optimisation (génétiques et métaheuristiques) pour le placement dynamique de services réseaux (VNF). Déploiement Edge/Cloud (Kubernetes, OSM) et Green Networking."
  },
  {
    role: "Ingénieur Full Stack & Sécurité",
    company: "INNOV CENTER",
    location: "Casablanca, Maroc",
    date: "Juil. 2025 - Sept. 2025",
    desc: "Implémentation de mécanismes de sécurité avancés (JWT, AES) sur architecture Spring Boot. Audits SAST et correction proactive des vulnérabilités (OWASP Top 10)."
  },
  {
    role: "Analyste Cybersécurité (Blue Team / Offensif)",
    company: "ISMACORP",
    location: "Bamako, Mali",
    date: "Août 2024 - Sept. 2024",
    desc: "Déploiement SOC Open Source (Wazuh, Suricata) pour >50 nœuds. Pentests internes et server hardening Linux."
  }
];

const skills = [
  { category: "Cloud & DevOps", icon: <Cloud className="w-6 h-6 text-current"/>, items: ["Kubernetes", "Docker", "OSM", "AWS", "GitLab CI/CD", "Terraform"] },
  { category: "Cybersécurité", icon: <Shield className="w-6 h-6 text-current"/>, items: ["Wazuh", "Suricata", "Defect Dojo", "Pentest", "MITRE ATT&CK", "Forensics"] },
  { category: "Dev & IA", icon: <Code className="w-6 h-6 text-current"/>, items: ["Python", "React", "Node.js", "Spring Boot", "Machine Learning", "API LLM"] },
  { category: "Réseaux", icon: <Network className="w-6 h-6 text-current"/>, items: ["Admin Linux", "TCP/IP", "SDN/NFV", "Cisco", "BGP/OSPF"] }
];

const projects = [
  {
    title: "SOC Simulation & Threat Hunting",
    tech: ["ELK", "Wazuh", "TheHive"],
    desc: "Mise en place d'une chaîne complète de collecte et d'analyse de logs avec mapping des attaques (MITRE)."
  },
  {
    title: "Orchestration DevSecOps",
    tech: ["GitLab CI", "Docker", "Keycloak"],
    desc: "Broker IAM pour accès Defect Dojo. Intégration de scanners de sécurité open source dans les pipelines."
  },
  {
    title: "Malware Analysis Pipeline",
    tech: ["Python", "Scikit-learn", "LLM"],
    desc: "Pipeline hybride : ML pour l'analyse statique et IA Générative pour la synthèse de rapports d'incidents."
  },
  {
    title: "Kreativ Academy Web Platform",
    tech: ["React", "AWS", "WAF"],
    desc: "Architecture Cloud scalable (EC2, S3, RDS) sécurisée par WAF pour une plateforme éducative."
  }
];

const stats = [
  { label: "Security Labs", value: 25, icon: <Lock className="w-6 h-6 md:w-8 md:h-8"/> },
  { label: "Vulnerabilities Exploited", value: 15, icon: <Crosshair className="w-6 h-6 md:w-8 md:h-8"/> },
  { label: "Networks Secured", value: 10, icon: <Shield className="w-6 h-6 md:w-8 md:h-8"/> },
  { label: "Cloud Deployments", value: 6, icon: <Cloud className="w-6 h-6 md:w-8 md:h-8"/> }
];

// --- THEME CONFIGURATION (THE 3 MAPS) ---
const THEMES = {
  blue: {
    primary: '#00f0ff',
    primaryGlow: 'rgba(0, 240, 255, 0.5)',
    alert: '#ff003c',
    dark: '#050510',
    particleFill: 'rgba(0, 119, 255, 0.3)',
    particleStroke: (dist) => `rgba(0, 240, 255, ${0.8 - dist/150})`,
    particleSpeed: 1,
    mapName: "BLUE_LINK // SECURE_NET"
  },
  red: {
    primary: '#ff003c',
    primaryGlow: 'rgba(255, 0, 60, 0.5)',
    alert: '#00f0ff',
    dark: '#140005',
    particleFill: 'rgba(255, 0, 60, 0.4)',
    particleStroke: (dist) => `rgba(255, 0, 60, ${1 - dist/200})`,
    particleSpeed: 3.5,
    mapName: "RED_TEAM_BREACH // THREAT_DETECTED"
  },
  green: {
    primary: '#00ff66',
    primaryGlow: 'rgba(0, 255, 102, 0.5)',
    alert: '#ff003c',
    dark: '#020d05',
    particleFill: 'rgba(0, 255, 100, 0.3)',
    particleStroke: (dist) => `rgba(0, 255, 100, ${0.8 - dist/150})`,
    particleSpeed: 0.5,
    mapName: "SYSTEM_CORE // ROOT_ACCESS"
  }
};

// --- CUSTOM CSS FOR HUD & OPEN WORLD EFFECTS ---
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&display=swap');

  html, body {
    background-color: var(--dark);
    color: #fff;
    font-family: 'Rajdhani', sans-serif;
    overflow-x: hidden;
    transition: background-color 0.5s ease;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  
  /* Hide default cursor on desktop to use custom crosshair */
  @media (pointer: fine) {
    body, a, button {
      cursor: none !important;
    }
  }

  /* Show normal cursor on touch devices */
  @media (pointer: coarse) {
    .custom-cursor, .cursor-follower { display: none !important; }
    body, a, button { cursor: auto !important; }
  }

  .font-mono-cyber { font-family: 'Share Tech Mono', monospace; }

  /* Scanlines & Vignette Overlay */
  .hud-overlay {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: 
      linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), 
      linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
    background-size: 100% 2px, 3px 100%;
    pointer-events: none;
    z-index: 50;
    opacity: 0.3;
    box-shadow: inset 0 0 150px rgba(0,0,0,0.9);
  }

  /* Custom Cursor */
  .custom-cursor {
    position: fixed; top: 0; left: 0; width: 30px; height: 30px;
    border: 2px solid var(--primary); border-radius: 50%;
    transform: translate(-50%, -50%); pointer-events: none;
    z-index: 9999; transition: width 0.2s, height 0.2s, background-color 0.2s, border-color 0.5s;
    mix-blend-mode: difference;
  }
  .custom-cursor::before, .custom-cursor::after {
    content: ''; position: absolute; background: var(--primary); transition: background-color 0.5s;
  }
  .custom-cursor::before { top: -10px; left: 13px; width: 2px; height: 48px; }
  .custom-cursor::after { top: 13px; left: -10px; width: 48px; height: 2px; }
  
  .custom-cursor.clicking {
    width: 20px; height: 20px; background-color: var(--primary-glow); border-color: var(--alert);
  }
  .custom-cursor.clicking::before, .custom-cursor.clicking::after { background: var(--alert); }

  .cursor-follower {
    position: fixed; top: 0; left: 0; width: 8px; height: 8px;
    background: var(--primary); border-radius: 50%;
    transform: translate(-50%, -50%); pointer-events: none;
    z-index: 9998; transition: top 0.1s ease-out, left 0.1s ease-out, background-color 0.5s;
  }

  /* Glitch Text Effect */
  .glitch { position: relative; color: white; }
  .glitch::before, .glitch::after {
    content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: transparent;
  }
  .glitch::before {
    left: 2px; text-shadow: -2px 0 var(--alert); clip: rect(24px, 550px, 90px, 0);
    animation: glitch-anim 3s infinite linear alternate-reverse;
  }
  .glitch::after {
    left: -2px; text-shadow: -2px 0 var(--primary); clip: rect(85px, 550px, 140px, 0);
    animation: glitch-anim 2.5s infinite linear alternate-reverse;
  }

  @keyframes glitch-anim {
    0% { clip: rect(10px, 9999px, 86px, 0); }
    10% { clip: rect(24px, 9999px, 95px, 0); }
    20% { clip: rect(5px, 9999px, 78px, 0); }
    30% { clip: rect(91px, 9999px, 65px, 0); }
    40% { clip: rect(74px, 9999px, 31px, 0); }
    50% { clip: rect(82px, 9999px, 18px, 0); }
    60% { clip: rect(69px, 9999px, 47px, 0); }
    70% { clip: rect(55px, 9999px, 25px, 0); }
    80% { clip: rect(41px, 9999px, 8px, 0); }
    90% { clip: rect(20px, 9999px, 36px, 0); }
    100% { clip: rect(33px, 9999px, 52px, 0); }
  }

  .glitch-extreme { animation: glitch-skew 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite; }
  @keyframes glitch-skew {
    0% { transform: skew(0deg); }
    20% { transform: skew(-20deg); }
    40% { transform: skew(20deg); }
    60% { transform: skew(-10deg); }
    80% { transform: skew(10deg); }
    100% { transform: skew(0deg); }
  }

  /* Cyber Card (Improved Contrast) */
  .cyber-card {
    background: rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    backdrop-filter: blur(8px);
    position: relative;
    overflow: hidden;
  }
  .cyber-card:hover {
    transform: perspective(1000px) translateZ(10px) scale(1.02);
    border-color: var(--primary);
    box-shadow: 0 0 30px var(--primary-glow), inset 0 0 20px rgba(255, 255, 255, 0.05);
    z-index: 10;
    background: rgba(0, 0, 0, 0.85);
  }
  .cyber-card::after {
    content: 'TARGET ACQUIRED'; position: absolute; bottom: -30px; right: 10px;
    font-family: 'Share Tech Mono', monospace; font-size: 10px; color: var(--primary);
    opacity: 0; transition: 0.3s;
  }
  .cyber-card:hover::after { bottom: 10px; opacity: 1; }

  /* Radar Animation */
  .radar {
    width: 100px; height: 100px; border-radius: 50%;
    border: 1px solid var(--primary-glow); background: rgba(0, 0, 0, 0.6);
    position: relative; overflow: hidden; box-shadow: 0 0 15px var(--primary-glow);
    transition: border-color 0.5s, box-shadow 0.5s; cursor: none;
  }
  .radar::before {
    content: ''; position: absolute; top: 50%; left: 50%;
    width: 100%; height: 1px; background: var(--primary-glow); transform: translate(-50%, -50%);
  }
  .radar::after {
    content: ''; position: absolute; top: 50%; left: 50%;
    width: 1px; height: 100%; background: var(--primary-glow); transform: translate(-50%, -50%);
  }
  .radar-sweep {
    position: absolute; top: 0; left: 50%; width: 50%; height: 50%;
    transform-origin: bottom left; animation: sweep 4s linear infinite;
  }
  .radar-blip {
    position: absolute; width: 4px; height: 4px; background: var(--alert); border-radius: 50%;
    box-shadow: 0 0 5px var(--alert); opacity: 0; animation: blip 4s infinite;
  }
  @keyframes sweep { to { transform: rotate(360deg); } }
  @keyframes blip { 0%, 100% { opacity: 0; } 10% { opacity: 1; } }

  /* Scrolling Ticker */
  .ticker-wrap {
    width: 100%; overflow: hidden; height: 30px;
    background-color: rgba(0, 0, 0, 0.9); border-top: 1px solid var(--primary);
    position: fixed; bottom: 0; z-index: 45; display: flex; align-items: center; transition: border-color 0.5s;
  }
  .ticker {
    display: inline-block; white-space: nowrap; padding-right: 100%;
    animation: ticker 25s linear infinite; font-family: 'Share Tech Mono', monospace;
    font-size: 12px; color: var(--primary); transition: color 0.5s;
  }
  @keyframes ticker { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(-100%, 0, 0); } }

  /* Sniper Target Animation */
  .sniper-btn { position: relative; overflow: hidden; }
  .sniper-btn::after {
    content: ''; position: absolute; top: 50%; left: 50%; width: 200%; height: 200%;
    background: radial-gradient(circle, transparent 40%, rgba(255, 0, 0, 0.2) 45%, rgba(255, 0, 0, 0.5) 46%, transparent 50%);
    background-image: conic-gradient(from 0deg, transparent 0 85deg, rgba(255,0,0,0.4) 90deg, transparent 95deg 175deg, rgba(255,0,0,0.4) 180deg, transparent 185deg 265deg, rgba(255,0,0,0.4) 270deg, transparent 275deg 355deg, rgba(255,0,0,0.4) 360deg);
    transform: translate(-50%, -50%) scale(2); opacity: 0; transition: all 0.4s ease-in-out;
    border-radius: 50%; pointer-events: none; z-index: 1;
  }
  .sniper-btn:hover::after { transform: translate(-50%, -50%) scale(1); opacity: 1; animation: rotate-sniper 4s linear infinite; }
  .sniper-laser-x, .sniper-laser-y { position: absolute; background: rgba(255, 0, 0, 0.6); opacity: 0; transition: all 0.3s ease; z-index: 0; }
  .sniper-laser-x { top: 50%; left: 0; width: 100%; height: 1px; transform: translateY(-50%) scaleX(0); }
  .sniper-laser-y { top: 0; left: 50%; width: 1px; height: 100%; transform: translateX(-50%) scaleY(0); }
  .sniper-btn:hover .sniper-laser-x { opacity: 1; transform: translateY(-50%) scaleX(1); }
  .sniper-btn:hover .sniper-laser-y { opacity: 1; transform: translateX(-50%) scaleY(1); }

  /* Mobile Bottom Nav Fix */
  .mobile-nav-item {
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
    font-family: 'Share Tech Mono', monospace; font-size: 10px;
    padding: 8px; flex: 1; transition: all 0.3s;
  }
  .mobile-nav-item.active { color: var(--primary); text-shadow: 0 0 5px var(--primary-glow); }
`;

// --- BOOT SEQUENCE COMPONENT ---
const BootScreen = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const bootSequence = [
    "INIT SYSTEM // KERNEL v9.4.2",
    "LOADING SECURE PROTOCOLS...",
    "ESTABLISHING ENCRYPTED CONNECTION...",
    "BYPASSING MAINFRAME FIREWALL...",
    "ACCESS GRANTED.",
    "WELCOME, DAVE454545.",
    "LAUNCHING INTERACTIVE PORTFOLIO..."
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      setLines(prev => [...prev, bootSequence[currentLine]]);
      currentLine++;
      if (currentLine >= bootSequence.length) {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 300);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#050510] flex flex-col justify-center p-8 z-50 font-mono-cyber text-[#00f0ff] text-lg">
      <div className="max-w-2xl w-full mx-auto">
        {lines.map((line, i) => (
          <div key={i} className="mb-2">
            <span className="text-green-400">root@sys:~#</span> {line}
          </div>
        ))}
        <div className="cursor-blink w-3 h-5 bg-[#00f0ff] inline-block mt-2"></div>
      </div>
    </div>
  );
};

// --- DYNAMIC BACKGROUND CANVAS COMPONENT ---
const NetworkBackground = ({ themeConfig }) => {
  const canvasRef = useRef(null);
  const themeRef = useRef(themeConfig);

  useEffect(() => {
    themeRef.current = themeConfig;
  }, [themeConfig]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 2 + 1;
      }
      draw(theme) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = theme.particleFill;
        ctx.fill();
      }
      update(theme) {
        this.x += this.vx * theme.particleSpeed;
        this.y += this.vy * theme.particleSpeed;
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }
    }

    for (let i = 0; i < 60; i++) particles.push(new Particle()); // Reduced for better mobile perf

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const currentTheme = themeRef.current;
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(currentTheme);
        particles[i].draw(currentTheme);
        
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = currentTheme.particleStroke(dist);
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none" />;
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [booted, setBooted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [delayedMousePos, setDelayedMousePos] = useState({ x: 0, y: 0 });
  const [clicking, setClicking] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  
  // DYNAMIC MAP / THEME SYSTEM
  const [currentThemeId, setCurrentThemeId] = useState('blue');
  const [mapAlert, setMapAlert] = useState(null);

  const triggerMapChange = (newThemeId, message) => {
    if (currentThemeId === newThemeId) return;
    setCurrentThemeId(newThemeId);
    setMapAlert(message);
    setTimeout(() => setMapAlert(null), 3500);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setTimeout(() => setDelayedMousePos({ x: e.clientX, y: e.clientY }), 50);
    };
    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    // Only add mouse listeners on desktop to avoid weird mobile behavior
    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('section[id]').forEach(section => observer.observe(section));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, []);

  if (!booted) return <BootScreen onComplete={() => setBooted(true)} />;

  const theme = THEMES[currentThemeId];

  return (
    <div 
      className="relative min-h-screen text-slate-200 selection:bg-white/20"
      style={{
        '--primary': theme.primary,
        '--primary-glow': theme.primaryGlow,
        '--alert': theme.alert,
        '--dark': theme.dark,
        backgroundColor: 'var(--dark)'
      }}
    >
      <style>{customStyles}</style>
      
      {/* MASSIVE MAP CHANGE NOTIFICATION OVERLAY */}
      {mapAlert && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 pointer-events-none backdrop-blur-sm">
          <div className="text-center glitch-extreme w-full px-4">
            <h2 
              className="text-2xl md:text-5xl lg:text-7xl font-bold font-mono-cyber p-4 md:p-8 border-y-4 bg-[var(--dark)]/90" 
              style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
            >
              {mapAlert}
            </h2>
          </div>
        </div>
      )}

      <div className="hud-overlay"></div>
      
      {/* Custom Crosshair (Desktop only via CSS) */}
      <div className={`custom-cursor ${clicking ? 'clicking' : ''}`} style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}></div>
      <div className="cursor-follower" style={{ left: `${delayedMousePos.x}px`, top: `${delayedMousePos.y}px` }}></div>

      {/* --- EXPLICIT MAP SWITCHER / ENVIRONMENT CONTROLS --- */}
      <div className="fixed top-4 left-4 z-50 font-mono-cyber bg-black/70 backdrop-blur border p-3 md:p-4 rounded-sm shadow-lg max-w-[90vw]" style={{ borderColor: 'var(--primary-glow)' }}>
        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 transition-colors duration-500" style={{ color: 'var(--primary)' }}>
          <div className="flex items-center gap-2">
            <Target size={16} className={currentThemeId === 'red' ? 'animate-ping text-red-500' : 'animate-spin-slow'} /> 
            <span className="text-xs md:text-sm truncate font-bold">{theme.mapName}</span>
          </div>
          <div 
            className="text-[10px] border px-2 py-0.5 inline-block transition-colors duration-500 w-max"
            style={{ 
              color: currentThemeId === 'red' ? 'var(--alert)' : 'var(--primary)',
              borderColor: currentThemeId === 'red' ? 'var(--alert)' : 'var(--primary)',
              backgroundColor: `${currentThemeId === 'red' ? 'var(--alert)' : 'var(--primary)'}20`
            }}
          >
            {currentThemeId === 'red' ? 'CRITICAL ALERT' : 'UPLINK STABLE'}
          </div>
        </div>
        
        {/* Manual Theme Override Buttons */}
        <div className="text-[10px] text-slate-400 mb-1">ENVIRONNEMENT OVERRIDE :</div>
        <div className="flex gap-2">
          <button onClick={() => triggerMapChange('blue', 'MODE SÉCURISÉ ENGAGÉ')} className={`px-2 py-1 text-[10px] border transition-all ${currentThemeId === 'blue' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_10px_#00f0ff]' : 'border-slate-700 text-slate-500 hover:border-cyan-500/50 hover:text-cyan-400'}`}>BLUE_LINK</button>
          <button onClick={() => triggerMapChange('red', 'MODE RED TEAM ENGAGÉ')} className={`px-2 py-1 text-[10px] border transition-all ${currentThemeId === 'red' ? 'bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_10px_#ff003c]' : 'border-slate-700 text-slate-500 hover:border-red-500/50 hover:text-red-400'}`}>RED_TEAM</button>
          <button onClick={() => triggerMapChange('green', 'NOYAU SYSTÈME ENGAGÉ')} className={`px-2 py-1 text-[10px] border transition-all ${currentThemeId === 'green' ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_10px_#00ff66]' : 'border-slate-700 text-slate-500 hover:border-green-500/50 hover:text-green-400'}`}>SYS_CORE</button>
        </div>

        {/* Coords (Desktop only) */}
        <div className="text-[10px] text-slate-500 mt-2 hidden md:block">
          POS_X: {String(mousePos.x).padStart(4, '0')} | POS_Y: {String(mousePos.y).padStart(4, '0')}
        </div>
      </div>

      {/* Top Right: Mini-Radar (Desktop only) */}
      <div 
        className="fixed top-6 right-6 z-50 hidden lg:block hover:scale-105 transition-transform"
        onClick={() => triggerMapChange('blue', 'RÉINITIALISATION DU SYSTÈME. RETOUR AU MODE SÉCURISÉ.')}
        title="Reset System Map"
      >
        <div className="radar">
          <div className="radar-sweep" style={{ background: `conic-gradient(from 0deg, transparent 0deg, var(--primary-glow) 90deg)` }}></div>
          <div className="radar-blip" style={{ top: '30%', left: '60%', animationDelay: '0s' }}></div>
          {currentThemeId === 'red' && <div className="radar-blip" style={{ top: '50%', left: '40%', animationDelay: '1s' }}></div>}
          <div className="radar-blip" style={{ top: '70%', left: '40%', animationDelay: '2s' }}></div>
        </div>
        <div className="text-center font-mono-cyber text-[10px] mt-2 transition-colors duration-500" style={{ color: 'var(--primary)' }}>
          SCANNING SECTOR
        </div>
      </div>

      {/* --- DESKTOP RIGHT NAVIGATION (Quest Log) --- */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-6 font-mono-cyber text-right">
        <div className="text-sm text-yellow-500 mb-2 border-b border-yellow-500/30 pb-2">ACTIVE MISSIONS</div>
        {[
          { id: 'about', name: 'PLAYER_PROFILE' },
          { id: 'experience', name: 'MISSION_HISTORY' },
          { id: 'skills', name: 'SKILL_TREE' },
          { id: 'projects', name: 'ACHIEVEMENTS' }
        ].map((quest) => (
          <a key={quest.id} href={`#${quest.id}`} className={`flex items-center justify-end gap-3 transition-all ${activeSection === quest.id ? 'scale-110' : 'text-slate-600'}`} style={{ color: activeSection === quest.id ? 'var(--primary)' : '' }}>
            <span className="text-xs tracking-widest">{quest.name}</span>
            <div className={`w-3 h-3 border border-current transform rotate-45 ${activeSection === quest.id ? 'shadow-[0_0_10px_var(--primary)]' : ''}`} style={{ backgroundColor: activeSection === quest.id ? 'var(--primary)' : 'transparent' }}></div>
          </a>
        ))}
      </nav>

      {/* --- MOBILE BOTTOM NAVIGATION --- */}
      <nav className="fixed bottom-0 left-0 w-full z-50 xl:hidden flex justify-between px-2 bg-black/95 backdrop-blur-xl border-t" style={{ borderColor: 'var(--primary)' }}>
        {[
          { id: 'about', icon: <User size={20}/>, name: 'PROFILE' },
          { id: 'experience', icon: <Briefcase size={20}/>, name: 'MISSIONS' },
          { id: 'skills', icon: <Cpu size={20}/>, name: 'SKILLS' },
          { id: 'projects', icon: <Database size={20}/>, name: 'LOGS' }
        ].map((item) => (
          <a key={item.id} href={`#${item.id}`} className={`mobile-nav-item ${activeSection === item.id ? 'active' : 'text-slate-500'}`}>
            {item.icon}
            <span>{item.name}</span>
          </a>
        ))}
      </nav>

      {/* Bottom: Scrolling Data Stream (Desktop only) */}
      <div className="ticker-wrap hidden md:flex border-t" style={{ borderColor: 'var(--primary)' }}>
        <div className="ticker" style={{ color: 'var(--primary)' }}>
          {currentThemeId === 'red' 
            ? "[CRITICAL] UNAUTHORIZED ACCESS DETECTED // RED TEAM PROTOCOLS ENGAGED // TRACING IP... FAILED // DEFENSIVE COUNTERMEASURES ONLINE // "
            : currentThemeId === 'green'
            ? "[ROOT] Bypassing mainframe... OVERRIDE SUCCESSFUL // DEEP WEB NODE ESTABLISHED // "
            : "[LOG] INIT FIREWALL BYPASS... SUCCESS // [DATA] INCOMING TRAFFIC FROM 192.168.1.45 DETECTED // [WARN] ENCRYPTION KEYS ROTATED // [SYS] ALL NODES OPERATIONAL // "
          }
          {/* Repeat for seamless loop effect */}
          {currentThemeId === 'red' 
            ? "[CRITICAL] UNAUTHORIZED ACCESS DETECTED // RED TEAM PROTOCOLS ENGAGED // TRACING IP... FAILED // DEFENSIVE COUNTERMEASURES ONLINE // "
            : currentThemeId === 'green'
            ? "[ROOT] Bypassing mainframe... OVERRIDE SUCCESSFUL // DEEP WEB NODE ESTABLISHED // "
            : "[LOG] INIT FIREWALL BYPASS... SUCCESS // [DATA] INCOMING TRAFFIC FROM 192.168.1.45 DETECTED // [WARN] ENCRYPTION KEYS ROTATED // [SYS] ALL NODES OPERATIONAL // "
          }
        </div>
      </div>

      <NetworkBackground themeConfig={theme} />

      {/* MAIN CONTENT CONTAINER (Responsive padding to avoid overlaps) */}
      <main className="w-full xl:w-[calc(100%-12rem)] pb-24 md:pb-32 relative z-20">
        
        {/* HERO SECTION */}
        <section id="about" className="relative min-h-screen flex items-center container mx-auto px-4 md:px-8 pt-36 md:pt-28 pb-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
            
            {/* TEXT CONTENT (Left) */}
            <div className="w-full lg:w-3/5 order-2 lg:order-1 mt-8 lg:mt-0">
              <div 
                className="inline-block px-4 py-1 border bg-opacity-20 text-xs md:text-sm mb-6 rounded font-mono-cyber transition-colors duration-500"
                style={{ color: 'var(--primary)', borderColor: 'var(--primary-glow)', backgroundColor: 'var(--primary-glow)' }}
              >
                <Zap size={14} className="inline mr-2 text-yellow-400"/>
                LEVEL 99 // CLASS: NET_SEC_ENGINEER
              </div>
              <h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 glitch uppercase tracking-tight break-words" 
                data-text={personalInfo.name}
              >
                {personalInfo.name}
              </h1>
              <h2 className="text-xl md:text-3xl mb-6 font-mono-cyber transition-colors duration-500" style={{ color: 'var(--primary)' }}>
                {personalInfo.title}
              </h2>
              <div className="bg-black/70 backdrop-blur-sm p-4 border-l-2 mb-10 transition-all duration-500" style={{ borderColor: 'var(--primary-glow)' }}>
                <p className="text-base md:text-lg text-slate-200 leading-relaxed">
                  {personalInfo.about}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 font-mono-cyber">
                <a href="#projects" className="px-6 py-3 hover:text-white transition-all shadow-[0_0_15px_var(--primary-glow)] flex items-center justify-center gap-2 rounded-sm border z-20 relative group text-black text-sm md:text-base text-center" style={{ backgroundColor: 'var(--primary)', borderColor: 'var(--primary)' }}>
                  <Terminal size={18} className="group-hover:animate-pulse" /> VIEW_ACHIEVEMENTS
                </a>
                
                {/* SNIPER DOWNLOAD BUTTON - MAP TRIGGER */}
                <div className="relative group w-full sm:w-auto">
                  <a 
                    href="/CV these.pdf" 
                    download="CV_Daouda_David_COULIBALY.pdf" 
                    onClick={() => triggerMapChange('red', 'ALERTE : VOL DE DONNÉES DETECTÉ. MODE RED TEAM ENGAGÉ.')}
                    className="sniper-btn w-full sm:w-auto px-6 py-3 bg-black/50 backdrop-blur border border-red-600 hover:bg-red-950/40 text-red-500 hover:text-red-400 transition-all shadow-[0_0_15px_rgba(255,0,0,0.2)] hover:shadow-[0_0_25px_rgba(255,0,0,0.6)] flex items-center justify-center gap-2 rounded-sm z-20"
                  >
                    <div className="sniper-laser-x"></div>
                    <div className="sniper-laser-y"></div>
                    <Crosshair size={18} className="relative z-10 group-hover:scale-125 transition-transform duration-300" />
                    <span className="relative z-10 font-bold tracking-widest uppercase text-sm md:text-base">Télécharger_CV</span>
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-500 z-10 group-hover:w-3 group-hover:h-3 transition-all"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-red-500 z-10 group-hover:w-3 group-hover:h-3 transition-all"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-red-500 z-10 group-hover:w-3 group-hover:h-3 transition-all"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-500 z-10 group-hover:w-3 group-hover:h-3 transition-all"></div>
                  </a>
                  {/* HINT FOR THE RECRUITER */}
                  <div className="absolute -bottom-6 w-full text-center">
                     <p className="text-[10px] md:text-xs text-red-500 font-mono-cyber animate-pulse">
                       &gt;&gt; INDICE : TÉLÉCHARGER POUR HACKER LA MAP (RED TEAM)
                     </p>
                  </div>
                </div>
              </div>

              {/* Player Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-16 border-t pt-8 transition-colors duration-500" style={{ borderColor: 'var(--primary-glow)' }}>
                {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col p-3 border bg-black/60 backdrop-blur-sm transition-colors duration-500" style={{ borderColor: 'var(--primary-glow)' }}>
                    <div className="mb-2 transition-colors duration-500" style={{ color: 'var(--primary)' }}>{stat.icon}</div>
                    <div className="text-xl md:text-2xl font-bold text-white font-mono-cyber">{stat.value}+</div>
                    <div className="text-[9px] md:text-[10px] text-slate-300 uppercase tracking-widest mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* PROFILE IMAGE (Right) */}
            <div className="w-full lg:w-2/5 max-w-sm md:max-w-md relative group order-1 lg:order-2 mx-auto lg:mx-0">
              <div 
                className="absolute -inset-1 rounded border-lg blur opacity-40 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"
                style={{ background: `linear-gradient(to right, var(--primary), var(--alert))` }}
              ></div>
              
              <div className="relative border rounded overflow-hidden cyber-card bg-black aspect-[3/4]" style={{ borderColor: 'var(--primary-glow)' }}>
                {/* Techy Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 z-20 transition-colors duration-500" style={{ borderColor: 'var(--primary)' }}></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 z-20 transition-colors duration-500" style={{ borderColor: 'var(--primary)' }}></div>
                
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none z-10"></div>
                
                <img 
                  src="/profile.png" 
                  alt="Daouda David COULIBALY" 
                  className={`w-full h-full object-cover object-top hover:grayscale-0 transition-all duration-700 opacity-90 hover:opacity-100 scale-100 group-hover:scale-105 ${currentThemeId === 'red' ? 'grayscale-0 contrast-150 sepia-[.5] hue-rotate-[-30deg]' : 'grayscale contrast-125'}`}
                />
                
                {/* HUD Overlays */}
                <div className="absolute top-3 right-3 bg-red-500/20 text-red-400 px-2 py-1 text-[10px] font-mono-cyber border border-red-500/30 z-20 rounded backdrop-blur">
                  REC <span className="animate-pulse">●</span>
                </div>
                <div className="absolute bottom-3 left-3 text-[9px] md:text-[11px] font-mono-cyber z-20 p-2 md:p-3 rounded backdrop-blur border bg-black/80 transition-colors duration-500" style={{ color: 'var(--primary)', borderColor: 'var(--primary-glow)' }}>
                  <span className="text-slate-300">TARGET_ID:</span> {personalInfo.alias} <br/>
                  <span className="text-slate-300">FACTION:</span> WHITE_HAT <br/>
                  <span className="flex items-center gap-1 mt-1 font-bold" style={{ color: currentThemeId === 'red' ? 'var(--alert)' : '#00ff00' }}>
                    <Shield size={10}/> ARMOR: {currentThemeId === 'red' ? '64%' : '100%'}
                  </span>
                </div>

                {/* Crosshair target inside image on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20">
                   <Target className="w-24 h-24 md:w-32 md:h-32 animate-pulse" style={{ color: 'var(--alert)', opacity: 0.8 }} strokeWidth={1} />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="relative z-10 py-16 md:py-24 border-y" style={{ borderColor: 'var(--primary-glow)', backgroundColor: 'rgba(5, 5, 10, 0.85)' }}>
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 md:mb-16 flex items-center gap-4 font-mono-cyber">
              <div className="w-8 h-8 border flex items-center justify-center text-sm transition-colors duration-500 bg-black/50" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>02</div> 
              MISSION_HISTORY
              <div className="h-px flex-grow ml-2 md:ml-4 transition-colors duration-500" style={{ backgroundColor: 'var(--primary-glow)' }}></div>
            </h2>
            
            <div className="relative border-l-2 ml-4 transition-colors duration-500" style={{ borderColor: 'var(--primary-glow)' }}>
              {experience.map((exp, index) => (
                <div key={index} className="mb-12 pl-6 md:pl-8 relative group">
                  <div className="absolute w-4 h-4 border-2 rounded-sm transform rotate-45 -left-[9px] top-4 transition-all duration-500 bg-black" style={{ borderColor: 'var(--primary)', boxShadow: `0 0 15px var(--primary-glow)` }}></div>
                  
                  <div className="cyber-card p-5 md:p-8 rounded-sm">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 border-b pb-4 transition-colors duration-500" style={{ borderColor: 'var(--primary-glow)' }}>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-wide transition-colors duration-500" style={{ textShadow: `0 0 10px var(--primary-glow)` }}>
                          {exp.role}
                        </h3>
                        <div className="text-xs md:text-sm flex items-center gap-2 mt-2 font-mono-cyber inline-flex px-3 py-1 border bg-black/60 transition-colors duration-500" style={{ color: 'var(--primary)', borderColor: 'var(--primary-glow)' }}>
                          <Server size={14} /> {exp.company}
                        </div>
                      </div>
                      <div className="text-slate-400 font-mono-cyber text-xs mt-4 md:mt-0 flex flex-col items-start md:items-end gap-1">
                        <span className="flex items-center gap-1 opacity-90 font-bold" style={{ color: 'var(--primary)' }}><MapPin size={12}/> {exp.location}</span>
                        <span className="border px-2 py-1 mt-1 bg-black/60 transition-colors duration-500" style={{ borderColor: 'var(--primary-glow)' }}>{exp.date}</span>
                      </div>
                    </div>
                    <p className="text-slate-200 leading-relaxed text-sm md:text-base">
                      {exp.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="relative z-10 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 md:mb-16 flex items-center gap-4 font-mono-cyber">
              <div className="w-8 h-8 border flex items-center justify-center text-sm transition-colors duration-500 bg-black/50" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>03</div> 
              SKILL_TREE_UNLOCKED
              <div className="h-px flex-grow ml-2 md:ml-4 transition-colors duration-500" style={{ backgroundColor: 'var(--primary-glow)' }}></div>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skillGroup, idx) => (
                <div key={idx} className="cyber-card p-5 md:p-6 rounded-sm">
                  <div className="flex items-center gap-3 mb-6 border-b pb-4 transition-colors duration-500" style={{ borderColor: 'var(--primary-glow)' }}>
                    <div className="p-2 border bg-black/60 transition-colors duration-500" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>{skillGroup.icon}</div>
                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-widest">{skillGroup.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item, i) => (
                      <span key={i} className="px-3 py-1.5 border text-slate-200 text-xs font-mono-cyber bg-black/50 hover:bg-white hover:text-black transition-all cursor-crosshair" style={{ borderColor: 'var(--primary-glow)' }}>
                        {'>'} {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications (Inventory) - MAP TRIGGER INSIDE */}
            <div className="mt-12 w-full relative">
              <div className="cyber-card p-5 md:p-6 rounded-sm border-l-4" style={{ background: 'rgba(0,0,0,0.85)', borderLeftColor: currentThemeId === 'green' ? 'var(--primary)' : '#eab308' }}>
                <h3 className="text-sm font-bold mb-4 flex items-center gap-3 font-mono-cyber tracking-widest uppercase" style={{ color: currentThemeId === 'green' ? 'var(--primary)' : '#eab308' }}>
                  <Award size={16} /> Player Inventory (Certifications)
                </h3>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                  {['Cisco CCNA', 'CyberOps Associate', 'Fortinet NSE'].map((cert, i) => (
                    <div key={i} className="flex items-center gap-2 border px-3 py-2 md:py-1.5 text-xs font-mono-cyber w-full sm:w-auto bg-black/80" style={{ borderColor: '#22c55e40', color: '#4ade80' }}>
                      <Lock size={12} /> {cert}
                    </div>
                  ))}
                  
                  {/* SYSTEM CORE TRIGGER */}
                  <div className="relative w-full sm:w-auto">
                    <div 
                      onClick={() => triggerMapChange('green', 'ACCÈS ROOT AUTORISÉ. BIENVENUE DANS LE NOYAU SYSTÈME.')}
                      className="flex items-center gap-2 border px-3 py-2 md:py-1.5 text-xs font-mono-cyber border-dashed opacity-80 cursor-pointer hover:opacity-100 hover:shadow-[0_0_15px_#00ff66] transition-all bg-black/80 w-full sm:w-auto"
                      style={{ borderColor: '#f9731680', color: '#fb923c' }}
                      title="Hack Node"
                    >
                       {currentThemeId === 'green' ? '[UNLOCKED]' : '[LOCKED]'} AWS SysArch / OSCP
                    </div>
                  </div>
                </div>
              </div>
              {/* HINT FOR THE RECRUITER */}
              <div className="absolute -bottom-6 w-full text-left md:pl-6">
                 <p className="text-[10px] md:text-xs text-green-500 font-mono-cyber animate-pulse">
                   &gt;&gt; INDICE : CLIQUEZ SUR LA CERTIFICATION BLOQUÉE POUR PIRATER LA MAP (SYS_CORE)
                 </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="relative z-10 py-16 md:py-24 border-y transition-colors duration-500 mt-8" style={{ borderColor: 'var(--primary-glow)', backgroundColor: 'rgba(5, 5, 10, 0.85)' }}>
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 md:mb-16 flex items-center gap-4 font-mono-cyber">
              <div className="w-8 h-8 border flex items-center justify-center text-sm transition-colors duration-500 bg-black/50" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>04</div> 
              ACHIEVEMENTS_LOG
              <div className="h-px flex-grow ml-2 md:ml-4 transition-colors duration-500" style={{ backgroundColor: 'var(--primary-glow)' }}></div>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {projects.map((project, idx) => (
                <div key={idx} className="cyber-card group p-6 md:p-8 rounded-sm flex flex-col h-full bg-gradient-to-br from-black/90 to-black/60">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 border bg-black/60 transition-all duration-500" style={{ borderColor: 'var(--primary-glow)', color: 'var(--primary)' }}>
                      <Database size={24} />
                    </div>
                    <ExternalLink className="text-slate-400 group-hover:text-white transition-colors" size={20} />
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-white mb-4 uppercase tracking-wide group-hover:text-shadow transition-all" style={{ textShadow: `0 0 10px var(--primary-glow)` }}>
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-200 mb-8 flex-grow text-sm md:text-base">
                    {project.desc}
                  </p>
                  
                  <div className="pt-4 border-t flex flex-wrap gap-2 font-mono-cyber text-[10px] md:text-xs transition-colors duration-500" style={{ borderColor: 'var(--primary-glow)', color: 'var(--primary)' }}>
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-2 py-1 border opacity-90 bg-black" style={{ borderColor: 'var(--primary-glow)' }}>#{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 md:mt-16 flex justify-center">
               <a href="https://davidcoulibaly.kreativacademy.com" target="_blank" rel="noreferrer" className="inline-flex flex-col md:flex-row items-center justify-center gap-3 px-6 py-4 border transition-all uppercase tracking-widest text-xs group text-black font-bold text-center w-full md:w-auto" style={{ borderColor: 'var(--primary)', backgroundColor: 'var(--primary)' }}>
                  <div className="flex items-center gap-2"><Network size={16} /> ACCÉDER AUX ARCHIVES WEB</div>
                  <span className="text-[10px] opacity-80">(Ancien Portfolio)</span>
                  <ChevronRight size={16} className="hidden md:block group-hover:translate-x-1 transition-transform" />
               </a>
            </div>
          </div>
        </section>

        {/* FOOTER / CONTACT */}
        <footer className="relative z-10 py-16 md:py-20 transition-colors duration-500 bg-black/95">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-mono-cyber glitch" data-text="INITIATE_CONTACT?">
              INITIATE_CONTACT?
            </h2>
            <p className="text-slate-200 mb-10 text-sm md:text-base leading-relaxed">
              L'infrastructure est sécurisée. Si vous souhaitez initier un nouveau protocole de collaboration ou discuter d'une opportunité, ouvrez un canal de communication sécurisé.
            </p>
            
            <a href="mailto:coulibalydavid31@gmail.com" className="relative group inline-block font-mono-cyber uppercase tracking-widest mb-16 w-full sm:w-auto">
              <span className="absolute inset-0 w-full h-full transform translate-x-1.5 translate-y-1.5 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" style={{ backgroundColor: 'var(--primary)' }}></span>
              <span className="relative flex items-center justify-center gap-3 px-6 md:px-8 py-4 border-2 bg-black transition-all duration-300 group-hover:text-white text-sm" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                <Mail size={18} /> OUVRIR CANAL DE COMMUNICATION
              </span>
            </a>

            <div className="flex gap-6 md:gap-8 mb-10">
              <a href="https://github.com/Dave454545" target="_blank" rel="noreferrer" className="p-3 border bg-black/50 transition-all duration-300 text-slate-300 hover:text-white hover:scale-110" style={{ borderColor: 'var(--primary-glow)', boxShadow: `0 0 15px var(--primary-glow)` }}>
                <GithubIcon size={24} />
              </a>
              <a href="https://www.linkedin.com/in/daouda-david-coulibaly-401b01242" target="_blank" rel="noreferrer" className="p-3 border bg-black/50 transition-all duration-300 text-slate-300 hover:text-white hover:scale-110" style={{ borderColor: 'var(--primary-glow)', boxShadow: `0 0 15px var(--primary-glow)` }}>
                <LinkedinIcon size={24} />
              </a>
            </div>

            <div className="font-mono-cyber text-[9px] md:text-[10px] uppercase border-t pt-6 w-full transition-colors duration-500" style={{ borderColor: 'var(--primary-glow)', color: 'var(--primary)' }}>
              © 2026 // SYS_ARCHITECT: D. DAVID COULIBALY // SECURE CONNECTION ESTABLISHED. END OF TRANSMISSION.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}