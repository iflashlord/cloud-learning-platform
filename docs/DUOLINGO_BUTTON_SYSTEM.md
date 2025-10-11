# 🎨 Duolingo-Style Button System

## Overview

This document outlines the comprehensive Duolingo-inspired button system implemented in the AWS Learning Platform. The system provides playful, engaging, and accessible buttons that enhance the learning experience through visual feedback and clear interaction patterns.

## 🎯 Design Principles

### 1. **Playful & Engaging**
- Bold, rounded buttons with strong visual presence
- Vibrant colors that create emotional connections
- Satisfying hover and click animations

### 2. **Clear Visual Hierarchy**
- Distinct button states (normal, hover, active, disabled)
- Semantic color coding for different actions
- Consistent sizing and spacing

### 3. **Accessibility First**
- High contrast ratios for text readability
- Focus indicators for keyboard navigation
- Screen reader friendly labels
- Touch-friendly sizing (minimum 44px touch targets)

### 4. **Performance Optimized**
- CSS-only animations using transforms
- Minimal repaints and reflows
- Efficient shadow rendering

## 🎨 Button Variants

### Primary Actions
```tsx
<Button variant="primary">CHECK ANSWER</Button>
<Button variant="secondary">SKIP LESSON</Button>
```

**Primary Button:**
- Bright green background (`--ds-primary-400`)
- White text with extrabold weight
- 4px bottom shadow for depth
- Hover: Lifts up with enhanced shadow

**Secondary Button:**
- Light green background (`--ds-primary-50`)
- Dark green text (`--ds-primary-700`)
- Subtle border and shadow

### Status & Feedback Buttons
```tsx
<Button variant="success">NEXT</Button>
<Button variant="danger">RETRY</Button>
<Button variant="warning">REVIEW</Button>
<Button variant="info">LEARN MORE</Button>
```

**Success (Correct Answers):**
- Vibrant green (`--ds-success-400`)
- Used for "NEXT", "CORRECT", "WELL DONE" actions

**Danger/Error (Wrong Answers):**
- Bold red (`--ds-error-400`)
- Used for "RETRY", "TRY AGAIN", "INCORRECT" actions

**Warning:**
- Bright yellow/orange (`--ds-warning-400`)
- Used for "REVIEW", "CAREFUL", "HINT" actions

**Info:**
- Clear blue (`--ds-info-400`)
- Used for "LEARN MORE", "CONTINUE", "INFO" actions

### Outline Variants
```tsx
<Button variant="primaryOutline">PRACTICE</Button>
<Button variant="secondaryOutline">SETTINGS</Button>
<Button variant="dangerOutline">DELETE</Button>
```

Outline buttons provide less emphasis while maintaining the Duolingo aesthetic:
- White backgrounds with colored borders
- Bottom shadow for depth
- Colored text matching border

### Special Variants
```tsx
<Button variant="super">UPGRADE</Button>
<Button variant="superOutline">PREMIUM</Button>
<Button variant="ghost">CANCEL</Button>
<Button variant="link">Learn More</Button>
```

**Super Button:**
- Premium gold gradient
- Used for upgrades and special features

**Ghost Button:**
- Transparent background
- Minimal visual weight
- Used for cancel/dismiss actions

**Link Button:**
- Appears as underlined text
- Used for navigation and additional information

## 🎮 Interactive States

### Hover Effects
```css
hover:-translate-y-0.5 hover:shadow-[0_6px_0_color]
```
- Buttons lift up by 2px on hover
- Shadow extends to create floating effect
- Smooth 150ms transition

### Active/Pressed State
```css
active:translate-y-1 active:shadow-none
```
- Button moves down when pressed
- Shadow disappears to simulate depth
- Provides tactile feedback

### Focus State
```css
focus-visible:ring-2 focus-visible:ring-offset-2
```
- 2px colored ring appears around button
- Ring color matches button variant
- Only visible with keyboard navigation

### Disabled State
```css
disabled:opacity-50 disabled:cursor-not-allowed
```
- 50% opacity reduces visual prominence
- Cursor changes to indicate interaction not available
- No hover effects applied

## 📏 Button Sizes

```tsx
<Button size="xs">XS</Button>     // Height: 32px
<Button size="sm">SM</Button>     // Height: 36px  
<Button size="md">MEDIUM</Button> // Height: 44px (default)
<Button size="lg">LARGE</Button>  // Height: 48px
<Button size="xl">EXTRA</Button>  // Height: 56px
```

