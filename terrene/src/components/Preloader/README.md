# Enhanced Preloader Component

A sophisticated GSAP-powered animated preloader with text reveals, split overlays, and smooth transitions specifically designed for the Revo Realtors website.

---

## ✨ Features

- **Dual-layer text animation** with character-by-character reveals
- **Split overlay effect** for dynamic transitions
- **Floating tag elements** that animate independently
- **Mobile responsive** with adaptive sizing and positioning
- **Timeline continuation** for seamless integration with page content
- **Uses SplitType** (free alternative to GSAP's premium SplitText)
- **Custom easing curves** for smooth, professional animations

---

## 🎯 How It Works

The preloader creates a multi-layered animation sequence:

1. **Tags Fade In** (0.5-0.7s) - Floating tags appear in staggered sequence
2. **Main Title Reveal** (0.5-2s) - "Revo Realtors" characters animate in
3. **First Character Isolates** (2-2.75s) - All but first character animates out
4. **Logo Reveal** (2.5-3.25s) - "RR" logo characters appear
5. **Logo Formation** (3.5-5.25s) - Characters move to final positions
6. **Split & Exit** (5.5-7s) - Screen splits and slides away
7. **Content Fade In** (6-7s) - Main page content becomes visible

---

## 🎨 Animation Timeline

```
0.0s  │ Component mounts
0.5s  │ Tags start animating
0.5s  │ "Revo Realtors" characters reveal
2.0s  │ Most characters exit, leaving first "R"
2.5s  │ "RR" logo starts forming
3.5s  │ Logo position adjustments begin
4.5s  │ Final logo refinements
5.25s │ Clip-path split activates
5.5s  │ Screen halves slide apart
6.0s  │ Page content fades in
7.0s  │ Preloader hidden, animation complete
```

---

## 📦 What Was Installed

### Components Created
- `src/components/Preloader/Preloader.jsx` - Main preloader component

### Styles Added
- Enhanced preloader styles in `src/app/globals.css`
- Includes responsive breakpoints for mobile devices

### Dependencies Used
All dependencies were already in your project:
- ✅ `gsap` (v3.13.0)
- ✅ `split-type` (v0.3.4) - Free alternative to SplitText
- ✅ `@gsap/react` (v2.1.2)

---

## 🎛️ Customization Options

### Props

```jsx
<Preloader 
  mainTitle="Revo Realtors"           // Main brand name
  logoNumber="RR"                      // Logo abbreviation
  tags={[                              // Floating tag texts
    "Architecture",
    "Interior Design", 
    "Spatial Planning"
  ]}
  onAnimationReady={(timeline) => {}} // Callback for timeline control
  className=""                         // Additional CSS classes
/>
```

### Timing Adjustments

In `Preloader.jsx`, you can modify:

```jsx
// Change animation speed
duration: 0.75  // Make faster (0.5) or slower (1.2)

// Change delays
0.5  // Start time in seconds

// Change stagger
stagger: 0.05  // Delay between each character
```

### Visual Customization

In `globals.css`, adjust:

```css
/* Colors */
.enhanced-preloader,
.split-overlay {
  background-color: #0d0c0c;  /* Dark background */
  color: var(--base-100);     /* Light text */
}

/* Tag positioning */
.tag-1 { top: 15%; left: 15%; }
.tag-2 { bottom: 15%; left: 25%; }
.tag-3 { bottom: 30%; right: 15%; }

/* Font sizes */
.enhanced-preloader h1 {
  font-size: 6rem;  /* Desktop */
}
```

---

## 🔧 Integration Details

### In `page.js`:

1. **Import Statement**
```jsx
import Preloader from "@/components/Preloader/Preloader";
```

2. **State Management**
```jsx
const [showEnhancedPreloader, setShowEnhancedPreloader] = useState(true);
const hasEnhancedInit = useRef(false);
```

3. **Timeline Handler**
```jsx
const handleEnhancedPreloaderReady = (tl) => {
  // Continues animation after preloader
  // Handles screen split and content reveal
};
```

4. **Render**
```jsx
{showEnhancedPreloader && (
  <Preloader 
    onAnimationReady={handleEnhancedPreloaderReady}
    mainTitle="Revo Realtors"
    logoNumber="RR"
    tags={["Architecture", "Interior Design", "Spatial Planning"]}
  />
)}
```

---

## 📱 Mobile Responsiveness

The preloader automatically adapts to mobile devices:

- **Font sizes** scale down appropriately
- **Logo positioning** adjusts for smaller screens
- **Tag locations** reposition for better visibility
- **Animation values** adapt to viewport width

Breakpoint: `1000px`

---

## 🎭 Animation Layers

### Layer Structure (Z-Index)

```
10000 │ Enhanced Preloader & Tags Overlay (top)
 9999 │ Split Overlay (middle)
    1 │ Page Content (bottom)
```

### Visual Hierarchy

1. **Tags Overlay** - Floating descriptive text
2. **Enhanced Preloader** - Top half of split screen
3. **Split Overlay** - Bottom half of split screen
4. **Page Content** - Revealed after animations

---

## 🐛 Troubleshooting

### Issue: Animation runs twice
**Solution:** The `useRef(false)` check prevents duplicate animations in React Strict Mode.

### Issue: Text doesn't split correctly
**Solution:** Ensure text is directly in `<h1>` tags without extra wrapper elements.

### Issue: Preloader doesn't hide
**Solution:** Check that `onAnimationReady` callback is properly setting display to none.

### Issue: Content appears too early
**Solution:** Adjust the delay values in the `Copy` components:
```jsx
delay={showEnhancedPreloader ? 7 : 0.85}
```

---

## 🎨 Design Philosophy

This preloader embodies the Revo Realtors brand:

- **Sophisticated** - Multi-layered animations show attention to detail
- **Minimal** - Clean typography and limited color palette
- **Spatial** - Uses split-screen to create depth
- **Professional** - Smooth easing and precise timing

The animation builds anticipation while communicating brand values through motion design.

---

## 🚀 Performance Notes

- **Will-change** properties optimize animation performance
- **Transform-based animations** use GPU acceleration
- **Opacity transitions** are hardware-accelerated
- **Timeline optimization** prevents layout thrashing

---

## 📊 Browser Support

Works in all modern browsers that support:
- CSS `clip-path`
- CSS transforms
- GSAP 3.x
- ES6+ JavaScript

---

## 🔄 Old vs New Preloader

### Old Preloader (Hidden)
- Counter-based animation
- Spinner element
- "Revo Realtors" → "Balance" transition
- Block overlay reveal

### New Enhanced Preloader (Active)
- Character-by-character reveal
- Split-screen effect
- "Revo Realtors" → "RR" logo formation
- Floating tags animation
- Dual-layer system

The old preloader is still in the code but hidden (`display: none`). You can remove it if desired.

---

## 💡 Tips for Best Results

1. **Preload Fonts:** Ensure "Manrope" font loads before animation
2. **Test on Devices:** Check animation on various screen sizes
3. **Adjust Delays:** Fine-tune `delay` values for your content
4. **Monitor Performance:** Use Chrome DevTools to check FPS
5. **Accessibility:** Consider adding a "Skip" button for accessibility

---

## 🎯 Future Enhancements

Possible additions:
- Progress indicator
- Skip button
- Sound effects
- Particle effects
- Loading percentage
- Reduced motion support

---

## 📝 License Note

This component uses:
- **GSAP** - Free for most use cases (check greensock.com/licensing)
- **SplitType** - Free MIT license
- **Custom code** - Part of your project

---

**Built with ❤️ for Revo Realtors**

For questions or modifications, refer to the GSAP documentation:
- GSAP Docs: https://greensock.com/docs/
- SplitType: https://github.com/lukePeavey/SplitType
