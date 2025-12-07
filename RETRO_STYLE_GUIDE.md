# 🎮 Retro Pixelated Video Game Style

## Color Palette

Your app now features a retro 8-bit/16-bit video game aesthetic!

### Primary Colors

```
Dark Background:    #1a1a2e  (Deep dark blue-black)
Card Background:    #16213e  (Slightly lighter navy)
Input Background:   #1a1a2e  (Same as main bg)

Neon Green:         #00ff41  (Matrix-style bright green)
Cyan Blue:          #00d9ff  (Bright cyan accent)
Yellow Orange:      #ffaa00  (Golden warning color)
Hot Pink:           #ff0040  (Danger/delete color)

Text Primary:       #00ff41  (Neon green)
Text Secondary:     #8b8b8b  (Muted gray)
Text Dark:          #000000  (Black on bright buttons)
White:              #ffffff  (Pure white for borders)
```

## Design Elements

### 🔲 Sharp Edges

- **Zero border radius** on all elements
- Everything is perfectly square/rectangular
- No rounded corners = authentic retro feel

### 🔳 Thick Borders

- **3-4px borders** on all interactive elements
- High contrast borders (bright colors on dark bg)
- Double borders for emphasis (stat boxes)

### 💚 Neon Glow

- **Text shadows** with no blur (pixelated effect)
- Offset shadows: `{ width: 4, height: 4 }`
- Shadow radius: 0 (no blur)
- Creates that classic arcade cabinet look

### 📝 Monospace Font

- Uses system `'monospace'` font family
- Perfect for retro terminal aesthetic
- Fixed-width characters like old computers

### 🎯 High Contrast

- **Bright neon colors** on dark backgrounds
- Maximum readability
- Arcade cabinet inspired

### ✨ Visual Hierarchy

**Primary Actions (Green):**

```typescript
backgroundColor: "#00ff41"; // Bright green
borderColor: "#fff"; // White border
color: "#000"; // Black text
```

**Secondary Actions (Cyan):**

```typescript
backgroundColor: "#16213e"; // Dark navy
borderColor: "#00d9ff"; // Cyan border
color: "#00ff41"; // Green text
```

**Warning/Special (Orange):**

```typescript
backgroundColor: "#16213e"; // Dark navy
borderColor: "#ffaa00"; // Orange border
color: "#ffaa00"; // Orange text
```

**Danger/Delete (Pink):**

```typescript
backgroundColor: "#ff0040"; // Hot pink
borderColor: "#fff"; // White border
color: "#fff"; // White text
```

## Typography

### Font Sizes (Reduced for Retro Feel)

```
Titles:        24px (was 28px)
Headings:      18px (was 22px)
Body:          14px (was 16px)
Small:         12px (was 14px)
Tiny:          11px (was 13px)
```

### Letter Spacing

```
Titles:        2px   (spaced out for impact)
Headings:      1px   (slightly spaced)
Body:          0px   (normal)
```

### Font Weight

```
Bold text:     'bold' (no 600, full bold only)
Normal text:   'normal'
```

## Component Styles

### 🎮 Buttons

```typescript
{
  borderRadius: 0,        // Square corners
  borderWidth: 3,         // Thick borders
  padding: 14-18,         // Chunky padding
  letterSpacing: 1-2,     // Spaced text
}
```

### 📦 Cards

```typescript
{
  borderRadius: 0,        // Square
  borderWidth: 4,         // Very thick border
  padding: 16,
  backgroundColor: '#16213e',
  borderColor: '#00d9ff',  // Bright cyan
}
```

### 📊 Progress Bars

```typescript
{
  height: 16,             // Thicker than modern
  borderRadius: 0,        // Square
  borderWidth: 2,         // Visible border
  backgroundColor: '#1a1a2e',  // Dark
  // Fill color: '#00ff41' (neon green)
}
```

### 📱 Inputs

```typescript
{
  borderRadius: 0,        // Square
  borderWidth: 2,         // Thick border
  fontFamily: 'monospace', // Fixed-width
  color: '#00ff41',       // Neon green text
  backgroundColor: '#1a1a2e',
}
```

### 🎯 Stat Boxes

```typescript
{
  borderWidth: 2,
  borderColor: '#00d9ff',
  backgroundColor: '#1a1a2e',
  padding: 8,
  // Creates a "digital display" look
}
```

## Animations & Effects

### Text Shadow (Pixelated)

```typescript
{
  textShadowColor: '#003d14',    // Dark green
  textShadowOffset: { width: 4, height: 4 },
  textShadowRadius: 0,           // NO BLUR!
}
```

### Completion States

- Incomplete: Cyan border (`#00d9ff`)
- Complete: Green border (`#00ff41`)
- Button: Gray circle → Green filled square

## Retro Gaming References

### Inspired By:

- 🎮 **NES/SNES UI** - Chunky borders, high contrast
- 👾 **Arcade Cabinets** - Neon colors, pixelated fonts
- 💻 **DOS/Terminal** - Monospace fonts, green on black
- 🕹️ **8-bit RPGs** - Stat boxes, quest cards
- 🌐 **Cyberpunk/Matrix** - Neon green primary color

## Color Combinations

### Exercise Cards

```
Background:  #16213e (Navy)
Border:      #00d9ff (Cyan)
Title:       #00ff41 (Green)
Details:     #8b8b8b (Gray)
```

### Quest Completion

```
Background:  #00ff41 (Bright green)
Border:      #ffffff (White)
Text:        #000000 (Black)
```

### Modal Dialogs

```
Background:  #16213e (Navy)
Border:      #00ff41 (Green)
Title:       #00ff41 (Green)
Inputs:      #00d9ff borders
```

## Accessibility

Despite the retro style, the app maintains:

- ✅ **High contrast ratios** for readability
- ✅ **Clear visual hierarchy** with color coding
- ✅ **Large touch targets** (48x48 minimum)
- ✅ **Distinct interaction states** (borders change)

## Future Enhancements

### Could Add:

- 🎵 8-bit sound effects
- ⚡ Pixelated animations
- 🎨 Scanline effect overlay
- 📺 CRT monitor simulation
- 🌈 Color palette swapper (Green/Amber/Blue themes)
- 🎮 Gamepad-style navigation
- 💥 Pixel art icons instead of emojis

## Implementation Notes

### CSS-in-JS (StyleSheet)

All styles use React Native's `StyleSheet.create()` for:

- Performance optimization
- Type checking
- Style reusability

### No Custom Fonts (Yet)

Currently using system monospace font. To add a pixel font:

```bash
expo install expo-font
# Then use fonts like 'Press Start 2P' or 'VT323'
```

### Platform Compatibility

- ✅ iOS - Full support
- ✅ Android - Full support
- ⚠️ Web - Mostly works (some shadow effects differ)

---

## Quick Reference

**Main Background:** `#1a1a2e`  
**Card Background:** `#16213e`  
**Primary (Green):** `#00ff41`  
**Secondary (Cyan):** `#00d9ff`  
**Accent (Orange):** `#ffaa00`  
**Danger (Pink):** `#ff0040`

**Borders:** 2-4px thick, no radius  
**Fonts:** Monospace, bold weights  
**Shadows:** Sharp, no blur

---

**Your app now looks like a classic arcade game! 🎮✨**
