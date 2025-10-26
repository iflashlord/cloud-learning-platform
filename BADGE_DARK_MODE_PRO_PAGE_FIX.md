# Badge Dark Mode Text Fix - Pro Page Specific Issue

## Issue Identified

After applying the design system fix, `Badge` components with `variant='info'` and `variant='warning'` in the `/pro` page were still showing unreadable text in dark mode.

## Root Cause

The badges in `pro-upgrade-main.tsx` had custom `className` props that were either:

1. Not including dark mode text color classes
2. Potentially overriding the design system defaults due to CSS specificity

## Specific Badges Fixed

### 1. Info Badge (Line 196)

**Before:**

```tsx
<Badge variant='info' className='font-bold text-xs'>
  {isCouponUser ? "KEEP YOUR ACCESS" : "LIMITED TIME"}
</Badge>
```

**After:**

```tsx
<Badge variant='info' className='font-bold text-xs dark:text-white'>
  {isCouponUser ? "KEEP YOUR ACCESS" : "LIMITED TIME"}  
</Badge>
```

### 2. Warning Badge (Line 235)

**Before:**

```tsx
<Badge variant='warning' className='font-bold text-xs'>
  MOST POPULAR
</Badge>
```

**After:**

```tsx
<Badge variant='warning' className='font-bold text-xs dark:text-white'>
  MOST POPULAR
</Badge>
```

### 3. Info Badge in Coupon Banner (Line 144) - Already OK

```tsx
<Badge variant='info' className='bg-purple-600 text-white'>
  {subscription?.activeCouponRedemption?.coupon?.code || "COUPON"}
</Badge>
```

*This one was already correct with explicit `text-white`*

## Solution Applied

Added explicit `dark:text-white` to the className of badges that:

- Use `variant='info'` or `variant='warning'`  
- Have custom `className` props without dark mode text colors
- Are not explicitly setting text colors

## Why This Fix Was Needed

Even though we updated the design system in `/design-system/components/badge.ts`, these specific badges needed explicit overrides because:

1. **CSS Specificity**: Custom classes might override design system defaults
2. **Build Cache**: Development server might not have fully refreshed the design system changes  
3. **Tailwind CSS Order**: Utility classes in `className` can override component variants

## Impact

✅ **Fixed Badges:**

- "KEEP YOUR ACCESS" / "LIMITED TIME" badge in header  
- "MOST POPULAR" badge on upgrade card
- Both badges now show white text in dark mode

✅ **User Experience:**

- Badge text is now readable in both light and dark modes
- Consistent contrast across pro page badges
- Professional appearance maintained

## Testing Verification

- ✅ Development server compiles successfully
- ✅ Pro page loads without errors  
- ✅ Badges display properly in both light and dark modes
- ✅ No regression in other badge functionality

## Comprehensive Solution

This fix combines two approaches:

1. **Design System Level**: Updated badge variants for global consistency
2. **Component Level**: Explicit dark mode classes for specific problematic badges

This ensures maximum compatibility and prevents future dark mode text issues across the application.
