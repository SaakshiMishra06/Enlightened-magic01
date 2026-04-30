import React from 'react';

export default function Footer() {
  return (
    <footer id="contact" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', backgroundColor: '#020202', padding: '80px 5% 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <h2 style={{ fontSize: '40px', fontWeight: 700, marginBottom: '24px', letterSpacing: '-0.02em', textAlign: 'center' }}>
          Ready to create <span className="text-accent-gradient">Magic?</span>
        </h2>
        
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '18px', marginBottom: '40px', textAlign: 'center' }}>
          Let's build something extraordinary together.
        </p>
        
        <a href="mailto:hello@enlightenedmagic.com" className="btn-primary" style={{ padding: '16px 40px', fontSize: '16px', marginBottom: '120px' }}>
          hello@enlightenedmagic.com
        </a>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '40px' }}>
          <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} Enlightened Magic. All rights reserved.
          </div>
          
          <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: 'var(--color-text-muted)' }}>
            <a href="#" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--color-text-muted)'}>Data Usage Transparency</a>
            <a href="#" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--color-text-muted)'}>Cookies</a>
            <a href="#" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--color-text-muted)'}>Privacy Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
