import React, { useState } from 'react';
import { Camera, Video, Code, ShoppingCart, Cpu, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const services = [
  { 
    title: 'Photography', 
    icon: Camera, 
    desc: 'High-end product and lifestyle photography engineered to elevate your brand identity.',
    number: '01'
  },
  { 
    title: 'Videography', 
    icon: Video, 
    desc: 'Cinematic commercials and visual storytelling that captures attention and converts.',
    number: '02'
  },
  { 
    title: 'Web Development', 
    icon: Code, 
    desc: 'Hyper-premium, performant websites built with modern web technologies.',
    number: '03'
  },
  { 
    title: 'E-commerce Solutions', 
    icon: ShoppingCart, 
    desc: 'Scalable and conversion-optimized storefronts designed for exponential growth.',
    number: '04'
  },
  { 
    title: 'AI Automation', 
    icon: Cpu, 
    desc: 'Intelligent systems and workflows that streamline operations and enhance creativity.',
    number: '05'
  },
];

function ServiceRow({ svc, index }) {
  const [ref, isVisible] = useScrollReveal(0.2);
  const [hovered, setHovered] = useState(false);
  const Icon = svc.icon;

  return (
    <div 
      ref={ref}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '36px 40px',
        borderBottom: '1px solid hsl(0 0% 20% / .15)',
        transition: 'all 0.4s cubic-bezier(.16, 1, .3, 1)',
        cursor: 'pointer',
        background: hovered ? 'linear-gradient(90deg, hsl(39 100% 45% / .04), transparent)' : 'transparent',
        borderLeft: hovered ? '2px solid var(--color-primary)' : '2px solid transparent',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      {/* Number */}
      <div style={{ 
        fontSize: '13px', 
        color: hovered ? 'var(--color-primary)' : 'var(--color-text-muted)', 
        fontFamily: 'var(--font-heading)',
        fontWeight: 600,
        width: '40px',
        transition: 'color 0.3s'
      }}>
        {svc.number}
      </div>
      
      {/* Icon */}
      <div style={{ 
        color: hovered ? 'var(--color-primary)' : 'hsl(0 0% 40%)', 
        marginRight: '36px',
        transition: 'all 0.3s',
        transform: hovered ? 'scale(1.1)' : 'scale(1)'
      }}>
        <Icon size={28} strokeWidth={1.5} />
      </div>
      
      {/* Title */}
      <div style={{ flex: 1, minWidth: '200px' }}>
        <h3 style={{ 
          fontSize: 'clamp(20px, 2vw, 28px)', 
          fontWeight: 600,
          transition: 'color 0.3s',
          color: hovered ? '#fff' : 'var(--color-text-primary)'
        }}>
          {svc.title}
        </h3>
      </div>
      
      {/* Description */}
      <div style={{ flex: 2 }}>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
          {svc.desc}
        </p>
      </div>
      
      {/* Arrow */}
      <div style={{
        marginLeft: '24px',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateX(0)' : 'translateX(-10px)',
        transition: 'all 0.3s',
        color: 'var(--color-primary)'
      }}>
        <ArrowRight size={20} />
      </div>
    </div>
  );
}

export default function Services() {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section id="services" style={{ padding: '140px 5% 120px', backgroundColor: 'var(--color-bg-deep)', position: 'relative' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', right: '-10%', transform: 'translateY(-50%)',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, hsl(39 100% 45% / .03), transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={headerRef} style={{
          textAlign: 'center',
          marginBottom: '80px',
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(.16, 1, .3, 1)'
        }}>
          <span className="section-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
            <hr className="section-divider" />
            What We Do
            <hr className="section-divider" />
          </span>
          <h2 style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-0.03em' }}>
            Our <span className="text-accent-gradient">Expertise</span>
          </h2>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {services.map((svc, idx) => (
            <ServiceRow key={idx} svc={svc} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
