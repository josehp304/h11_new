# Enhanced Preloader - Quick Start Guide

## 🎬 What You'll See

When a user first visits your site, they'll experience:

1. **Black screen** with floating tags appearing
2. **"REVO REALTORS"** text revealing character by character
3. **First "R"** remains while other letters fade out
4. **"RR"** logo forms from the letters
5. **Screen splits** horizontally into two halves
6. **Halves slide apart** revealing the main page
7. **Hero content fades in** smoothly

---

## 🚀 Quick Start

### 1. Test It Now

Run your development server:
```bash
npm run dev
```

Visit `http://localhost:3000` and you should see the new preloader on first load.

### 2. Refresh to See Again

The preloader only shows on initial page load. To see it again:
- Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Or restart your dev server

---

## 🎨 Customize Text

In `src/app/page.js`, find:

```jsx
<Preloader 
  onAnimationReady={handleEnhancedPreloaderReady}
  mainTitle="Revo Realtors"           // ← Change this
  logoNumber="RR"                      // ← Change this
  tags={[                              // ← Change these
    "Architecture",
    "Interior Design", 
    "Spatial Planning"
  ]}
/>
```

### Examples:

**For a different company:**
```jsx
<Preloader 
  mainTitle="Studio Collective"
  logoNumber="SC"
  tags={["Design", "Build", "Inspire"]}
/>
```

**For personal brand:**
```jsx
<Preloader 
  mainTitle="John Smith"
  logoNumber="JS"
  tags={["Developer", "Designer", "Creator"]}
/>
```

---

## ⏱️ Adjust Speed

### Make it Faster
In `src/components/Preloader/Preloader.jsx`:

```jsx
// Find this:
duration: 0.75,

// Change to:
duration: 0.5,   // Faster
```

### Make it Slower
```jsx
duration: 1.2,   // Slower
```

---

## 🎯 Change Colors

In `src/app/globals.css`, find:

```css
.enhanced-preloader,
.split-overlay {
  background-color: #0d0c0c;  /* ← Dark background */
  color: var(--base-100);     /* ← Light text */
}
```

### Examples:

**White background:**
```css
.enhanced-preloader,
.split-overlay {
  background-color: #ffffff;
  color: #000000;
}
```

**Brand color:**
```css
.enhanced-preloader,
.split-overlay {
  background-color: #1a3a52;  /* Navy blue */
  color: #f5f5f5;             /* Off-white */
}
```

---

## 📱 Mobile Testing

The preloader is responsive! Test on:
- Desktop: Full experience
- Tablet: Adjusted positioning
- Mobile: Smaller text, repositioned elements

Chrome DevTools:
1. Press `F12`
2. Click device toolbar icon
3. Select "iPhone 12 Pro" or similar
4. Refresh page

---

## 🔧 Common Tweaks

### Remove Tags
```jsx
tags={[]}  // Empty array = no tags
```

### Change Tag Positions
In `globals.css`:
```css
.tag-1 {
  top: 20%;      /* Move down */
  left: 10%;     /* Move right */
}
```

### Skip Preloader for Testing
In `page.js`:
```jsx
// Change this:
const [showEnhancedPreloader, setShowEnhancedPreloader] = useState(isInitialLoad);

// To this:
const [showEnhancedPreloader, setShowEnhancedPreloader] = useState(false);
```

---

## 🐛 Quick Fixes

### Preloader Doesn't Show
1. Check browser console for errors (F12)
2. Ensure SplitType is installed: `npm list split-type`
3. Hard refresh the page

### Animation Too Fast/Slow
Adjust timeline delays in `page.js`:
```jsx
delay={showEnhancedPreloader ? 7 : 0.85}
//                              ↑ Increase/decrease this
```

### Text Overlapping
Adjust logo position in `globals.css`:
```css
.outro-title {
  left: calc(50% + 12rem);  /* Increase for more space */
}
```

---

## 📋 File Checklist

Make sure these files exist:
- ✅ `src/components/Preloader/Preloader.jsx`
- ✅ `src/app/globals.css` (with preloader styles)
- ✅ `src/app/page.js` (imports Preloader)

---

## 🎬 Animation Sequence Reference

```
0.5s  │ 🏷️  Tags fade in
0.5s  │ 📝  "REVO REALTORS" reveals
2.0s  │ 💨  Letters exit, leaving "R"
2.5s  │ 🎯  "RR" logo forms
3.5s  │ 🔄  Logo positions
5.5s  │ ✂️   Screen splits
6.0s  │ 🌅  Content appears
7.0s  │ ✅  Complete
```

---

## 💡 Pro Tips

1. **First Impression:** The preloader sets the tone - keep it aligned with your brand
2. **Duration:** 6-7 seconds is optimal (current setting)
3. **Testing:** Always test on mobile devices
4. **Performance:** Keep an eye on Console for warnings
5. **Accessibility:** Consider adding a skip button for repeat visitors

---

## 🎨 Design Tokens Used

```css
Background: #0d0c0c (--base-500)
Text: var(--base-100)
Tags: var(--base-300)
Font: "Manrope" (body)
       "DM Mono" (tags)
```

---

## 📞 Need Help?

1. Check the main README in this folder
2. Review GSAP docs: https://greensock.com/docs/
3. Review SplitType: https://github.com/lukePeavey/SplitType
4. Check browser console for error messages

---

**Happy animating! 🚀**
