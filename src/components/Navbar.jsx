import React, { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = NAV_LINKS.map(l => l.href.replace('#', '')).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveHash('#' + sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: scrolled ? '12px 40px' : '20px 40px',
      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: scrolled ? 'hsl(0 0% 6% / .9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px) saturate(1.5)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(1.5)' : 'none',
      borderBottom: scrolled ? '1px solid hsl(39 100% 45% / .08)' : '1px solid transparent'
    }}>
      {/* Logo */}
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', transition: 'transform 0.3s' }}
         onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
         onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <img 
          src="/logo.avif" 
          alt="Enlightened Magic" 
          style={{ 
            height: '38px', 
            width: 'auto',
            filter: 'drop-shadow(0 0 12px hsl(39 100% 45% / .3))',
            transition: 'filter 0.3s'
          }} 
        />
      </a>
      
      {/* Desktop nav links */}
      <div style={{ display: 'flex', gap: '8px', fontFamily: 'var(--font-heading)' }}>
        {NAV_LINKS.map((link) => (
          <a 
            key={link.href}
            href={link.href}
            style={{ 
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.02em',
              color: activeHash === link.href ? 'hsl(39, 100%, 45%)' : 'var(--color-text-secondary)',
              background: activeHash === link.href ? 'hsl(39 100% 45% / .08)' : 'transparent',
              transition: 'all 0.3s',
            }}
            onMouseOver={(e) => {
              if (activeHash !== link.href) {
                e.target.style.color = '#fff';
                e.target.style.background = 'hsl(0 0% 100% / .05)';
              }
            }}
            onMouseOut={(e) => {
              e.target.style.color = activeHash === link.href ? 'hsl(39, 100%, 45%)' : 'var(--color-text-secondary)';
              e.target.style.background = activeHash === link.href ? 'hsl(39 100% 45% / .08)' : 'transparent';
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      <button className="btn-primary" style={{ padding: '10px 24px', fontSize: '13px', gap: '8px' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'hsl(0, 0%, 10%)', display: 'inline-block', animation: 'pulseGlow 2s infinite' }}></span>
        Start a Project
      </button>
    </nav>
  );
}
