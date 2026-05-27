import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

function hexToNormalizedRgb(hex) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean.length === 3
    ? clean.split('').map((char) => char + char).join('')
    : clean, 16);
  return {
    r: ((bigint >> 16) & 255) / 255,
    g: ((bigint >> 8) & 255) / 255,
    b: (bigint & 255) / 255,
  };
}

const vertexShader = `
precision highp float;
uniform vec2 u_resolution;
attribute vec2 a_position;
attribute vec4 a_color;
attribute float a_size;
varying vec4 v_color;
void main() {
    vec2 zeroToOne = a_position / u_resolution;
    vec2 clipSpace = (zeroToOne * 2.0 - 1.0);
    v_color = a_color;
    gl_Position = vec4(clipSpace * vec2(1.0, -1.0), 0.0, 1.0);
    gl_PointSize = a_size;
}
`;

const fragmentShader = `
precision highp float;
varying vec4 v_color;
void main() {
    if (v_color.a < 0.01) discard;
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    gl_FragColor = vec4(v_color.rgb, v_color.a * alpha);
}
`;

const config = {
  particleCount: 2000,
  mouseRadius: 220,
  mouseStrength: 0.18,
  drag: 0.94
};

export default function HeroScene() {
  const canvasRef = useRef(null);
  const { colors: themeColors } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl;
    let program;
    let particles = [];
    let positionArray;
    let colorArray;
    let sizeArray;
    let positionBuffer;
    let colorBuffer;
    let sizeBuffer;
    let animationFrameId;
    let time = 0;

    const mouse = { x: -1000, y: -1000 };
    const activeMouse = { x: -1000, y: -1000 };

    function setupCanvas() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    }

    function setupWebGL() {
      gl = canvas.getContext("webgl", {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: true,
        powerPreference: "high-performance",
        premultipliedAlpha: false
      });
      if (!gl) return;
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }

    function compileShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function setupShaders() {
      const vs = compileShader(gl.VERTEX_SHADER, vertexShader);
      const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShader);
      if (!vs || !fs) return;

      program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program link error:", gl.getProgramInfoLog(program));
      }
    }

    function initParticles() {
      particles = [];
      const positions = [];
      const colors = [];
      const sizes = [];
      const N = config.particleCount;

      const c1 = hexToNormalizedRgb(themeColors.accentBlue);
      const c2 = hexToNormalizedRgb(themeColors.accentPurple);
      const c3 = hexToNormalizedRgb(themeColors.accentPink);

      for (let i = 0; i < N; i++) {
        // Random distribution across screen
        const px = Math.random() * canvas.width;
        const py = Math.random() * canvas.height;

        positions.push(px, py);

        // Select a color scheme group
        const colorRand = Math.random();
        let pr, pg, pb;
        if (colorRand < 0.4) {
          pr = c1.r; pg = c1.g; pb = c1.b;
        } else if (colorRand < 0.75) {
          pr = c2.r; pg = c2.g; pb = c2.b;
        } else {
          pr = c3.r; pg = c3.g; pb = c3.b;
        }

        // Random alphas for depth look
        const alpha = 0.25 + Math.random() * 0.55;
        colors.push(pr, pg, pb, alpha);

        // Random sizes (small 1.5px background stars to 4.5px glowing dust)
        const size = (1.5 + Math.pow(Math.random(), 2) * 3.5) * (window.devicePixelRatio || 1);
        sizes.push(size);

        particles.push({
          x: px,
          y: py,
          baseY: py,
          vx: 0,
          vy: 0,
          speed: (0.35 + Math.random() * 1.1) * (window.devicePixelRatio || 1),
          size: size,
          freq: 0.001 + Math.random() * 0.004,
          amp: (10 + Math.random() * 55) * (window.devicePixelRatio || 1),
          phase: Math.random() * Math.PI * 2
        });
      }

      positionArray = new Float32Array(positions);
      colorArray = new Float32Array(colors);
      sizeArray = new Float32Array(sizes);
      createBuffers();
    }

    function createBuffers() {
      positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positionArray, gl.DYNAMIC_DRAW);

      colorBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, colorArray, gl.STATIC_DRAW);

      sizeBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, sizeArray, gl.STATIC_DRAW);
    }

    function updatePhysics() {
      const dpr = window.devicePixelRatio || 1;
      time += 0.012;

      // Smooth mouse transition
      if (activeMouse.x === -1000) {
        activeMouse.x = mouse.x;
        activeMouse.y = mouse.y;
      } else {
        activeMouse.x += (mouse.x - activeMouse.x) * 0.08;
        activeMouse.y += (mouse.y - activeMouse.y) * 0.08;
      }

      const mouseR = config.mouseRadius * dpr;
      const mouseS = config.mouseStrength * dpr;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Drift flow field (left to right)
        p.x += p.speed;

        // Base sine wave trajectory on Y axis
        const targetY = p.baseY + Math.sin(p.x * p.freq + time + p.phase) * p.amp;
        p.y += (targetY - p.y) * 0.05;

        // Apply mouse warp/displacement
        if (activeMouse.x !== -1000) {
          const dx = activeMouse.x - p.x;
          const dy = activeMouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseR && dist > 0) {
            const pull = (1.0 - dist / mouseR) * mouseS;
            // Draw particles gently toward mouse to create cosmic flow streams
            p.vx += (dx / dist) * pull;
            p.vy += (dy / dist) * pull;
          }
        }

        // Apply velocities and drag
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= config.drag;
        p.vy *= config.drag;

        // Edge wrapping
        if (p.x > canvas.width + 10) {
          p.x = -10;
          p.baseY = Math.random() * canvas.height;
          p.y = p.baseY;
          p.vx = 0;
          p.vy = 0;
        }

        positionArray[i * 2] = p.x;
        positionArray[i * 2 + 1] = p.y;
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, positionArray);
    }

    function render() {
      if (!gl) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0); // Transparent background
      gl.clear(gl.COLOR_BUFFER_BIT);

      if (particles.length === 0) return;

      gl.useProgram(program);

      const resolutionLoc = gl.getUniformLocation(program, "u_resolution");
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      const positionLoc = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(positionLoc);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      const colorLoc = gl.getAttribLocation(program, "a_color");
      gl.enableVertexAttribArray(colorLoc);
      gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
      const sizeLoc = gl.getAttribLocation(program, "a_size");
      gl.enableVertexAttribArray(sizeLoc);
      gl.vertexAttribPointer(sizeLoc, 1, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.POINTS, 0, particles.length);
    }

    function loop() {
      updatePhysics();
      render();
      animationFrameId = requestAnimationFrame(loop);
    }

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      mouse.x = (event.clientX - rect.left) * dpr;
      mouse.y = (event.clientY - rect.top) * dpr;
    };

    const handleTouchMove = (event) => {
      if (!event.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      mouse.x = (event.touches[0].clientX - rect.left) * dpr;
      mouse.y = (event.touches[0].clientY - rect.top) * dpr;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      setupCanvas();
      // Redistribute particles inside new resolution boundaries
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.x > canvas.width) p.x = Math.random() * canvas.width;
        if (p.y > canvas.height) {
          p.baseY = Math.random() * canvas.height;
          p.y = p.baseY;
        }
      }
    };

    setupCanvas();
    setupWebGL();
    if (gl) {
      setupShaders();
      initParticles();
      loop();

      window.addEventListener("resize", handleResize);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("touchmove", handleTouchMove, { passive: true });
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("touchmove", handleTouchMove);

      if (gl) {
        if (positionBuffer) gl.deleteBuffer(positionBuffer);
        if (colorBuffer) gl.deleteBuffer(colorBuffer);
        if (sizeBuffer) gl.deleteBuffer(sizeBuffer);
        if (program) gl.deleteProgram(program);
      }
    };
  }, [themeColors]);

  return <canvas ref={canvasRef} className="w-full h-full block cursor-default" />;
}
