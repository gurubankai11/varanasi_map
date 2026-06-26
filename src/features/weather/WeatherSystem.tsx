import React, { useEffect, useRef } from 'react';
import type { TimeCycle } from '../../hooks/useKolkataTime';
import type { WeatherData } from '../../hooks/useWeather';

interface WeatherSystemProps {
  weather: WeatherData;
  timeCycle: TimeCycle;
}

export const WeatherSystem: React.FC<WeatherSystemProps> = ({ weather, timeCycle }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle Classes
    class RainDrop {
      x = Math.random() * width;
      y = Math.random() * -height;
      vy = 10 + Math.random() * 15;
      vx = -2 - Math.random() * 2;
      len = 15 + Math.random() * 20;

      update() {
        this.y += this.vy;
        this.x += this.vx;
        if (this.y > height) {
          this.y = -20;
          this.x = Math.random() * width;
        }
      }

      draw() {
        ctx!.strokeStyle = 'rgba(174, 219, 255, 0.4)';
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(this.x, this.y);
        ctx!.lineTo(this.x + this.vx, this.y + this.len);
        ctx!.stroke();
      }
    }

    class MistCloud {
      x = Math.random() * width;
      y = Math.random() * height;
      vx = (Math.random() - 0.5) * 0.4;
      vy = (Math.random() - 0.5) * 0.1;
      radius = 100 + Math.random() * 150;
      alpha = 0.03 + Math.random() * 0.05;

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x - this.radius > width) this.x = -this.radius;
        if (this.x + this.radius < 0) this.x = width + this.radius;
        if (this.y - this.radius > height) this.y = -this.radius;
        if (this.y + this.radius < 0) this.y = height + this.radius;
      }

      draw() {
        const grad = ctx!.createRadialGradient(this.x, this.y, 10, this.x, this.y, this.radius);
        grad.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    class StarOrMote {
      x = Math.random() * width;
      y = Math.random() * height;
      size = 0.5 + Math.random() * 2.0;
      alpha = Math.random();
      speed = 0.05 + Math.random() * 0.1;
      type: 'star' | 'dust' | 'firefly' = 'star';

      constructor(type: 'star' | 'dust' | 'firefly' = 'star') {
        this.type = type;
        if (type === 'dust' || type === 'firefly') {
          this.speed = 0.1 + Math.random() * 0.3;
        }
      }

      update() {
        if (this.type === 'star') {
          this.alpha += this.speed * (Math.random() > 0.5 ? 1 : -1);
          if (this.alpha < 0) this.alpha = 0;
          if (this.alpha > 1) this.alpha = 1;
        } else {
          // Dust floats upwards
          this.y -= this.speed;
          this.x += (Math.random() - 0.5) * 0.2;
          if (this.y < -10) {
            this.y = height + 10;
            this.x = Math.random() * width;
          }
        }
      }

      draw() {
        if (this.type === 'star') {
          ctx!.fillStyle = `rgba(255, 255, 255, ${this.alpha * 0.6})`;
          ctx!.beginPath();
          ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx!.fill();
        } else if (this.type === 'dust') {
          // Golden morning dust
          ctx!.fillStyle = `rgba(255, 180, 50, ${Math.sin(this.y * 0.01) * 0.3})`;
          ctx!.beginPath();
          ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx!.fill();
        } else {
          // Glowing green-orange fireflies
          ctx!.fillStyle = `rgba(255, 140, 0, ${Math.abs(Math.sin(Date.now() * 0.001 * this.speed)) * 0.5})`;
          ctx!.shadowColor = 'rgba(255, 110, 0, 0.8)';
          ctx!.shadowBlur = 4;
          ctx!.beginPath();
          ctx!.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.shadowBlur = 0; // reset
        }
      }
    }

    const raindrops: RainDrop[] = [];
    const mists: MistCloud[] = [];
    const motes: StarOrMote[] = [];

    // Initialize systems
    if (weather.condition === 'rainy' || weather.condition === 'thunderstorm') {
      const count = weather.condition === 'thunderstorm' ? 120 : 60;
      for (let i = 0; i < count; i++) raindrops.push(new RainDrop());
    }
    
    if (weather.condition === 'foggy') {
      for (let i = 0; i < 15; i++) mists.push(new MistCloud());
    }

    if (timeCycle === 'sunrise') {
      for (let i = 0; i < 40; i++) motes.push(new StarOrMote('dust'));
    } else if (timeCycle === 'night' || timeCycle === 'aarti') {
      // stars
      for (let i = 0; i < 60; i++) motes.push(new StarOrMote('star'));
      // fireflies
      for (let i = 0; i < 15; i++) motes.push(new StarOrMote('firefly'));
    }

    // Handle Resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Rain
      if (raindrops.length > 0) {
        raindrops.forEach(drop => {
          drop.update();
          drop.draw();
        });
      }

      // Fog/Mist
      if (mists.length > 0) {
        mists.forEach(mist => {
          mist.update();
          mist.draw();
        });
      }

      // Stars/Dust motes
      if (motes.length > 0) {
        motes.forEach(mote => {
          mote.update();
          mote.draw();
        });
      }

      // Lightning flash in thunderstorms
      if (weather.condition === 'thunderstorm' && Math.random() > 0.992) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.fillRect(0, 0, width, height);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [weather.condition, timeCycle]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
export default WeatherSystem;
