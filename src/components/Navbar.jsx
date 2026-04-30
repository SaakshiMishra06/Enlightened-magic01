import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '20px 40px',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: scrolled ? 'rgba(5, 5, 5, 0.7)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent'
      }}
    >
      <div style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.02em' }}>
        Enlightened Magic
      </div>
      
      <div style={{ display: 'flex', gap: '32px', color: 'var(--color-text-secondary)', fontSize: '14px', fontWeight: 500 }}>
        <a href="#overview" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--color-text-secondary)'}>Overview</a>
        <a href="#work" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--color-text-secondary)'}>Work</a>
        <a href="#services" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--color-text-secondary)'}>Services</a>
        <a href="#about" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--color-text-secondary)'}>About</a>
        <a href="#contact" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--color-text-secondary)'}>Contact</a>
      </div>

      <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '13px' }}>
        Start a Project
      </button>
    </nav>
  );
}
