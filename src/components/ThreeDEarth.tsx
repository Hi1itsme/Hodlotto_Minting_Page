import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface ThreeDEarthProps {
  children?: React.ReactNode;
  className?: string;
}

const ThreeDEarth: React.FC<ThreeDEarthProps> = ({ children, className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);
  const atmosphereRef = useRef<THREE.Mesh | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Create star field
  const createStars = () => {
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 10000;
    const positions = new Float32Array(starsCount * 3);
    const colors = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;
      // Random positions in a sphere
      const radius = 50 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Random star colors (white to blue)
      const color = new THREE.Color();
      color.setHSL(0.6, 0.8, Math.random() * 0.5 + 0.5);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starsMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    return new THREE.Points(starsGeometry, starsMaterial);
  };

  // Create atmosphere glow with advanced shader
  const createAtmosphere = () => {
    const atmosphereGeometry = new THREE.SphereGeometry(1.1, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPositionNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPositionNormal;
        uniform vec3 glowColor;
        uniform float bias;
        uniform float power;
        uniform float scale;
        
        void main() {
          float a = pow(bias + scale * abs(dot(vNormal, vPositionNormal)), power);
          gl_FragColor = vec4(glowColor, 1.0) * a;
        }
      `,
      uniforms: {
        glowColor: { value: new THREE.Color(0.3, 0.6, 1.0) },
        bias: { value: 0.0 },
        power: { value: 2.0 },
        scale: { value: 1.0 }
      },
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.4
    });

    return new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000011); // Deep blue background
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 3);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1.5;
    controls.maxDistance = 10;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Add stars
    const stars = createStars();
    starsRef.current = stars;
    scene.add(stars);

    // Create Earth
    const createEarth = async () => {
      const earthGeometry = new THREE.SphereGeometry(1, 64, 64);

      // Load Earth textures
      const textureLoader = new THREE.TextureLoader();

      try {
        const earthTexture = await new Promise<THREE.Texture>((resolve, reject) => {
          textureLoader.load(
            '/earth_texture_repo.jpg',
            resolve,
            undefined,
            () => {
              console.log('Using fallback Earth texture');
              // Create a simple fallback texture
              const canvas = document.createElement('canvas');
              canvas.width = 512;
              canvas.height = 256;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                // Create a simple Earth-like texture
                const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
                gradient.addColorStop(0, '#1e3a8a'); // Blue
                gradient.addColorStop(0.3, '#059669'); // Green
                gradient.addColorStop(0.7, '#dc2626'); // Red
                gradient.addColorStop(1, '#1e3a8a'); // Blue
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
              }
              const texture = new THREE.CanvasTexture(canvas);
              resolve(texture);
            }
          );
        });

        const earthMaterial = new THREE.ShaderMaterial({
          vertexShader: `
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vp;
            varying vec3 vPositionNormal;
            void main(void){
              vUv = uv;
              vNormal = normalize(normalMatrix * normal);
              vp = position;
              vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform vec3 glowColor;
            uniform float bias;
            uniform float power;
            uniform float time;
            uniform float scale;
            uniform sampler2D map;
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vPositionNormal;
            varying vec3 vp;
            
            void main(void){
              float a = pow(bias + scale * abs(dot(vNormal, vPositionNormal)), power);
              vec4 baseColor = texture2D(map, vUv);
              vec4 glowEffect = vec4(glowColor, 1.0) * a;
              gl_FragColor = mix(baseColor, glowEffect, 0.3);
            }
          `,
          uniforms: {
            glowColor: { value: new THREE.Color(0.3, 0.6, 1.0) },
            bias: { value: 0.0 },
            power: { value: 2.0 },
            scale: { value: 1.0 },
            time: { value: 0.0 },
            map: { value: earthTexture }
          }
        });

        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        earth.castShadow = true;
        earth.receiveShadow = true;
        earthRef.current = earth;
        scene.add(earth);

        // Add atmosphere
        const atmosphere = createAtmosphere();
        atmosphereRef.current = atmosphere;
        scene.add(atmosphere);

        setIsLoading(false);
      } catch (error) {
        console.error('Error loading Earth textures:', error);
        setIsLoading(false);
      }
    };

    createEarth();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Rotate Earth
      if (earthRef.current) {
        earthRef.current.rotation.y += 0.002;
      }

      // Rotate atmosphere
      if (atmosphereRef.current) {
        atmosphereRef.current.rotation.y += 0.001;
      }

      // Rotate stars slowly
      if (starsRef.current) {
        starsRef.current.rotation.y += 0.0001;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    const mountElement = mountRef.current;
    mountElement.appendChild(renderer.domElement);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountElement && renderer.domElement) {
        mountElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full ${className}`}
      style={{ minHeight: '400px' }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-white text-sm">Loading Earth...</p>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default ThreeDEarth; 