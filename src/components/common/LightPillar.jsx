import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const LightPillar = ({
  topColor = '#70b5ff',    // updated default top color
  bottomColor = '#091a2a', // updated default bottom color
  intensity = 0.15,
  rotationSpeed = 0.15,
  interactive = true,
  className = '',
  glowAmount = 0.002,
  pillarWidth = 3.5,
  pillarHeight = 0.3,
  noiseIntensity = 0.05,
  mixBlendMode = 'screen',
  pillarRotation = 15,
  quality = 'high' // Added for performance: 'low', 'medium', 'high'
}) => {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const geometryRef = useRef(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const timeRef = useRef(0);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check WebGL support and device type
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebGLSupported(false);
      console.warn('WebGL is not supported in this browser');
    }

    // Check if mobile device
    const checkMobile = () => {
      return window.innerWidth <= 768 || 
             /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    
    setIsMobile(checkMobile());
    
    // Listen for resize to update mobile state
    const handleResize = () => {
      setIsMobile(checkMobile());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !webGLSupported) return;

    const container = containerRef.current;
    const isLowQuality = quality === 'low' || isMobile;
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isLowQuality,
        alpha: true,
        powerPreference: isLowQuality ? 'low-power' : 'high-performance',
        precision: isLowQuality ? 'lowp' : 'mediump',
        stencil: false,
        depth: false,
        failIfMajorPerformanceCaveat: true
      });
    } catch (error) {
      console.error('Failed to create WebGL renderer:', error);
      setWebGLSupported(false);
      return;
    }

    // Set pixel ratio for performance
    const pixelRatio = isLowQuality ? Math.min(window.devicePixelRatio, 1) : window.devicePixelRatio;
    renderer.setPixelRatio(pixelRatio);

    const handleResize = () => {
      if (!rendererRef.current || !materialRef.current || !containerRef.current) return;
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      // For mobile/low quality, reduce resolution
      const scale = isLowQuality ? 0.5 : 1;
      const renderWidth = Math.floor(width * scale);
      const renderHeight = Math.floor(height * scale);
      
      rendererRef.current.setSize(renderWidth, renderHeight, false);
      materialRef.current.uniforms.uResolution.value.set(renderWidth, renderHeight);
      
      // Update canvas style for crisp rendering
      renderer.domElement.style.width = `${width}px`;
      renderer.domElement.style.height = `${height}px`;
    };

    // Initial size setting
    handleResize();

    // Use ResizeObserver for dynamic height changes
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Convert hex colors to RGB
    const parseColor = hex => {
      const color = new THREE.Color(hex);
      return new THREE.Vector3(color.r, color.g, color.b);
    };

    // Shader material - optimized for background
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform vec3 uTopColor;
      uniform vec3 uBottomColor;
      uniform float uIntensity;
      uniform bool uInteractive;
      uniform float uGlowAmount;
      uniform float uPillarWidth;
      uniform float uPillarHeight;
      uniform float uNoiseIntensity;
      uniform float uPillarRotation;
      uniform bool uIsMobile;
      varying vec2 vUv;

      const float PI = 3.141592653589793;
      const float E = 2.71828182845904523536;
      const float HALF = 0.5;

      mat2 rot(float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat2(c, -s, s, c);
      }

      // Optimized noise function for background
      float noise(vec2 coord) {
        vec2 r = vec2(E * sin(E * coord.x), E * sin(E * coord.y));
        return fract(r.x * r.y * (1.0 + coord.x));
      }

      // Simplified wave deformation for background
      vec3 applyWaveDeformation(vec3 pos, float timeOffset) {
        float frequency = 1.0;
        float amplitude = 0.5; // Reduced for background
        vec3 deformed = pos;
        
        // Reduced iterations for performance
        for(float i = 0.0; i < 2.0; i++) {
          deformed.xz *= rot(0.4);
          float phase = timeOffset * i * 1.5;
          vec3 oscillation = cos(deformed.zxy * frequency - phase);
          deformed += oscillation * amplitude;
          frequency *= 1.5;
          amplitude *= HALF;
        }
        return deformed;
      }

      // Optimized blending for background
      float blendMax(float a, float b, float k) {
        float h = max(k - abs(a - b), 0.0);
        return max(a, b) + h * h * 0.25 / k;
      }

      void main() {
        vec2 fragCoord = vUv * uResolution;
        vec2 uv = (fragCoord * 2.0 - uResolution) / uResolution.y;
        
        // Apply 2D rotation to UV coordinates
        float rotAngle = uPillarRotation * PI / 180.0;
        uv *= rot(rotAngle);

        vec3 origin = vec3(0.0, 0.0, -8.0); // Reduced depth for background
        vec3 direction = normalize(vec3(uv, 1.0));

        float maxDepth = uIsMobile ? 30.0 : 40.0; // Reduced depth for mobile
        float depth = 0.1;

        mat2 rotX = rot(uTime * 0.2); // Slower rotation for background
        
        if(uInteractive && length(uMouse) > 0.0) {
          rotX = rot(uMouse.x * PI * 1.0); // Reduced mouse influence
        }

        vec3 color = vec3(0.0);
        
        // Reduced ray marching steps for background
        float steps = uIsMobile ? 50.0 : 70.0;
        for(float i = 0.0; i < steps; i++) {
          vec3 pos = origin + direction * depth;
          pos.xz *= rotX;

          // Apply vertical scaling and wave deformation
          vec3 deformed = pos;
          deformed.y *= uPillarHeight;
          deformed = applyWaveDeformation(deformed + vec3(0.0, uTime * 0.5, 0.0), uTime * 0.5); // Slower animation
          
          // Simplified distance field
          vec2 cosinePair = cos(deformed.xz);
          float fieldDistance = length(cosinePair) - 0.15;
          
          // Radial boundary constraint
          float radialBound = length(pos.xz) - uPillarWidth;
          fieldDistance = blendMax(radialBound, fieldDistance, 0.8);
          fieldDistance = abs(fieldDistance) * 0.2 + 0.01;

          vec3 gradient = mix(uBottomColor, uTopColor, smoothstep(10.0, -10.0, pos.y));
          color += gradient * (1.0 / (fieldDistance * fieldDistance * 4.0));

          if(fieldDistance < 0.001 || depth > maxDepth) break;
          depth += fieldDistance;
        }

        // Normalize by pillar width
        float widthNormalization = uPillarWidth / 3.0;
        color = tanh(color * uGlowAmount / widthNormalization);
        
        // Reduced noise for background
        float rnd = noise(gl_FragCoord.xy * 0.5); // Scaled coordinates
        color -= rnd / 20.0 * uNoiseIntensity;
        
        // Apply intensity with smooth fade at edges
        float edgeFade = smoothstep(1.5, 0.5, length(uv));
        gl_FragColor = vec4(color * uIntensity * edgeFade, 0.8); // Reduced opacity for background
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
        uMouse: { value: mouseRef.current },
        uTopColor: { value: parseColor(topColor) },
        uBottomColor: { value: parseColor(bottomColor) },
        uIntensity: { value: intensity },
        uInteractive: { value: interactive },
        uGlowAmount: { value: glowAmount },
        uPillarWidth: { value: pillarWidth },
        uPillarHeight: { value: pillarHeight },
        uNoiseIntensity: { value: noiseIntensity },
        uPillarRotation: { value: pillarRotation },
        uIsMobile: { value: isMobile }
      },
      transparent: true,
      depthWrite: false,
      depthTest: false
    });
    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    geometryRef.current = geometry;
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse interaction - optimized for background
    let lastMouseX = 0;
    let mouseMoveTimeout = null;
    
    const handleMouseMove = event => {
      if (!interactive || isMobile) return;

      if (mouseMoveTimeout) return;

      mouseMoveTimeout = window.setTimeout(() => {
        mouseMoveTimeout = null;
      }, 32); // ~30fps throttle for background

      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Smooth mouse movement for background
      mouseRef.current.x += (x - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (y - mouseRef.current.y) * 0.1;
    };

    if (interactive && !isMobile) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Animation loop with adaptive frame rate for background
    let lastTime = performance.now();
    const targetFPS = isMobile ? 30 : 45; // Lower FPS for background
    const frameTime = 1000 / targetFPS;
    let framesDropped = 0;

    const animate = currentTime => {
      if (!materialRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;

      const deltaTime = currentTime - lastTime;

      if (deltaTime >= frameTime) {
        // Adaptive time step for smoother background animation
        const timeStep = Math.min(deltaTime, 32) / 1000;
        timeRef.current += timeStep * rotationSpeed;
        materialRef.current.uniforms.uTime.value = timeRef.current;
        
        // Update mobile uniform if changed
        materialRef.current.uniforms.uIsMobile.value = isMobile;
        
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        lastTime = currentTime - (deltaTime % frameTime);
        framesDropped = 0;
      } else {
        framesDropped++;
        // If too many frames dropped, force a render
        if (framesDropped > 10) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
          framesDropped = 0;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      if (interactive && !isMobile) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
      if (materialRef.current) {
        materialRef.current.dispose();
      }
      if (geometryRef.current) {
        geometryRef.current.dispose();
      }

      rendererRef.current = null;
      materialRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      geometryRef.current = null;
      rafRef.current = null;
    };
  }, [
    topColor,
    bottomColor,
    intensity,
    rotationSpeed,
    interactive,
    glowAmount,
    pillarWidth,
    pillarHeight,
    noiseIntensity,
    pillarRotation,
    webGLSupported,
    isMobile,
    quality
  ]);

  if (!webGLSupported) {
    return (
      <div
        className={`w-full h-full absolute top-0 left-0 flex items-center justify-center bg-gradient-to-b from-blue-900/20 to-black/30 ${className}`}
        style={{ mixBlendMode }}
      >
        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-black/20"></div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full absolute top-0 left-0 ${className}`} 
      style={{ mixBlendMode, pointerEvents: interactive ? 'auto' : 'none' }}
    />
  );
};

export default LightPillar;