import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const projects = [
  { name: 'Captor.in', desc: 'Premium E-Commerce Platform', tag: 'E-Commerce', img: '/projects/captor.png', url: 'https://captor.in' },
  { name: 'Growora.com', desc: 'SaaS Marketing Site', tag: 'SaaS', img: '/projects/growora.png', url: 'https://growora.com' },
  { name: 'Obsidianvelvet.in', desc: 'Luxury Brand Identity', tag: 'Branding', img: '/projects/obsidian.png', url: 'https://obsidianvelvet.in' },
  { name: 'Enlightenedmagic.com', desc: 'Agency Portfolio', tag: 'Portfolio', img: '/projects/enlightened.png', url: 'https://enlightenedmagic.com' },
  { name: 'Truehealglobal.com', desc: 'Healthcare Web App', tag: 'Healthcare', img: '/projects/trueheal.png', url: 'https://truehealglobal.com' },
];

function ProjectCard({ project, index }) {
  const [ref, isVisible] = useScrollReveal(0.1);

  return (
    <a 
      ref={ref}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ 
        borderRadius: '20px', 
        overflow: 'hidden', 
        cursor: 'pointer',
        transition: `transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s, opacity 0.8s, border-color 0.3s`,
        transitionDelay: `${index * 0.1}s`,
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        background: 'linear-gradient(135deg, hsl(0 0% 14% / .6), hsl(0 0% 10% / .4))',
        border: '1px solid hsl(0 0% 20% / .2)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        position: 'relative'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-12px) scale(1.01)';
        e.currentTarget.style.boxShadow = '0 30px 80px -15px hsl(39 100% 45% / .25), 0 0 0 1px hsl(39 100% 45% / .1)';
        e.currentTarget.style.borderColor = 'hsl(39 100% 45% / .2)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'hsl(0 0% 20% / .2)';
      }}
    >
      {/* Image */}
      <div style={{ height: '260px', backgroundColor: '#0a0a0a', overflow: 'hidden', position: 'relative' }}>
        <img 
          src={project.img} 
          alt={project.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, transition: 'opacity 0.5s, transform 0.5s' }}
          onMouseOver={(e) => {
            e.currentTarget.style.opacity = 1;
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.opacity = 0.7;
            e.currentTarget.style.transform = 'scale(1)';
          }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement.innerHTML = `
              <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; 
                background: linear-gradient(135deg, hsl(0 0% 8%), hsl(0 0% 14%)); position: relative;">
                <span style="font-family: Outfit, sans-serif; font-size: 20px; font-weight: 600; color: hsl(0 0% 30%); letter-spacing: -0.02em;">${project.name}</span>
                <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, hsl(39 100% 45% / .05), transparent 60%);"></div>
              </div>`;
          }}
        />
        {/* Tag badge */}
        <div style={{
          position: 'absolute', top: '16px', left: '16px',
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: 600,
          fontFamily: 'var(--font-heading)',
          letterSpacing: '0.06em',
          color: 'var(--color-primary)',
          background: 'hsl(0 0% 8% / .7)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid hsl(39 100% 45% / .15)',
          textTransform: 'uppercase'
        }}>
          {project.tag}
        </div>
        {/* Gradient overlay at bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px',
          background: 'linear-gradient(to top, hsl(0 0% 10% / .9), transparent)',
          pointerEvents: 'none'
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: '28px 28px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '6px', letterSpacing: '-0.01em' }}>{project.name}</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>{project.desc}</p>
          </div>
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid hsl(0 0% 25% / .3)',
            transition: 'all 0.3s',
            flexShrink: 0
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function Work() {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section id="work" style={{ padding: '140px 5% 120px', backgroundColor: 'var(--color-bg-deep)', position: 'relative', zIndex: 10 }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, hsl(39 100% 45% / .04), transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={headerRef} style={{
          marginBottom: '72px',
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(.16, 1, .3, 1)'
        }}>
          <span className="section-label" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <hr className="section-divider" />
            Portfolio
          </span>
          <h2 style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.03em' }}>
            Selected <span className="text-accent-gradient">Work</span>
          </h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
