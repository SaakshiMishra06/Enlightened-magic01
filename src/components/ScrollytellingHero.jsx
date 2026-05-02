import React, { useRef, useEffect, useState } from 'react';

const FRAME_COUNT = 224;

export default function ScrollytellingHero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const imgNumber = i.toString().padStart(3, '0');
      img.src = `/frames/ezgif-frame-${imgNumber}.jpg`;
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          setLoaded(true);
          drawFrame(loadedImages, 0);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || images.length === 0) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollY = -top; 
      const maxScroll = height - viewportHeight;
      
      let rawProgress = scrollY / maxScroll;
      rawProgress = Math.max(0, Math.min(1, rawProgress));
      
      setProgress(rawProgress);
      
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(rawProgress * FRAME_COUNT)
      );
      
      requestAnimationFrame(() => drawFrame(images, frameIndex));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [images]);

  const drawFrame = (imgs, index) => {
    const canvas = canvasRef.current;
    if (!canvas || !imgs[index]) return;
    
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;
    
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    const img = imgs[index];
    const canvasRatio = displayWidth / displayHeight;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;
    
    if (canvasRatio > imgRatio) {
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgRatio;
      offsetX = 0;
      offsetY = (displayHeight - drawHeight) / 2;
    } else {
      drawWidth = displayHeight * imgRatio;
      drawHeight = displayHeight;
      offsetX = (displayWidth - drawWidth) / 2;
      offsetY = 0;
    }
    
    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  const getOpacity = (start, end, inProgress) => {
    const fadeWindow = 0.05;
    if (inProgress < start - fadeWindow || inProgress > end + fadeWindow) return 0;
    if (inProgress >= start && inProgress <= end) return 1;
    if (inProgress < start) return (inProgress - (start - fadeWindow)) / fadeWindow;
    if (inProgress > end) return 1 - ((inProgress - end) / fadeWindow);
    return 0;
  };

  // Parallax offset for text overlays
  const getTranslateY = (start, end, inProgress) => {
    if (inProgress < start || inProgress > end) return 0;
    const mid = (start + end) / 2;
    if (inProgress < mid) return 0;
    return -((inProgress - mid) / (end - mid)) * 30;
  };

  return (
    <div ref={containerRef} id="overview" style={{ height: '500vh', position: 'relative' }}>
      <div 
        style={{ 
          position: 'sticky', 
          top: 0, 
          height: '100vh', 
          width: '100%', 
          overflow: 'hidden',
          backgroundColor: 'var(--color-bg-deep)'
        }}
      >
        {/* Loading screen */}
        {!loaded && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 50,
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            background: 'var(--color-bg-deep)',
          }}>
            <img 
              src="/logo.avif" 
              alt="Loading" 
              style={{ 
                height: '60px', 
                width: 'auto', 
                marginBottom: '40px',
                animation: 'float 2s ease-in-out infinite',
                filter: 'drop-shadow(0 0 20px hsl(39 100% 45% / .4))'
              }} 
            />
            <div style={{ width: '200px', height: '2px', background: 'hsl(0 0% 20%)', borderRadius: '2px', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{
                width: `${loadProgress}%`,
                height: '100%',
                background: 'var(--gradient-gold)',
                borderRadius: '2px',
                transition: 'width 0.3s ease-out',
                boxShadow: '0 0 10px hsl(39 100% 45% / .5)'
              }} />
            </div>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)', letterSpacing: '0.1em' }}>
              LOADING EXPERIENCE · {loadProgress}%
            </p>
          </div>
        )}

        <canvas 
          ref={canvasRef} 
          style={{ width: '100%', height: '100%', display: 'block', opacity: loaded ? 1 : 0, transition: 'opacity 1s' }} 
        />

        {/* Cinematic vignette overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, hsl(0 0% 5% / .6) 100%)',
          pointerEvents: 'none'
        }} />
        
        {/* TEXT OVERLAYS */}
        
        {/* 0–20% (HERO INTRO) */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          opacity: getOpacity(0, 0.18, progress),
          transform: `translateY(${getTranslateY(0, 0.18, progress)}px)`,
          transition: 'opacity 0.15s',
          pointerEvents: 'none',
          textAlign: 'center'
        }}>
          <img 
            src="/logo.avif" 
            alt="Enlightened Magic" 
            style={{ 
              height: '70px', 
              width: 'auto', 
              marginBottom: '24px',
              filter: 'drop-shadow(0 0 30px hsl(39 100% 45% / .4))',
              animation: loaded ? 'float 4s ease-in-out infinite' : 'none'
            }} 
          />
          <h1 className="text-shimmer" style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '20px', lineHeight: 1 }}>
            Enlightened Magic
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 24px)', color: 'var(--color-text-secondary)', fontWeight: 300, maxWidth: '550px', lineHeight: 1.6 }}>
            We don't just create visuals. We build experiences.
          </p>
          
          {/* Scroll hint */}
          <div style={{
            position: 'absolute', bottom: '40px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            animation: 'float 2s ease-in-out infinite'
          }}>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>Scroll to explore</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(39, 100%, 45%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
            </svg>
          </div>
        </div>

        {/* 20–45% (DISASSEMBLY – PHOTOGRAPHY) */}
        <div style={{
          position: 'absolute', top: 0, left: '8%', bottom: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',
          opacity: getOpacity(0.22, 0.43, progress),
          transform: `translateY(${getTranslateY(0.22, 0.43, progress)}px)`,
          transition: 'opacity 0.15s',
          pointerEvents: 'none'
        }}>
          <span className="section-label" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '30px', height: '1px', background: 'var(--color-primary)' }}></span>
            Photography & Video
          </span>
          <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '20px', maxWidth: '520px', lineHeight: 1.08 }}>
            Visual storytelling, <br/>
            <span className="text-accent-gradient">engineered for impact.</span>
          </h2>
          <p style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', color: 'var(--color-text-secondary)', fontWeight: 300, maxWidth: '420px', lineHeight: 1.6 }}>
            From product photography to cinematic video, every frame is designed to convert.
          </p>
        </div>

        {/* 45–70% (TECH + DIGITAL) */}
        <div style={{
          position: 'absolute', top: 0, right: '8%', bottom: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end',
          opacity: getOpacity(0.47, 0.68, progress),
          transform: `translateY(${getTranslateY(0.47, 0.68, progress)}px)`,
          transition: 'opacity 0.15s',
          pointerEvents: 'none',
          textAlign: 'right'
        }}>
          <span className="section-label" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            Development & AI
            <span style={{ width: '30px', height: '1px', background: 'var(--color-primary)' }}></span>
          </span>
          <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '20px', maxWidth: '520px', lineHeight: 1.08 }}>
            Technology meets <br/>
            <span className="text-accent-gradient">creativity.</span>
          </h2>
          <p style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', color: 'var(--color-text-secondary)', fontWeight: 300, maxWidth: '420px', lineHeight: 1.6 }}>
            Web development, e-commerce, and AI-powered solutions built for growth.
          </p>
        </div>

        {/* 70–85% (FULL ECOSYSTEM) */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          opacity: getOpacity(0.72, 0.83, progress),
          transform: `translateY(${getTranslateY(0.72, 0.83, progress)}px)`,
          transition: 'opacity 0.15s',
          pointerEvents: 'none',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '20px', lineHeight: 1.08 }}>
            From concept <br/>
            <span className="text-gradient">to conversion.</span>
          </h2>
          <div style={{ display: 'flex', gap: '32px', color: 'var(--color-primary)', fontWeight: 500, fontSize: 'clamp(14px, 1.5vw, 20px)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
            {['Strategy', 'Shoot', 'Build', 'Scale'].map((word, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {word}
                {i < 3 && <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-primary)', opacity: 0.5 }}></span>}
              </span>
            ))}
          </div>
        </div>

        {/* 85–100% (REASSEMBLY) */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          opacity: getOpacity(0.87, 1.0, progress),
          transition: 'opacity 0.15s',
          pointerEvents: progress > 0.87 ? 'auto' : 'none',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: 'clamp(40px, 5.5vw, 76px)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '40px', lineHeight: 1.05 }}>
            Build your brand with <br/>
            <span className="text-shimmer">Enlightened Magic</span>
          </h2>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="btn-primary" style={{ padding: '16px 36px', fontSize: '16px' }}>
              Start a Project Today
            </button>
            <button className="btn-outline" style={{ padding: '16px 36px', fontSize: '16px' }}>
              View Our Work
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)',
          width: '2px', height: '120px', background: 'hsl(0 0% 100% / .08)', borderRadius: '2px'
        }}>
          <div style={{
            width: '2px',
            height: `${progress * 100}%`,
            background: 'var(--gradient-gold)',
            borderRadius: '2px',
            transition: 'height 0.1s linear',
            boxShadow: '0 0 8px hsl(39 100% 45% / .4)'
          }} />
        </div>

      </div>
    </div>
  );
}
