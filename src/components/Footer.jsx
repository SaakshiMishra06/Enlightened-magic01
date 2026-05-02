import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Footer() {
  const [contentRef, contentVisible] = useScrollReveal(0.2);
  const [emailHover, setEmailHover] = useState(false);

  return (
    <footer id="contact" style={{ 
      position: 'relative',
      backgroundColor: 'hsl(0, 0%, 4%)', 
      padding: '120px 5% 40px',
      overflow: 'hidden',
      borderTop: '1px solid hsl(0 0% 15%)'
    }}>
      {/* Massive background text */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: 'clamp(100px, 15vw, 250px)',
        fontWeight: 900,
        color: 'transparent',
        WebkitTextStroke: '1px hsl(0 0% 15% / .5)',
        fontFamily: 'var(--font-heading)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        opacity: 0.3,
        zIndex: 0
      }}>
        ENLIGHTENED
      </div>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', 
        bottom: '0', 
        left: '50%', 
        transform: 'translateX(-50%)',
        width: '600px', 
        height: '400px',
        background: 'radial-gradient(ellipse at bottom, hsl(39 100% 45% / .06), transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        <div ref={contentRef} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s cubic-bezier(.16, 1, .3, 1)'
        }}>
          <img 
            src="/logo.avif" 
            alt="Enlightened Magic" 
            style={{ 
              height: '60px', 
              width: 'auto', 
              marginBottom: '32px',
              filter: 'drop-shadow(0 0 20px hsl(39 100% 45% / .3))',
              animation: 'float 4s ease-in-out infinite'
            }} 
          />

          <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, marginBottom: '24px', letterSpacing: '-0.02em', textAlign: 'center', lineHeight: 1.1 }}>
            Ready to create <br/>
            <span className="text-shimmer">Magic?</span>
          </h2>
          
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'clamp(16px, 2vw, 20px)', marginBottom: '50px', textAlign: 'center', maxWidth: '400px', lineHeight: 1.6 }}>
            Let's build something extraordinary together. Your vision, our expertise.
          </p>
          
          <a 
            href="mailto:hello@enlightenedmagic.com" 
            className="btn-primary" 
            onMouseOver={() => setEmailHover(true)}
            onMouseOut={() => setEmailHover(false)}
            style={{ 
              padding: '18px 48px', 
              fontSize: '18px', 
              marginBottom: '140px',
              gap: '12px',
              transform: emailHover ? 'translateY(-4px)' : 'none',
              boxShadow: emailHover ? '0 20px 40px -10px hsl(39 100% 45% / .4)' : '0 10px 30px -10px hsl(39 100% 45% / .3)',
            }}
          >
            hello@enlightenedmagic.com
            <svg 
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ transform: emailHover ? 'translateX(4px)' : 'none', transition: 'transform 0.3s' }}
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        <div style={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '20px', 
          borderTop: '1px solid hsl(0 0% 20% / .3)', 
          paddingTop: '40px',
          opacity: contentVisible ? 1 : 0,
          transition: 'opacity 1s 0.3s'
        }}>
          <div style={{ fontSize: '14px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)' }}>
            © {new Date().getFullYear()} Enlightened Magic. All rights reserved.
          </div>
          
          <div style={{ display: 'flex', gap: '32px', fontSize: '13px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {['Instagram', 'LinkedIn', 'Twitter'].map(social => (
              <a 
                key={social}
                href="#" 
                style={{ transition: 'all 0.3s' }} 
                onMouseOver={(e) => {
                  e.target.style.color = 'var(--color-primary)';
                  e.target.style.transform = 'translateY(-2px)';
                }} 
                onMouseOut={(e) => {
                  e.target.style.color = 'var(--color-text-muted)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {social}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)' }}>
            <a href="#" style={{ transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.target.style.color = 'var(--color-text-muted)'}>Privacy Policy</a>
            <a href="#" style={{ transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.target.style.color = 'var(--color-text-muted)'}>Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
