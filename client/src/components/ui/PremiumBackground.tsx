import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const VS_SOURCE = `
attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FS_SOURCE = `// WebGL Procedural Fragment Shader featuring glowing multi-layered cyber waves, floating holographic shields, candlestick chart traces, and ambient luminous cyan/golden ribbons.
// Enhanced with light celestial blue atmospheric wash at the top and animated twinkling star/dot-light particle constellations derived from the logo color system.
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// Simplex noise utilities
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,
                        0.366025403784439,
                       -0.577350269189626,
                        0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

// Pseudo-random hash for stars
float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
}

// 4-pointed sparkle star calculation
float starSparkle(vec2 uv, float flareSize) {
    float d = length(uv);
    float glow = (0.012 * flareSize) / (d + 0.018);
    // 4-point cross diffraction rays
    float rays = max(0.0, 1.0 - abs(uv.x * uv.y) * 2600.0) * smoothstep(0.18 * flareSize, 0.0, d);
    return glow + rays * 0.45;
}

// Candlestick financial bars
float candlesticks(vec2 uv, float t) {
    float barWidth = 0.014;
    float spacing = 0.035;
    float colIdx = floor(uv.x / spacing);
    float localX = fract(uv.x / spacing) - 0.5;
    
    float n = sin(colIdx * 19.345 + 1.2) * 0.5 + 0.5;
    float baseH = 0.10 + n * 0.28;
    float animH = baseH + sin(t * 1.5 + colIdx * 0.9) * 0.04;
    float baseY = -0.15 + sin(colIdx * 0.25) * 0.22;
    
    float wick = smoothstep(0.003, 0.001, abs(localX * spacing)) * 
                 step(baseY - animH * 0.7, uv.y) * step(uv.y, baseY + animH * 0.7);
                 
    float body = smoothstep(barWidth * 0.5, barWidth * 0.5 - 0.002, abs(localX * spacing)) *
                 step(baseY - animH * 0.4, uv.y) * step(uv.y, baseY + animH * 0.4);
                 
    return max(wick * 0.4, body);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    
    // Mouse interactive deflection (gentle 2-6px feel)
    vec2 mouseNorm = (u_mouse / u_resolution) - 0.5;
    p += mouseNorm * 0.08;
    
    // Smooth time progression
    float t = u_time * 0.45;
    
    // Palette from reference & brand logo system (#0f2d6b primary navy, vivid azure #2563eb, luminous cyan #10b8d9)
    vec3 cWhite       = vec3(0.985, 0.992, 1.000); // Luminous white
    vec3 cPaleSky     = vec3(0.880, 0.935, 0.990); // Ethereal light pastel sky blue
    vec3 cSoftAzure   = vec3(0.720, 0.850, 0.980); // Light logo brand azure
    vec3 cCyan        = vec3(0.05, 0.78, 0.96);    // Radiant cyan
    vec3 cCobalt      = vec3(0.12, 0.40, 0.96);    // Electric cobalt
    vec3 cDeepNavy    = vec3(0.03, 0.11, 0.38);    // Deep oceanic royal navy (#0f2d6b core)
    vec3 cAmber       = vec3(0.99, 0.79, 0.44);    // Luminous golden fiber
    
    // 1. Base Gradient with Light Blue Atmospheric Gradient across top (solves "In top it is plain")
    // Top is an elegant gradient from Soft Azure & Pale Sky down to ethereal luminous surface
    vec3 topAtmosphere = mix(cSoftAzure, cPaleSky, smoothstep(1.0, 0.55, uv.y));
    vec3 col = mix(topAtmosphere, cWhite, smoothstep(0.92, 0.42, uv.y));
    // Soft radial light bloom in the top-right / top-center echoing the brand aura
    float topGlow = smoothstep(1.2, 0.0, length(p - vec2(0.4, 0.75)));
    col = mix(col, cSoftAzure * 1.08, topGlow * 0.28);

    // 2. Animated Twinkling Star & Dot Light Effect across upper sky
    vec2 starGridUV = p * 8.5;
    vec2 starCell = floor(starGridUV);
    vec2 starFrac = fract(starGridUV) - 0.5;
    
    for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
            vec2 neighbor = vec2(float(x), float(y));
            vec2 currentCell = starCell + neighbor;
            float rnd = hash21(currentCell);
            
            if (rnd > 0.45 && (p.y + float(y)*0.12) > -0.25) {
                vec2 starOffset = vec2(
                    sin(t * 0.8 + rnd * 6.28) * 0.18,
                    cos(t * 0.6 + rnd * 6.28) * 0.18
                );
                vec2 diff = starFrac - neighbor - starOffset;
                
                float twinkle = sin(t * (1.8 + rnd * 2.5) + rnd * 12.0) * 0.5 + 0.5;
                twinkle = pow(twinkle, 2.2); 
                
                float dotSize = 0.5 + rnd * 0.8;
                float starIntensity = starSparkle(diff * (7.0 / dotSize), dotSize);
                
                float starSkyMask = smoothstep(-0.25, 0.45, p.y) * (1.0 - smoothstep(1.15, 1.45, p.y));
                
                vec3 starCol = (rnd > 0.82) ? cAmber : mix(cCyan, cWhite, 0.65);
                col += starCol * starIntensity * twinkle * starSkyMask * 0.55;
            }
        }
    }
    
    vec2 microP = fract(p * 4.0 + vec2(sin(t * 0.2) * 0.1, t * 0.12)) - 0.5;
    float microDot = smoothstep(0.045, 0.0, length(microP));
    float microDensity = snoise(p * 2.8 + vec2(t * 0.18, -t * 0.1));
    float topSkyMask = smoothstep(-0.15, 0.6, p.y);
    col += cCobalt * microDot * max(0.0, microDensity) * topSkyMask * 0.35;
    
    // 3. Candlesticks in background
    float candle = candlesticks(p, t);
    float candleFade = smoothstep(-0.9, -0.1, p.x) * smoothstep(1.5, 0.1, p.x) * 
                       smoothstep(-0.6, 0.2, p.y) * smoothstep(0.9, 0.2, p.y);
    col = mix(col, cCobalt * 1.1, candle * candleFade * 0.35);
    
    // 4. Multi-harmonic flowing waves
    float w1 = sin(p.x * 1.4 + t * 0.85) * 0.24 
             + sin(p.x * 2.8 - t * 0.42) * 0.12 
             + snoise(vec2(p.x * 1.1 + t * 0.18, t * 0.12)) * 0.15 - 0.15;
    float dist1 = p.y - w1;
    
    float w2 = sin(p.x * 1.8 - t * 0.65 + 1.2) * 0.22 
             + cos(p.x * 3.3 + t * 0.55) * 0.08 
             + snoise(vec2(p.x * 1.4 - t * 0.22, 2.1)) * 0.12 - 0.08;
    float dist2 = p.y - w2;
    
    float w3 = sin(p.x * 2.2 + t * 1.1 + 2.5) * 0.18 
             + sin(p.x * 4.4 - t * 0.7) * 0.06 - 0.04;
    float dist3 = p.y - w3;
    
    float w4 = sin(p.x * 1.5 + t * 0.75 + 0.5) * 0.25 
             + cos(p.x * 2.9 - t * 0.5) * 0.08 - 0.24;
    float dist4 = p.y - w4;

    float bodyFill1 = smoothstep(0.25, -0.35, dist1) * 0.88;
    vec3 waveBodyCol = mix(cCobalt, cDeepNavy, clamp(-dist1 * 1.3, 0.0, 1.0));
    col = mix(col, waveBodyCol, bodyFill1 * smoothstep(1.0, 0.05, uv.y));
    
    float bodyFill2 = smoothstep(0.18, -0.25, dist2) * 0.5;
    col = mix(col, cCobalt * 1.2, bodyFill2 * (1.0 - bodyFill1 * 0.6));
    
    float ribbon1 = 0.022 / (abs(dist1) + 0.038);
    float ribbon2 = 0.018 / (abs(dist2) + 0.032);
    float ribbon3 = 0.010 / (abs(dist3) + 0.022); 
    float ribbonGold = 0.007 / (abs(dist4) + 0.020); 
    
    col += cCobalt * ribbon1 * 0.6;
    col += cCyan * ribbon2 * 0.8;
    col += (cCyan + vec3(0.2, 0.3, 0.4)) * ribbon3 * 1.1;
    col += cAmber * ribbonGold * 0.95;
    
    float meshU = fract(p.x * 22.0 + t * 0.5);
    float meshLines = smoothstep(0.04, 0.0, abs(meshU - 0.5));
    float meshMask = smoothstep(0.02, -0.3, dist1) * smoothstep(-0.55, -0.05, dist1);
    col += cCyan * meshLines * meshMask * 0.28;
    
    // Floating Security Shields
    vec2 s1Center = vec2(0.80, 0.26 + sin(t * 1.0) * 0.05);
    vec2 sp1 = p - s1Center;
    float dS1 = length(sp1) - 0.22;
    float shieldGlow1 = 0.020 / (abs(dS1) + 0.035);
    float checkMask1 = smoothstep(0.07, 0.01, length(sp1 - vec2(0.0, -0.02)));
    col += cCyan * shieldGlow1 * 0.9;
    col += cWhite * checkMask1 * (sin(t * 2.2) * 0.25 + 0.75) * 0.45;
    
    vec2 s2Center = vec2(0.52, 0.44 + sin(t * 0.8 + 1.8) * 0.04);
    vec2 sp2 = p - s2Center;
    float dS2 = length(sp2) - 0.13;
    float shieldGlow2 = 0.011 / (abs(dS2) + 0.030);
    col += cCyan * shieldGlow2 * 0.65;
    
    vec2 s3Center = vec2(1.15, 0.52 + sin(t * 0.7 + 3.2) * 0.03);
    vec2 sp3 = p - s3Center;
    float dS3 = length(sp3) - 0.09;
    float shieldGlow3 = 0.008 / (abs(dS3) + 0.025);
    col += cCyan * shieldGlow3 * 0.45;
    
    vec2 sparkP = fract(p * 5.5 + vec2(t * 0.12, -t * 0.08)) - 0.5;
    float spark = smoothstep(0.05, 0.0, length(sparkP));
    float sparkDensity = snoise(p * 2.2 + vec2(t * 0.15, t * 0.05));
    float sparkZone = smoothstep(0.4, 0.0, abs(dist2));
    col += (cCyan * 1.6 + vec3(0.2)) * spark * max(0.0, sparkDensity) * sparkZone * 1.3;

    gl_FragColor = vec4(col, 1.0);
}
`;

export const PremiumBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const location = useLocation();
  const path = location.pathname;

  const getConfig = () => {
    if (path === '/') return { intensity: 1.0 };
    if (path.startsWith('/about')) return { intensity: 1.0 };
    if (path.startsWith('/analyze')) return { intensity: 0.3 };
    if (path.startsWith('/dashboard')) return { intensity: 0.6 };
    if (path.startsWith('/learn')) return { intensity: 0.7 };
    if (path.startsWith('/history')) return { intensity: 0.2 };
    if (path.startsWith('/settings')) return { intensity: 0.2 };
    return { intensity: 0.6 };
  };

  const config = getConfig();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    let gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    if (!gl) return;
    
    // Compile shader
    function compileShader(type: number, source: string) {
      if (!gl) return null;
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile failed: ', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, VS_SOURCE);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, FS_SOURCE);
    if (!vertexShader || !fragmentShader) return;
    
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link failed: ', gl.getProgramInfoLog(program));
      return;
    }
    
    gl.useProgram(program);
    
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 
       1, -1, 
      -1,  1, 
       1,  1
    ]), gl.STATIC_DRAW);
    
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = window.innerHeight - e.clientY;
    };
    
    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    let animationFrameId: number;
    let startTime = performance.now();
    
    const render = (time: number) => {
      if (!canvas || !gl) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
      
      // If prefers reduced motion, stop time progress but draw 1 frame
      const elapsed = prefersReducedMotion ? 0 : (time - startTime);
      
      gl.uniform1f(uTime, elapsed * 0.001);
      if (uRes) gl.uniform2f(uRes, width, height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    
    animationFrameId = requestAnimationFrame(render);
    
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        gl.deleteBuffer(positionBuffer);
      }
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-white transition-opacity duration-700 ease-in-out" 
      aria-hidden="true"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block transition-opacity duration-700 ease-in-out"
        style={{ opacity: config.intensity }}
      />
    </div>
  );
};
