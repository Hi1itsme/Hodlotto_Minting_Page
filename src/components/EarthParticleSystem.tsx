import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface EarthParticleSystemProps {
    className?: string;
}

const EarthParticleSystem: React.FC<EarthParticleSystemProps> = ({ className = '' }) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const controlsRef = useRef<OrbitControls | null>(null);
    const particlesRef = useRef<THREE.Points | null>(null);

    // Function to create circular particle texture
    const createCircleTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            // Create gradient for smooth circle
            const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.8)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 32, 32);
        }

        return canvas;
    };

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000); // Black background
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 2.5);

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.localClippingEnabled = true;
        renderer.localClippingEnabled = true; // Enable local clipping
        rendererRef.current = renderer;

        // Orbit controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 1.2;
        controls.maxDistance = 8;
        controlsRef.current = controls;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        // Create clipping plane for highlighting effect
        const clippingPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);

        // Create Earth particle system
        const createEarthParticles = async () => {
            const particleCount = 10000; // Reduced from 100,000 to 10,000
            const radius = 1;

            // Create buffer geometry
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);

            // Load Earth texture
            const textureLoader = new THREE.TextureLoader();
            const earthTexture = await new Promise<THREE.Texture | null>((resolve, reject) => {
                textureLoader.load(
                    '/earth_texture.jpg',
                    (texture) => {
                        console.log('Earth texture loaded successfully');
                        resolve(texture);
                    },
                    undefined,
                    (error) => {
                        console.warn('Earth texture not found, using fallback colors');
                        resolve(null);
                    }
                );
            });

            // Create canvas for texture sampling if texture is available
            let textureCanvas: HTMLCanvasElement | null = null;
            let textureCtx: CanvasRenderingContext2D | null = null;

            if (earthTexture) {
                textureCanvas = document.createElement('canvas');
                textureCanvas.width = earthTexture.image.width;
                textureCanvas.height = earthTexture.image.height;
                textureCtx = textureCanvas.getContext('2d', { willReadFrequently: true });
                textureCtx?.drawImage(earthTexture.image, 0, 0);
                console.log('Texture canvas created:', textureCanvas.width, 'x', textureCanvas.height);
            } else {
                console.log('No Earth texture available');
            }

            // Generate particles on sphere surface
            for (let i = 0; i < particleCount; i++) {
                // Spherical coordinates
                const phi = Math.acos(-1 + (2 * i) / particleCount);
                const theta = Math.sqrt(particleCount * Math.PI) * phi;

                // Convert to Cartesian coordinates
                const x = radius * Math.cos(theta) * Math.sin(phi);
                const y = radius * Math.sin(theta) * Math.sin(phi);
                const z = radius * Math.cos(phi);

                // Set positions
                positions[i * 3] = x;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = z;

                // Calculate UV coordinates for texture sampling
                const u = (theta / (2 * Math.PI)) % 1;
                const v = phi / Math.PI;



                // Sample color from texture or use fallback
                let color = new THREE.Color(0x4a90e2); // Default blue

                if (textureCtx && textureCanvas) {
                    const pixelX = Math.floor(u * textureCanvas.width);
                    const pixelY = Math.floor(v * textureCanvas.height);

                    try {
                        const imageData = textureCtx.getImageData(pixelX, pixelY, 1, 1);
                        const data = imageData.data;
                        // Convert from RGBA to RGB and normalize
                        const r = data[0] / 255;
                        const g = data[1] / 255;
                        const b = data[2] / 255;
                        color = new THREE.Color(r, g, b);

                    } catch (error) {
                        console.error('Error sampling texture:', error);
                        // Fallback to default color if sampling fails
                        color = new THREE.Color(0x4a90e2);
                    }
                } else {
                    console.log('No texture context available, using fallback colors');
                }

                // Set colors
                colors[i * 3] = color.r;
                colors[i * 3 + 1] = color.g;
                colors[i * 3 + 2] = color.b;


            }

            // Set attributes
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            // Create points material with clipping plane
            const particleMaterial = new THREE.PointsMaterial({
                size: 0.03,
                vertexColors: true,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                clippingPlanes: [clippingPlane]
            });

            // Create points
            const particles = new THREE.Points(geometry, particleMaterial);
            particlesRef.current = particles;
            scene.add(particles);
            console.log('Earth particle system created with', particleCount, 'particles');
        };

        // Initialize particle system
        createEarthParticles();

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            const time = Date.now() * 0.001; // Current time in seconds

            // Move clipping plane along X-axis
            const planeOffset = Math.sin(time * 0.5) * 0.5; // Move between -0.5 and 0.5
            clippingPlane.constant = planeOffset;

            // Update particle colors based on distance to clipping plane
            if (particlesRef.current) {

                // Update particle colors based on distance to clipping plane
                const geometry = particlesRef.current.geometry;
                const positions = geometry.attributes.position.array as Float32Array;
                const colors = geometry.attributes.color.array as Float32Array;

                // Apply clipping plane highlighting effect
                for (let i = 0; i < positions.length; i += 3) {
                    const colorIndex = i / 3 * 3;
                    const x = positions[i];
                    const y = positions[i + 1];
                    const z = positions[i + 2];

                    // Calculate distance to clipping plane
                    const distanceToPlane = x - planeOffset;

                    // Color particles red if they're in the cut area (behind the plane)
                    if (distanceToPlane < 0) {
                        colors[colorIndex] = 1.0;     // Red
                        colors[colorIndex + 1] = 0.0; // Green
                        colors[colorIndex + 2] = 0.0; // Blue
                    }
                }

                geometry.attributes.color.needsUpdate = true;

                // Keep Earth stationary (no rotation)
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
            className={`w-full h-full ${className}`}
            style={{ minHeight: '400px' }}
        />
    );
};

export default EarthParticleSystem; 