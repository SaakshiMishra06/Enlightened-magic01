import React from 'react';
import { useScrollReveal, useCounter } from '../hooks/useScrollReveal';

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
  { value: 3, suffix: '+', label: 'Years of Excellence' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
];

function StatItem({ stat }) {
  const [ref, count] = useCounter(stat.value, 2000);

  return (
    <div ref={ref} style={{ textAlign: 'center', flex: '1 1 0' }}>
      <div style={{ 
        fontSize: 'clamp(36px, 4vw, 52px)', 
        fontWeight: 800, 
        fontFamily: 'var(--font-heading)',
        letterSpacing: '-0.03em',
        lineHeight: 1,
        marginBottom: '8px'
      }}>
        <span className="text-accent-gradient">{count}{stat.suffix}</span>
      </div>
      <div style={{ fontSize: '14px', color: 'var(--color-text-muted)', fontWeight: 500, letterSpacing: '0.02em' }}>
        {stat.label}
      </div>
    </div>
  );
}

const pillars = [
  { label: 'Focus', value: 'Visual Storytelling', icon: '◎' },
  { label: 'Drive', value: 'Performance Creatives', icon: '◆' },
  { label: 'Goal', value: 'Modern Digital Growth', icon: '▲' },
];

export default function About() {
  const [headRef, headVisible] = useScrollReveal();
  const [pillarsRef, pillarsVisible] = useScrollReveal(0.2);
  const [statsRef, statsVisible] = useScrollReveal(0.2);

  return (
    <section id="about" style={{ padding: '160px 5% 120px', backgroundColor: 'var(--color-bg-deep)', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '800px', height: '800px',
        background: 'radial-gradient(circle, hsl(39 100% 45% / .04), transparent 60%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
        
        {/* Header */}
        <div ref={headRef} style={{
          textAlign: 'center',
          opacity: headVisible ? 1 : 0,
          transform: headVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(.16, 1, .3, 1)'
        }}>
          <span className="section-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
            <hr className="section-divider" />
            About Us
            <hr className="section-divider" />
          </span>
          
          <h2 style={{ 
            fontSize: 'clamp(28px, 3.5vw, 40px)', 
            fontWeight: 300, 
            lineHeight: 1.6, 
            color: 'var(--color-text-primary)', 
            letterSpacing: '-0.01em',
            marginBottom: '80px'
          }}>
            <span style={{ fontWeight: 700 }}>Enlightened Magic</span> is a Mumbai-based creative studio blending photography, technology, and storytelling to build{' '}
            <span className="text-accent-gradient" style={{ fontWeight: 600 }}>powerful brand experiences.</span>
          </h2>
        </div>

        {/* Pillars */}
        <div ref={pillarsRef} style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '20px', 
          marginBottom: '100px',
          opacity: pillarsVisible ? 1 : 0,
          transform: pillarsVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(.16, 1, .3, 1)',
          transitionDelay: '0.1s'
        }}>
          {pillars.map((pillar, i) => (
            <React.Fragment key={i}>
              <div style={{ 
                textAlign: 'center', 
                padding: '32px 28px',
                borderRadius: '20px',
                border: '1px solid hsl(0 0% 20% / .15)',
                background: 'linear-gradient(135deg, hsl(0 0% 14% / .4), hsl(0 0% 10% / .2))',
                flex: '1 1 0',
                transition: 'all 0.3s',
                cursor: 'default'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'hsl(39 100% 45% / .2)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px -10px hsl(39 100% 45% / .1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'hsl(0 0% 20% / .15)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{ fontSize: '20px', marginBottom: '12px', opacity: 0.4 }}>{pillar.icon}</div>
                <div style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px', fontFamily: 'var(--font-heading)' }}>
                  {pillar.label}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>
                  {pillar.value}
                </div>
              </div>
              {i < pillars.length - 1 && (
                <div style={{ width: '1px', background: 'linear-gradient(to bottom, transparent, hsl(39 100% 45% / .2), transparent)', alignSelf: 'stretch', margin: '16px 0' }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Stats */}
        <div ref={statsRef} style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          padding: '48px 40px',
          borderRadius: '24px',
          border: '1px solid hsl(0 0% 20% / .15)',
          background: 'linear-gradient(135deg, hsl(0 0% 12% / .5), hsl(0 0% 8% / .3))',
          opacity: statsVisible ? 1 : 0,
          transform: statsVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(.16, 1, .3, 1)',
          transitionDelay: '0.2s'
        }}>
          {stats.map((stat, i) => (
            <React.Fragment key={i}>
              <StatItem stat={stat} />
              {i < stats.length - 1 && (
                <div style={{ width: '1px', background: 'linear-gradient(to bottom, transparent, hsl(0 0% 25% / .3), transparent)', alignSelf: 'stretch' }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
