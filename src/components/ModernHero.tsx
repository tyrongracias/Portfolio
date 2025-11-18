import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
  opacity: number;
}

interface WebGLUniforms {
  uTex: WebGLUniformLocation | null;
  uResolution: WebGLUniformLocation | null;
  uTextPos: WebGLUniformLocation | null;
  uTextSize: WebGLUniformLocation | null;
  uPixelSize: WebGLUniformLocation | null;
  uTime: WebGLUniformLocation | null;
  uMouse: WebGLUniformLocation | null;
  uWaveAmp: WebGLUniformLocation | null;
  uParallaxAmp: WebGLUniformLocation | null;
  uDotRadius: WebGLUniformLocation | null;
  uUseVideo: WebGLUniformLocation | null;
}

export default function ModernHero() {
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelCanvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const uniformsRef = useRef<WebGLUniforms | null>(null);
  const mouseRef2 = useRef({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [useVideo, setUseVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Check screen size for responsive text
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []); // Start with colors, switch to video when loaded

  useEffect(() => {
    setIsVisible(true);
    
    // Particle animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      baseVx: number;
      baseVy: number;
    }> = [];
    
    // Create particles
    for (let i = 0; i < 100; i++) {
      const baseVx = (Math.random() - 0.5) * 0.5;
      const baseVy = (Math.random() - 0.5) * 0.5;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: baseVx,
        vy: baseVy,
        baseVx: baseVx,
        baseVy: baseVy,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate parallax offset for entire particle system
      const parallaxX = (mouseRef.current.x - canvas.width / 2) * 0.025;
      const parallaxY = (mouseRef.current.y - canvas.height / 2) * 0.025;
      
      particles.forEach(particle => {
        // Update position with base velocity
        particle.x += particle.baseVx;
        particle.y += particle.baseVy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle with parallax offset
        const drawX = particle.x + parallaxX;
        const drawY = particle.y + parallaxY;
        
        ctx.beginPath();
        ctx.arc(drawX, drawY, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // WebGL Pixel Text Effect
  useEffect(() => {
    const canvas = pixelCanvasRef.current;
    if (!canvas) return;
    
    const gl = canvas.getContext('webgl2', { antialias: false });
    if (!gl) {
      console.warn('WebGL2 not supported');
      return;
    }
    
    glRef.current = gl;
    
    // Vertex shader
    const vertexShaderSource = `#version 300 es
      precision highp float;
      out vec2 v_uv;
      const vec2 verts[3] = vec2[](
        vec2(-1.0,-1.0),
        vec2( 3.0,-1.0),
        vec2(-1.0, 3.0)
      );
      void main(){
        vec2 p = verts[gl_VertexID];
        v_uv = p*0.5 + 0.5;
        gl_Position = vec4(p,0.0,1.0);
      }`;
    
    // Fragment shader - simplified full canvas rendering
    const fragmentShaderSource = `#version 300 es
      precision highp float;
      in vec2 v_uv;
      out vec4 outColor;
      uniform sampler2D uTex;
      uniform vec2 uResolution;
      uniform float uPixelSize;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uWaveAmp;
      uniform float uParallaxAmp;
      uniform float uDotRadius;
      uniform bool uUseVideo;
      
      // Color palette
      vec3 getPixelColor(vec2 gridPos) {
        float hue = fract(gridPos.x * 0.05 + gridPos.y * 0.03 + uTime * 0.1);
        vec3 colors[6] = vec3[](
          vec3(1.0, 0.0, 1.0), // magenta
          vec3(0.5, 1.0, 0.0), // lime green
          vec3(1.0, 0.0, 0.5), // pink
          vec3(0.0, 0.5, 1.0), // blue
          vec3(0.5, 0.0, 1.0), // purple
          vec3(1.0, 0.5, 0.0)  // orange
        );
        int index = int(hue * 6.0);
        vec3 color1 = colors[index];
        vec3 color2 = colors[(index + 1) % 6];
        return mix(color1, color2, fract(hue * 6.0));
      }
      
      void main(){
        vec2 fragPx = v_uv * uResolution;
        vec2 cellCenter = floor(fragPx / uPixelSize) * uPixelSize + uPixelSize * 0.5;
        vec2 local = (fragPx - cellCenter) / uPixelSize;
        
        // Parallax and wave effects
        vec2 par = uMouse * uParallaxAmp * 0.02;
        float wY = sin((cellCenter.y * 0.02) + uTime * 2.0) * uWaveAmp * 8.0;
        float wX = cos((cellCenter.x * 0.015) + uTime * 1.5) * uWaveAmp * 6.0;
        vec2 wavePx = vec2(wX, wY);
        
        vec2 animatedCenter = cellCenter + par + wavePx;
        vec2 sampledUV = (animatedCenter / uResolution);
        
        // Perfect circular dots
        float dist = length(local);
        float mask = step(dist, uDotRadius);
        
        vec3 pixelColor;
        if (uUseVideo) {
          pixelColor = texture(uTex, sampledUV).rgb;
        } else {
          vec2 gridPos = floor(animatedCenter / uPixelSize);
          pixelColor = getPixelColor(gridPos);
        }
        
        vec3 finalCol = pixelColor * mask;
        outColor = vec4(finalCol, 1.0);
      }`;
    
    // Compile shaders
    function compileShader(type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }
    
    const vs = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vs || !fs) return;
    
    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    
    gl.useProgram(program);
    gl.bindVertexArray(gl.createVertexArray());
    
    // Get uniform locations
    const uniforms: WebGLUniforms = {
      uTex: gl.getUniformLocation(program, 'uTex'),
      uResolution: gl.getUniformLocation(program, 'uResolution'),
      uTextPos: null,
      uTextSize: null,
      uPixelSize: gl.getUniformLocation(program, 'uPixelSize'),
      uTime: gl.getUniformLocation(program, 'uTime'),
      uMouse: gl.getUniformLocation(program, 'uMouse'),
      uWaveAmp: gl.getUniformLocation(program, 'uWaveAmp'),
      uParallaxAmp: gl.getUniformLocation(program, 'uParallaxAmp'),
      uDotRadius: gl.getUniformLocation(program, 'uDotRadius'),
      uUseVideo: gl.getUniformLocation(program, 'uUseVideo')
    };
    
    uniformsRef.current = uniforms;
    
    // Create texture for video
    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    
    // Set static uniforms
    gl.uniform1i(uniforms.uTex, 0);
    gl.uniform1f(uniforms.uWaveAmp, 0.3);
    gl.uniform1f(uniforms.uParallaxAmp, 0.8);
    gl.uniform1f(uniforms.uDotRadius, 0.3);
    gl.uniform1i(uniforms.uUseVideo, useVideo ? 1 : 0);
    
    // Update uniform when useVideo state changes
    const updateVideoUniform = () => {
      if (uniforms.uUseVideo) {
        gl.uniform1i(uniforms.uUseVideo, useVideo ? 1 : 0);
      }
    };
    updateVideoUniform();
    
    // No texture needed - we'll use CSS text overlay
    
    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef2.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef2.current.y = ((e.clientY - rect.top) / rect.height) * -2 + 1;
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    
    // Resize handler
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      
      if (uniforms.uResolution) gl.uniform2f(uniforms.uResolution, w, h);
      if (uniforms.uPixelSize) gl.uniform1f(uniforms.uPixelSize, Math.max(3, Math.floor(w / 160)));
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    // Animation loop
    let animationId: number;
    const animate = (time: number) => {
      if (uniforms.uTime) gl.uniform1f(uniforms.uTime, time * 0.001);
      if (uniforms.uMouse) gl.uniform2f(uniforms.uMouse, mouseRef2.current.x, mouseRef2.current.y);
      
      // Update video texture if available
      if (useVideo && videoRef.current && videoRef.current.readyState >= 2) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, videoRef.current);
      }
      
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate(0);
    
    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      if (program) gl.deleteProgram(program);
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
      if (texture) gl.deleteTexture(texture);
    };
  }, []);

  // Update video uniform when useVideo state changes
  useEffect(() => {
    if (uniformsRef.current?.uUseVideo) {
      const gl = glRef.current;
      if (gl) {
        gl.uniform1i(uniformsRef.current.uUseVideo, useVideo ? 1 : 0);
      }
    }
  }, [useVideo]);



  return (
    <section id="hero" className="min-h-screen relative overflow-hidden flex items-center bg-black">
      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: 'transparent' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        <div className="flex flex-col items-center text-center">
          {/* Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white/90 border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Available for new projects</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <div className="relative w-full max-w-6xl mx-auto">
                {/* Hidden video element */}
                <video
                  ref={videoRef}
                  className="hidden"
                  src="/assets/hero.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  crossOrigin="anonymous"
                  onLoadedData={() => {
                    console.log('Video loaded successfully');
                    setUseVideo(true);
                  }}
                  onError={(e) => {
                    console.log('Video failed to load, using colors:', e);
                    setUseVideo(false);
                  }}
                />
                
                <p className="text-lg lg:text-[26px] text-white mb-4 text-center font-thin" 
                   style={{ fontFamily: '"Satoshi", sans-serif' }}>
                  Hello! My name is
                </p>
                
                {isMobile ? (
                  <div className="text-center">
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight" 
                        style={{ fontFamily: '"Doto", sans-serif' }}>
                      TYRON
                    </h1>
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight -mt-4" 
                        style={{ fontFamily: '"Doto", sans-serif' }}>
                      GRACIAS
                    </h1>
                  </div>
                ) : (
                  <h1 className="text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-tight text-center" 
                      style={{ fontFamily: '"Doto", sans-serif' }}>
                    TYRON GRACIAS
                  </h1>
                )}
              </div>
              <p className="text-lg lg:text-[26px] text-white max-w-2xl leading-relaxed mx-auto text-center font-thin" 
                 style={{ fontFamily: '"Satoshi", sans-serif' }}>
                I build <span className="font-thin" style={{ fontFamily: '"Satoshi", sans-serif' }}>intuitive,</span> <span className="font-semibold" style={{ fontFamily: '"Doto", sans-serif', color: '#00fcd2' }}>user-focused</span> digital experiences <span className="font-thin" style={{ fontFamily: '"Satoshi", sans-serif' }}>powered by</span> <span className="font-semibold" style={{ fontFamily: '"Doto", sans-serif', color: '#00fcd2' }}>creative thinking</span> <span className="font-thin" style={{ fontFamily: '"Satoshi", sans-serif' }}>and</span> <span className="font-semibold" style={{ fontFamily: '"Doto", sans-serif', color: '#00fcd2' }}>smart technology</span>.
              </p>
            </div>




          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/60" />
      </div>
    </section>
  );
}

export { ModernHero };