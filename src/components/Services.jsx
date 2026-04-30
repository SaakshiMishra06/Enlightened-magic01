import React from 'react';
import { Camera, Video, Code, ShoppingCart, Cpu } from 'lucide-react';

const services = [
  { title: 'Photography', icon: <Camera size={32} />, desc: 'High-end product and lifestyle photography engineered to elevate your brand identity.' },
  { title: 'Videography', icon: <Video size={32} />, desc: 'Cinematic commercials and visual storytelling that captures attention and converts.' },
  { title: 'Web Development', icon: <Code size={32} />, desc: 'Hyper-premium, performant websites built with modern web technologies.' },
  { title: 'E-commerce Solutions', icon: <ShoppingCart size={32} />, desc: 'Scalable and conversion-optimized storefronts designed for exponential growth.' },
  { title: 'AI Automation', icon: <Cpu size={32} />, desc: 'Intelligent systems and workflows that streamline operations and enhance creativity.' },
];

export default function Services() {
  return (
    <section id="services" style={{ padding: '120px 5%', backgroundColor: '#050505', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '80px', letterSpacing: '-0.02em', textAlign: 'center' }}>
          Our <span className="text-accent-gradient">Expertise</span>
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {services.map((svc, idx) => (
            <div 
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '40px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'background-color 0.3s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div style={{ color: 'var(--color-accent-blue)', marginRight: '40px' }}>
                {svc.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '28px', fontWeight: 600 }}>{svc.title}</h3>
              </div>
              <div style={{ flex: 2 }}>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '18px', lineHeight: 1.6 }}>
                  {svc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
