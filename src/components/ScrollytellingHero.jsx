import React, { useRef, useEffect, useState } from 'react';

const FRAME_COUNT = 224;

export default function ScrollytellingHero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);

  // Preload images
  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      // Format number to 3 digits e.g. 001, 045, 120
      const imgNumber = i.toString().padStart(3, '0');
      img.src = `/frames/ezgif-frame-${imgNumber}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          // All images loaded, initial draw
          setImages(loadedImages);
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
      
      // Calculate scroll progress within this specific section
      // Math: how far the top of the container has scrolled past the top of the viewport
      const scrollY = -top; 
      const maxScroll = height - viewportHeight;
      
      let rawProgress = scrollY / maxScroll;
      // clamp between 0 and 1
      rawProgress = Math.max(0, Math.min(1, rawProgress));
      
      setProgress(rawProgress);
      
      // Calculate frame index
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(rawProgress * FRAME_COUNT)
      );
      
      requestAnimationFrame(() => drawFrame(images, frameIndex));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, [images]);

  const drawFrame = (imgs, index) => {
    const canvas = canvasRef.current;
    if (!canvas || !imgs[index]) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions to match window (or a specific aspect ratio)
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Draw image centered and covering the canvas (like object-fit: cover)
    const img = imgs[index];
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;
    
    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      drawHeight = canvas.height;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Helper to determine text opacity based on progress range
  const getOpacity = (start, end, inProgress) => {
    const fadeWindow = 0.05; // 5% fade in/out window
    if (inProgress < start - fadeWindow || inProgress > end + fadeWindow) return 0;
    if (inProgress >= start && inProgress <= end) return 1;
    if (inProgress < start) return (inProgress - (start - fadeWindow)) / fadeWindow;
    if (inProgress > end) return 1 - ((inProgress - end) / fadeWindow);
    return 0;
  };

  return (
    <div ref={containerRef} style={{ height: '500vh', position: 'relative' }}>
      <div 
        style={{ 
          position: 'sticky', 
          top: 0, 
          height: '100vh', 
          width: '100%', 
          overflow: 'hidden',
          backgroundColor: '#050505'
        }}
      >
        <canvas 
          ref={canvasRef} 
          style={{ width: '100%', height: '100%', display: 'block' }} 
        />
        
        {/* TEXT OVERLAYS */}
        
        {/* 0–20% (HERO INTRO) */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          opacity: getOpacity(0, 0.18, progress),
          transition: 'opacity 0.1s',
          pointerEvents: 'none',
          textAlign: 'center'
        }}>
          <h1 className="text-gradient" style={{ fontSize: '72px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '16px' }}>
            Enlightened Magic
          </h1>
          <p style={{ fontSize: '24px', color: 'var(--color-text-secondary)', fontWeight: 300, maxWidth: '600px' }}>
            We don't just create visuals. We build experiences.
          </p>
        </div>

        {/* 20–45% (DISASSEMBLY – PHOTOGRAPHY) */}
        <div style={{
          position: 'absolute', top: 0, left: '10%', bottom: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',
          opacity: getOpacity(0.22, 0.43, progress),
          transition: 'opacity 0.1s',
          pointerEvents: 'none'
        }}>
          <h2 style={{ fontSize: '56px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px', maxWidth: '500px', lineHeight: 1.1 }}>
            Visual storytelling, <br/>
            <span className="text-accent-gradient">engineered for impact.</span>
          </h2>
          <p style={{ fontSize: '20px', color: 'var(--color-text-secondary)', fontWeight: 300, maxWidth: '400px', lineHeight: 1.5 }}>
            From product photography to cinematic video, every frame is designed to convert.
          </p>
        </div>

        {/* 45–70% (TECH + DIGITAL) */}
        <div style={{
          position: 'absolute', top: 0, right: '10%', bottom: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end',
          opacity: getOpacity(0.47, 0.68, progress),
          transition: 'opacity 0.1s',
          pointerEvents: 'none',
          textAlign: 'right'
        }}>
          <h2 style={{ fontSize: '56px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px', maxWidth: '500px', lineHeight: 1.1 }}>
            Technology meets <br/>
            <span className="text-accent-gradient">creativity.</span>
          </h2>
          <p style={{ fontSize: '20px', color: 'var(--color-text-secondary)', fontWeight: 300, maxWidth: '400px', lineHeight: 1.5 }}>
            Web development, e-commerce, and AI-powered solutions built for growth.
          </p>
        </div>

        {/* 70–85% (FULL ECOSYSTEM) */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          opacity: getOpacity(0.72, 0.83, progress),
          transition: 'opacity 0.1s',
          pointerEvents: 'none',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '64px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px', lineHeight: 1.1 }}>
            From concept <br/>
            <span className="text-gradient">to conversion.</span>
          </h2>
          <p style={{ fontSize: '24px', color: 'var(--color-accent-blue)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Strategy. Shoot. Build. Scale.
          </p>
        </div>

        {/* 85–100% (REASSEMBLY) */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          opacity: getOpacity(0.87, 1.0, progress),
          transition: 'opacity 0.1s',
          pointerEvents: progress > 0.87 ? 'auto' : 'none',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '72px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '40px' }}>
            Build your brand with <br/>
            <span className="text-accent-gradient">Enlightened Magic</span>
          </h2>
          <button className="btn-primary" style={{ padding: '16px 32px', fontSize: '18px' }}>
            Start a Project Today
          </button>
        </div>

      </div>
    </div>
  );
}
