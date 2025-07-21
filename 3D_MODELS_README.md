# 3D Earth Models Integration Guide

This guide explains how to integrate 3D Earth models from Sketchfab and Free3D into your cosmic lottery minting page.

## 🚀 Quick Start

1. **Install Dependencies** (already done):
   ```bash
   npm install three @types/three @react-three/fiber @react-three/drei
   ```

2. **Run the Demo**:
   ```bash
   npm start
   ```
   Then click the "🌍 3D Demo" button to explore the 3D Earth models.

## 🌍 Available 3D Components

### 1. Basic Earth Model (`Earth3D.tsx`)
- Simple rotating Earth sphere
- Customizable rotation speed and scale
- Good for basic Earth representation

### 2. Advanced Earth Model (`AdvancedEarth3D.tsx`)
- Realistic Earth with atmosphere and clouds
- Configurable atmosphere, clouds, and stars
- Best for immersive Earth visualization

### 3. External Model Loader (`ModelLoader.tsx`)
- Loads external 3D models from URLs
- Supports GLTF/GLB formats
- Fallback models for different planet types

## 📦 Integration with Your 3D Models

### For Sketchfab Models

1. **Download your model**:
   - Go to your Sketchfab model page
   - Click "Download 3D Model"
   - Choose GLTF/GLB format
   - Download the file

2. **Host the model**:
   - Upload the model file to a web server
   - Ensure CORS headers are enabled
   - Get the direct URL to the model file

3. **Use in your app**:
   ```tsx
   import ModelLoader from './components/ModelLoader';
   
   <ModelLoader
     className="w-full h-64"
     modelUrl="https://your-server.com/earth-model.glb"
     autoRotate={true}
     rotationSpeed={0.5}
     fallbackModel="earth"
   />
   ```

### For Free3D Models

1. **Download your model**:
   - Download from Free3D in your preferred format
   - Convert to GLTF/GLB if necessary using:
     - **Blender**: Import → Export as GLTF
     - **Online converters**: Convertio, Online-Convert
     - **Command line**: gltf-pipeline

2. **Host and use** (same as Sketchfab)

## 🎨 Customization Options

### Advanced Earth Model
```tsx
<AdvancedEarth3D
  className="w-full h-64"
  autoRotate={true}
  rotationSpeed={0.5}
  scale={1}
  showAtmosphere={true}
  showClouds={true}
  showStars={true}
/>
```

### External Model Loader
```tsx
<ModelLoader
  className="w-full h-64"
  modelUrl="https://your-model-url.glb"
  autoRotate={true}
  rotationSpeed={0.5}
  scale={1}
  position={[0, 0, 0]}
  fallbackModel="earth" // 'earth' | 'sphere' | 'cube'
/>
```

## 🔧 Props Reference

### Common Props
- `className`: CSS classes for styling
- `autoRotate`: Enable/disable automatic rotation
- `rotationSpeed`: Speed of rotation (0-2)
- `scale`: Model scale factor
- `position`: 3D position [x, y, z]

### Advanced Earth Props
- `showAtmosphere`: Show atmospheric glow
- `showClouds`: Show cloud layer
- `showStars`: Show star background

### Model Loader Props
- `modelUrl`: URL to external 3D model
- `fallbackModel`: Fallback model type

## 🌟 Integration with Minting Tiers

The `MintingTier3D.tsx` component shows how to integrate 3D models into your existing minting tiers:

```tsx
import MintingTier3D from './components/MintingTier3D';

// Use in your grid
<MintingTier3D
  tierNumber={index}
  tier={tier}
  onMint={handleMint}
  isLoading={isLoading}
/>
```

## 🎯 Example: Earth Tier with 3D Model

The Earth tier (tier 3) automatically uses the advanced 3D Earth model with:
- Realistic blue ocean color
- Green continent overlay
- Atmospheric glow
- Cloud layer
- Smooth rotation

## 🔄 Switching Between 2D and 3D

Users can toggle between 2D icons and 3D models using the "View 3D Model" button in each tier card.

## 🛠️ Troubleshooting

### Model Not Loading
1. Check CORS headers on your server
2. Verify the model URL is accessible
3. Ensure the model is in GLTF/GLB format
4. Check browser console for errors

### Performance Issues
1. Reduce model complexity
2. Lower polygon count
3. Optimize textures
4. Use fallback models for mobile

### Model Scaling Issues
1. Adjust the `scale` prop
2. Modify the model in Blender
3. Use `position` prop for fine-tuning

## 📱 Mobile Considerations

- 3D models may impact performance on mobile devices
- Consider using fallback 2D icons for mobile
- Test rotation and interaction on touch devices

## 🎨 Styling Tips

- Use `className` prop for custom styling
- Match model colors with your tier color scheme
- Consider adding hover effects and animations
- Use backdrop blur for glass-morphism effects

## 🔗 Useful Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [GLTF Format](https://www.khronos.org/gltf/)
- [Sketchfab Download Guide](https://help.sketchfab.com/hc/en-us/articles/203059088-Downloading-models)
- [Free3D Download Guide](https://free3d.com/help/)

## 🚀 Next Steps

1. **Add your own 3D models** from Sketchfab or Free3D
2. **Customize the Earth appearance** with different textures
3. **Create planet-specific models** for other celestial bodies
4. **Add interactive features** like click-to-rotate
5. **Optimize for performance** on different devices

## 💡 Pro Tips

- Use `useGLTF` hook for better model loading
- Implement loading states for better UX
- Add error boundaries for model loading failures
- Consider using `Suspense` for better performance
- Cache models to avoid repeated downloads

---

**Happy 3D modeling! 🌍✨** 