import React from 'react';

export default function About() {
  return (
    <section id="about" style={{ padding: '200px 5%', backgroundColor: 'var(--color-bg-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '900px', textAlign: 'center' }}>
        <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--color-accent-blue)', margin: '0 auto 40px' }}></div>
        
        <h2 style={{ fontSize: '36px', fontWeight: 300, lineHeight: 1.6, color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>
          <span style={{ fontWeight: 600 }}>Enlightened Magic</span> is a Mumbai-based creative studio blending photography, technology, and storytelling to build powerful brand experiences.
        </h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '80px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', color: 'var(--color-accent-cyan)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Focus</div>
            <div style={{ fontSize: '20px', fontWeight: 500 }}>Visual Storytelling</div>
          </div>
          <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', color: 'var(--color-accent-cyan)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Drive</div>
            <div style={{ fontSize: '20px', fontWeight: 500 }}>Performance Creatives</div>
          </div>
          <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', color: 'var(--color-accent-cyan)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Goal</div>
            <div style={{ fontSize: '20px', fontWeight: 500 }}>Modern Digital Growth</div>
          </div>
        </div>
      </div>
    </section>
  );
}
