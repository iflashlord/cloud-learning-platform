# 🎨 Centralized Branding System

This platform uses a centralized branding system that allows you to easily change the platform name and branding in one place and have it update throughout the entire application.

## 🚀 Quick Start - Change Platform Name

To rebrand the platform, simply:

1. **Edit the configuration file**: `/lib/config.ts`
2. **Update the `PLATFORM_NAME`** (and other branding values as needed)
3. **Run the sync script**: `npm run sync:branding`
4. **Restart the development server**: `npm run dev`

## 📁 Configuration File Structure

### `/lib/config.ts`

This is the **single source of truth** for all branding configuration:

```typescript
export const BRAND_CONFIG = {
  // 🏷️ Main platform name - change this to rebrand everywhere
  PLATFORM_NAME: "TechLingo",
  
  // 📝 Platform description/tagline
  PLATFORM_DESCRIPTION: "Interactive Technology Learning Platform",
  
  // 🔗 Platform URL slug (used in package.json, URLs, etc.)
  PLATFORM_SLUG: "techlingo-platform",
  
  // 🎯 Course/content theme
  CONTENT_THEME: "Technology",
  
  // 🌐 Primary domain focus (appears in course descriptions, etc.)
  DOMAIN_FOCUS: "cloud computing and modern technology",
  
  // 🏢 Company/Organization name (if different from platform name)
  COMPANY_NAME: "TechLingo",
  
  // 📄 Short description for metadata/SEO
  META_DESCRIPTION: "Learn technology concepts through interactive lessons, quests, and challenges",
  
  // 📦 GitHub/repository related
  REPO_NAME: "techlingo-platform",
  
  // 🖼️ File/asset naming patterns
  ASSET_PREFIX: "techlingo",
}
```

## 🔄 How It Works

### 1. Configuration Import
Components import branding from centralized locations:

```typescript
// Method 1: Direct import from config
import { CONFIG } from "@/lib/config";

// Method 2: Import from constants (recommended for components)
import { PLATFORM_NAME } from "@/constants";
```

### 2. Automatic Updates
When you change the configuration, these files are automatically updated:

- ✅ **All React components** (headers, sidebars, titles)
- ✅ **Page metadata** (titles, descriptions)
- ✅ **Marketing pages** (hero text, descriptions)
- ✅ **package.json** (via sync script)

### 3. Files That Use Centralized Branding

| File | What Updates | Import Method |
|------|-------------|---------------|
| `/components/sidebar.tsx` | Main logo/title | `@/constants` |
| `/components/mobile-sidebar.tsx` | Mobile logo (via Sidebar) | Automatic |
| `/app/layout.tsx` | Page title, meta description | `@/lib/config` |
| `/app/(marketing)/page.tsx` | Hero text | `@/lib/config` |
| `/app/(marketing)/header.tsx` | Header logo/title | `@/constants` |
| `/constants.ts` | Platform constants | `@/lib/config` |
| `/package.json` | Package name | Sync script |

## 🛠️ Tools & Scripts

### Sync Script: `npm run sync:branding`

Automatically updates `package.json` with the current platform slug:

```bash
npm run sync:branding
```

This script:
- ✅ Reads the current `PLATFORM_SLUG` from `/lib/config.ts`
- ✅ Updates the `name` field in `package.json`
- ✅ Shows before/after confirmation
- ✅ Reminds you to run `npm install` if needed

## 📝 Example Rebranding

### Change from "TechLingo" to "CodeMaster":

1. **Edit `/lib/config.ts`**:
```typescript
export const BRAND_CONFIG = {
  PLATFORM_NAME: "CodeMaster",
  PLATFORM_DESCRIPTION: "Master Coding Skills Platform",
  PLATFORM_SLUG: "codemaster-platform",
  CONTENT_THEME: "Programming",
  DOMAIN_FOCUS: "software development and coding",
  // ... other fields
}
```

2. **Run sync script**:
```bash
npm run sync:branding
```

3. **Restart dev server**:
```bash
npm run dev
```

**Result**: The entire platform is now branded as "CodeMaster" everywhere! 🎉

## 🚨 Important Notes

### What Gets Updated Automatically
- ✅ All component titles and headers
- ✅ Page metadata (title tags, descriptions)  
- ✅ Marketing copy and hero text
- ✅ Package.json name (via sync script)
- ✅ Platform constants

### What You May Need to Update Manually
- ⚠️ **Image files** (logos, icons with text)
- ⚠️ **Audio files** (if they mention the platform name)
- ⚠️ **Documentation files** (README sections)
- ⚠️ **Database seed content** (if it references platform name)
- ⚠️ **Environment variables** (deployment-specific configs)

### Best Practices

1. **Always use the centralized config** - Never hardcode platform names
2. **Import from `/constants`** for React components (cleaner imports)
3. **Import from `/lib/config`** for configuration or metadata
4. **Run the sync script** after any branding changes
5. **Test thoroughly** after rebranding to catch any missed references
6. **Update documentation** to reflect the new branding

## 🔍 Finding Hardcoded References

To find any remaining hardcoded platform names, use:

```bash
# Search for the old platform name
grep -r "TechLingo" . --exclude-dir=node_modules --exclude-dir=.git

# Search for specific patterns
grep -r "aws\|AWS" . --exclude-dir=node_modules --exclude-dir=.git
```

## 🎯 Future Enhancements

- **Theme Colors**: Extend config to include color schemes
- **Asset Generation**: Auto-generate logos/icons with new branding
- **Deployment Sync**: Auto-update deployment configs
- **Multi-language**: Support localized platform names

---

**🎉 That's it! You now have a fully centralized branding system that makes rebranding as easy as changing a few values in one file.**