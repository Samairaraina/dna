import { useEffect, useRef } from "react";

export default function DnaBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      const strands = 2;
      const segments = 30;
      const spacing = 20;
      const amplitude = 60;
      const centerX = canvas.width / 2;
      const startY = -50;

      for (let s = 0; s < strands; s++) {
        const phaseOffset = s * Math.PI;
        ctx.beginPath();
        ctx.strokeStyle = s === 0
          ? "rgba(74, 222, 128, 0.15)"
          : "rgba(34, 211, 238, 0.15)";
        ctx.lineWidth = 2;

        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const y = startY + t * (canvas.height + 100);
          const x = centerX + Math.sin(t * 10 + time * 2 + phaseOffset) * amplitude;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const y = startY + t * (canvas.height + 100);
        const x1 = centerX + Math.sin(t * 10 + time * 2) * amplitude;
        const x2 = centerX + Math.sin(t * 10 + time * 2 + Math.PI) * amplitude;

        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = "rgba(250, 204, 21, 0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x1, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(74, 222, 128, 0.2)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x2, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34, 211, 238, 0.2)";
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
