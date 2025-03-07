import { useRef, useEffect } from 'react';

export default function Noise({
  patternSize = 250,
  patternScaleX = 5,
  patternScaleY = 5,
  patternRefreshInterval = 2,
  patternAlpha = 50,
}) {
  const grainRef = useRef(null);

  useEffect(() => {
    const canvas = grainRef.current;
    const ctx = canvas.getContext('2d');
    let frame = 0;

    const patternCanvas = document.createElement('canvas');
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    const patternCtx = patternCanvas.getContext('2d');
    const patternData = patternCtx.createImageData(patternSize, patternSize);
    const patternPixelDataLength = patternSize * patternSize * 4;

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;

      ctx.scale(patternScaleX, patternScaleY);
    };

    const updatePattern = () => {
      for (let i = 0; i < patternPixelDataLength; i += 4) {
        const value = Math.random() * 255;
        patternData.data[i] = value;
        patternData.data[i + 1] = value;
        patternData.data[i + 2] = value;
        patternData.data[i + 3] = patternAlpha;
      }
      patternCtx.putImageData(patternData, 0, 0);
    };

    const drawGrain = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = ctx.createPattern(patternCanvas, 'repeat');
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const loop = () => {
      if (frame % patternRefreshInterval === 0) {
        updatePattern();
        drawGrain();
      }
      frame++;
      window.requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    resize();
    loop();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);

  return <canvas className="fixed inset-0 w-full h-full pointer-events-none z-50" style={{ mixBlendMode: 'overlay', opacity: 0.7 }} ref={grainRef} />;
}
