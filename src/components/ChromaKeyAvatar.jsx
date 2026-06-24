import React, { useEffect, useRef, useState } from 'react';

export function ChromaKeyAvatar({ src, alt, className }) {
  const canvasRef = useRef(null);
  const [processedSrc, setProcessedSrc] = useState(null);

  useEffect(() => {
    if (!src) return;
    setProcessedSrc(null); // Reset when src changes

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = src;
    
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Green screen chroma key logic
        // Jika hijau sangat mendominasi (Green Screen AI)
        if (g > 180 && r < 120 && b < 120) {
          data[i + 3] = 0; // Transparan penuh
        } else if (g > 120 && g > r * 1.3 && g > b * 1.3) {
          // Feathering/anti-aliasing untuk pinggiran karakter yang agak kehijauan
          const difference = g - Math.max(r, b);
          data[i + 3] = Math.max(0, 255 - (difference * 3));
        }
      }
      ctx.putImageData(imgData, 0, 0);
      setProcessedSrc(canvas.toDataURL('image/png'));
    };
  }, [src]);

  return (
    <>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {processedSrc ? (
        <img src={processedSrc} alt={alt} className={className} />
      ) : (
        <img src={src} alt={alt} className={className} style={{ opacity: 0 }} />
      )}
    </>
  );
}
