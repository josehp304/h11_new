/**
 * ENHANCED PRELOADER - COMPONENT STRUCTURE
 * =========================================
 * 
 * Visual representation of the preloader layers and animation flow
 */

/*
┌─────────────────────────────────────────────────────────────┐
│                    COMPONENT ARCHITECTURE                    │
└─────────────────────────────────────────────────────────────┘

Layer Stack (z-index):
┌─────────────────────────────────────────────────────────────┐
│  10000  │  ENHANCED PRELOADER & TAGS OVERLAY               │
│         │  (Top layer - main animation area)                │
├─────────────────────────────────────────────────────────────┤
│   9999  │  SPLIT OVERLAY                                    │
│         │  (Middle layer - creates split effect)            │
├─────────────────────────────────────────────────────────────┤
│      1  │  PAGE CONTENT                                     │
│         │  (Bottom layer - revealed after animation)        │
└─────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────┐
│                     ANIMATION TIMELINE                       │
└─────────────────────────────────────────────────────────────┘

0s ───┬── Component Mount
      │
0.5s ─┼── Tags fade in (staggered)
      │   ┌─ "Architecture"
      │   ├─ "Interior Design"  
      │   └─ "Spatial Planning"
      │
0.5s ─┼── "REVO REALTORS" reveals
      │   (character by character)
      │
2.0s ─┼── Letters exit (except first "R")
      │
2.5s ─┼── "RR" logo appears
      │
3.5s ─┼── Logo moves to position
      │
4.5s ─┼── Final position refinement
      │
5.25s┼── Clip-path split activates
      │   ┌─ Top half: polygon(0 0, 100% 0, 100% 50%, 0 50%)
      │   └─ Bottom half: polygon(0 50%, 100% 50%, 100% 100%, 0 100%)
      │
5.5s ─┼── Screen halves slide apart
      │   ┌─ Top half: translateY(-50%)
      │   └─ Bottom half: translateY(50%)
      │
6.0s ─┼── Page content fades in
      │   (opacity: 0 → 1, y: 20px → 0)
      │
7.0s ─┴── Animation complete
          Preloader hidden (display: none)


┌─────────────────────────────────────────────────────────────┐
│                      ELEMENT STRUCTURE                       │
└─────────────────────────────────────────────────────────────┘

<Preloader>
├── <div className="enhanced-preloader">
│   ├── <div className="intro-title">
│   │   └── <h1>{mainTitle}</h1>
│   │       └── Split into .char > span elements
│   └── <div className="outro-title">
│       └── <h1>{logoNumber}</h1>
│           └── Split into .char > span elements
│
├── <div className="split-overlay">
│   ├── <div className="intro-title">
│   │   └── <h1>{mainTitle}</h1>
│   │       └── Pre-positioned for split effect
│   └── <div className="outro-title">
│       └── <h1>{logoNumber}</h1>
│           └── Pre-positioned for split effect
│
└── <div className="tags-overlay">
    ├── <div className="tag tag-1">
    │   └── <p>{tags[0]}</p>
    │       └── Split into .word elements
    ├── <div className="tag tag-2">
    │   └── <p>{tags[1]}</p>
    │       └── Split into .word elements
    └── <div className="tag tag-3">
        └── <p>{tags[2]}</p>
            └── Split into .word elements


┌─────────────────────────────────────────────────────────────┐
│                    POSITION BREAKDOWN                        │
└─────────────────────────────────────────────────────────────┘

Desktop Layout:
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  TAG-1                                                        │
│  "Architecture"                                               │
│                                                               │
│                                                               │
│                   REVO REALTORS / RR                          │
│                  (centered, animated)                         │
│                                                               │
│                                                               │
│                                                   TAG-3       │
│                                           "Spatial Planning"  │
│  TAG-2                                                        │
│  "Interior Design"                                            │
└─────────────────────────────────────────────────────────────┘

Mobile Layout:
┌──────────────────────────┐
│                          │
│  TAG-1                   │
│  "Architecture"          │
│                          │
│                          │
│    REVO REALTORS / RR    │
│      (scaled down)       │
│                          │
│                          │
│              TAG-3       │
│   "Spatial Planning"     │
│  TAG-2                   │
│  "Interior Design"       │
└──────────────────────────┘


┌─────────────────────────────────────────────────────────────┐
│                    DATA FLOW DIAGRAM                         │
└─────────────────────────────────────────────────────────────┘

page.js
   │
   ├─► useState: showEnhancedPreloader
   │   (controls visibility)
   │
   ├─► useState: loaderAnimating  
   │   (controls scroll lock)
   │
   ├─► useRef: hasEnhancedInit
   │   (prevents double initialization)
   │
   └─► handleEnhancedPreloaderReady(timeline)
       │
       ├─► Receives GSAP timeline from Preloader
       │
       ├─► Continues animation:
       │   ├─ Split screen
       │   ├─ Slide halves apart
       │   └─ Fade in content
       │
       └─► Updates state:
           ├─ setShowEnhancedPreloader(false)
           └─ setLoaderAnimating(false)


Preloader.jsx
   │
   ├─► useRef: hasInitialized
   │   (prevents double animation in strict mode)
   │
   ├─► useEffect (mount)
   │   │
   │   ├─► Register GSAP plugins
   │   │   ├─ CustomEase
   │   │   └─ Create "hop" ease
   │   │
   │   ├─► Split text elements (SplitType)
   │   │   ├─ .intro-title h1
   │   │   ├─ .outro-title h1
   │   │   └─ .tag p
   │   │
   │   ├─► Set initial states (gsap.set)
   │   │
   │   ├─► Create animation timeline
   │   │   ├─ Tags animation
   │   │   ├─ Main title reveal
   │   │   ├─ Logo formation
   │   │   └─ Position adjustments
   │   │
   │   └─► Call onAnimationReady(timeline)
   │       (passes timeline to parent)
   │
   └─► Return JSX
       ├─ .enhanced-preloader
       ├─ .split-overlay
       └─ .tags-overlay


┌─────────────────────────────────────────────────────────────┐
│                   STATE MANAGEMENT FLOW                      │
└─────────────────────────────────────────────────────────────┘

Initial State:
showEnhancedPreloader = true (if isInitialLoad)
loaderAnimating = false
hasEnhancedInit.current = false
   │
   ▼
Component Mounts:
Preloader renders
   │
   ▼
useEffect Fires:
hasInitialized.current → true
Animation timeline created
   │
   ▼
onAnimationReady Called:
hasEnhancedInit.current → true
loaderAnimating → true
lenis.stop() (scroll locked)
   │
   ▼
Timeline Continues:
Split screen animation
Slide apart animation
   │
   ▼
onComplete Callback:
showEnhancedPreloader → false
loaderAnimating → false
lenis.start() (scroll unlocked)
display: none on preloader elements
   │
   ▼
Final State:
Preloader hidden
Page content visible
Scroll enabled


┌─────────────────────────────────────────────────────────────┐
│                 RESPONSIVE BREAKPOINTS                       │
└─────────────────────────────────────────────────────────────┘

Desktop (>1000px):
├─ Font size: 6rem
├─ Logo offset: +10rem
├─ Tag positions: Full spacing
└─ Character margins: 0.75rem

Mobile (≤1000px):
├─ Font size: 2.5rem
├─ Logo offset: +4rem
├─ Tag positions: Reduced spacing
└─ Character margins: 0.5rem


┌─────────────────────────────────────────────────────────────┐
│                    CSS CUSTOM PROPERTIES                     │
└─────────────────────────────────────────────────────────────┘

Used in Preloader:
--base-100: rgb(242, 237, 230)  → Text color (light)
--base-300: rgb(153, 143, 130)  → Tag color (muted)
--base-500: rgb(20, 19, 19)     → Background (dark)


┌─────────────────────────────────────────────────────────────┐
│                    PERFORMANCE NOTES                         │
└─────────────────────────────────────────────────────────────┘

Optimizations:
├─ will-change: transform (on animated elements)
├─ transform-based animations (GPU accelerated)
├─ opacity transitions (composited)
├─ Timeline consolidation (prevents layout thrashing)
└─ useRef guards (prevents duplicate animations)

Metrics:
├─ Total timeline: ~7 seconds
├─ Layers: 3 (preloader, split, tags)
├─ Animated elements: ~30-50 characters + 3 tags
└─ Target FPS: 60fps


┌─────────────────────────────────────────────────────────────┐
│                       FILE DEPENDENCIES                      │
└─────────────────────────────────────────────────────────────┘

Preloader.jsx depends on:
├─ react (useEffect, useRef)
├─ gsap (core)
├─ gsap/CustomEase
├─ split-type (SplitType)
└─ globals.css (styles)

page.js depends on:
├─ Preloader.jsx
├─ gsap (timeline management)
└─ lenis (scroll control)


┌─────────────────────────────────────────────────────────────┐
│                     BROWSER COMPATIBILITY                    │
└─────────────────────────────────────────────────────────────┘

Requires:
├─ CSS clip-path ✓ (all modern browsers)
├─ CSS transforms ✓ (all modern browsers)
├─ ES6+ JavaScript ✓ (transpiled by Next.js)
└─ GSAP 3.x ✓ (included)

Tested on:
├─ Chrome 90+ ✓
├─ Firefox 88+ ✓
├─ Safari 14+ ✓
└─ Edge 90+ ✓

*/