**Size Guidelines:**
- **xs/sm**: Secondary actions, compact interfaces
- **md**: Primary actions, default choice
- **lg/xl**: Hero buttons, important CTAs

## 🎯 Usage in Learning Context

### Lesson Footer Implementation
```tsx
const Footer = ({ status, onCheck }) => (
  <Button
    variant={
      status === "wrong" ? "danger" :
      status === "correct" ? "success" : 
      status === "completed" ? "info" :
      "primary"
    }
    onClick={onCheck}
  >
    {status === "none" && "CHECK"}
    {status === "correct" && "NEXT"}
    {status === "wrong" && "RETRY"}
    {status === "completed" && "CONTINUE"}
  </Button>
);
```

### Visual Feedback Flow
1. **Initial State**: Primary blue "CHECK" button
2. **Success State**: Green "NEXT" button with success styling
3. **Error State**: Red "RETRY" button with error styling
4. **Completion**: Blue "CONTINUE" button

## 🎨 Color System Integration

The button system uses CSS custom properties for theming:

```css
:root {
  --ds-primary-400: 98 92% 53%;    /* Main green */
  --ds-success-400: 145 68% 53%;   /* Success green */
  --ds-error-400: 0 91% 71%;       /* Error red */
  --ds-warning-400: 48 96% 53%;    /* Warning yellow */
  --ds-info-400: 213 94% 68%;      /* Info blue */
}
```

This allows for easy theme switching and customization without changing component code.

## ♿ Accessibility Features

### Keyboard Navigation
- All buttons focusable via Tab key
- Enter/Space keys activate buttons
- Clear focus indicators

### Screen Readers
- Semantic button elements
- Descriptive text content
- ARIA labels where needed

### Color Contrast
- All text meets WCAG AA standards
- High contrast focus indicators
- Color not the only way to convey information

### Touch Targets
- Minimum 44px height for touch interfaces
- Adequate spacing between buttons
- Large enough for precise interaction

## 🚀 Performance Considerations

### CSS Optimizations
- Transform-based animations (GPU accelerated)
- Minimal shadow blur for performance
- Efficient selector specificity

### Bundle Size
- CSS-only animations (no JavaScript)
- Shared base classes reduce duplication
- Tree-shaken unused variants

## 🎁 Advanced Features

### Loading States
```tsx
<Button loading variant="primary">
  Processing...
</Button>
```
- Spinner animation replaces content
- Button remains same size during loading
- Disabled interaction while loading

### Icon Integration
```tsx
<Button 
  variant="success" 
  rightIcon={<ArrowRight />}
>
  CONTINUE
</Button>
```
- Left and right icon support
- Proper spacing and alignment
- Icons scale with button size

### Full Width Support
```tsx
<Button variant="primary" className="w-full">
  FULL WIDTH BUTTON
</Button>
```

## 🧪 Testing & Quality

### Visual Testing
- Cross-browser compatibility
- Responsive design validation
- Dark mode support (if applicable)

### Interaction Testing
- Hover state verification
- Focus management testing
- Touch interaction validation

### Performance Testing
- Animation smoothness
- Load time impact
- Memory usage monitoring

## 🔄 Migration Guide

### From Old Button System
1. Replace `variant="default"` with `variant="primary"`
2. Update `variant="danger"` usage (now more vibrant)
3. Add size props where needed
4. Test interaction patterns

### Breaking Changes
- Removed `variant="default"`
- Changed shadow and border styling
- Updated color values for better contrast

## 🎯 Best Practices

### Do's
✅ Use semantic variants (success for positive actions)
✅ Maintain consistent button sizes in layouts
✅ Provide clear, action-oriented labels
✅ Use icons to enhance understanding

### Don'ts
❌ Don't use multiple primary buttons in one view
❌ Don't make buttons too small for touch
❌ Don't rely only on color to convey meaning
❌ Don't use vague labels like "OK" or "Submit"

## 🔮 Future Enhancements

### Planned Features
- [ ] Sound effects on interaction
- [ ] Micro-animations for state changes
- [ ] Custom themes for different courses
- [ ] Advanced loading states with progress

### Experimental Features
- [ ] Haptic feedback on mobile
- [ ] Voice interaction support
- [ ] AI-powered button suggestions

---

**Last Updated**: October 2025
**Version**: 2.0.0
**Maintainer**: Design System Team
