import React from 'react';

const projects = [
  { name: 'Captor.in', desc: 'Premium E-Commerce Platform', img: '/projects/captor.png', url: 'https://captor.in' },
  { name: 'Growora.com', desc: 'SaaS Marketing Site', img: '/projects/growora.png', url: 'https://growora.com' },
  { name: 'Obsidianvelvet.in', desc: 'Luxury Brand Identity', img: '/projects/obsidian.png', url: 'https://obsidianvelvet.in' },
  { name: 'Enlightenedmagic.com', desc: 'Agency Portfolio', img: '/projects/enlightened.png', url: 'https://enlightenedmagic.com' },
  { name: 'Truehealglobal.com', desc: 'Healthcare Web App', img: '/projects/trueheal.png', url: 'https://truehealglobal.com' },
];

export default function Work() {
  return (
    <section id="work" style={{ padding: '120px 5%', backgroundColor: 'var(--color-bg-deep)', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '64px', letterSpacing: '-0.02em' }}>
          Selected <span className="text-gradient">Work</span>
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '40px' }}>
          {projects.map((project, idx) => (
            <a 
              key={idx} 
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel cinematic-shadow"
              style={{ 
                borderRadius: '16px', 
                overflow: 'hidden', 
                cursor: 'pointer',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s',
                display: 'block',
                textDecoration: 'none',
                color: 'inherit'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 30px 60px -15px rgba(0, 80, 255, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 80, 255, 0.15)';
              }}
            >
              <div style={{ height: '240px', backgroundColor: '#111', overflow: 'hidden' }}>
                <img 
                  src={project.img} 
                  alt={project.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, transition: 'opacity 0.4s, transform 0.4s' }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.opacity = 1;
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.opacity = 0.8;
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  onError={(e) => {
                    // Fallback if image not generated yet
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.innerHTML = `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:var(--color-text-muted); background: linear-gradient(45deg, #050505, #111);">${project.name} Mockup</div>`;
                  }}
                />
              </div>
              <div style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>{project.name}</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', marginBottom: '24px' }}>{project.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-accent-cyan)', fontWeight: 500, fontSize: '14px' }}>
                  View Project 
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
