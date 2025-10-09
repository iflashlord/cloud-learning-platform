#!/bin/bash

# 🎨 Design System Implementation Script
# Applies consistent design system across AWS Learning Platform

echo "🎨 Implementing Design System for AWS Learning Platform"
echo "======================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ️${NC} $1"
}

print_error() {
    echo -e "${RED}❌${NC} $1"
}

# Function to check if files exist
check_design_system_files() {
    print_info "Checking design system files..."
    
    if [ -f "lib/design-system.ts" ]; then
        print_status "Design system core file exists"
    else
        print_error "Missing lib/design-system.ts"
        exit 1
    fi
    
    if [ -f "lib/style-utils.ts" ]; then
        print_status "Style utilities file exists"
    else
        print_error "Missing lib/style-utils.ts"
        exit 1
    fi
    
    if [ -f "lib/design-system.css" ]; then
        print_status "Design system CSS file exists"
    else
        print_error "Missing lib/design-system.css"
        exit 1
    fi
}

# Function to update package.json scripts
update_package_scripts() {
    print_info "Updating package.json scripts..."
    
    # Add design system related scripts
    if ! grep -q "design-system" package.json; then
        print_warning "Adding design system scripts to package.json"
        # Note: This would require jq or manual editing
        # For now, just inform the user
        print_info "Please add these scripts to package.json:"
        echo '  "design:check": "bash scripts/design-system-migration.sh"'
        echo '  "design:lint": "stylelint lib/design-system.css"'
    fi
}

# Function to find and list components needing updates
find_components_to_update() {
    print_info "Finding components that need design system updates..."
    
    echo ""
    echo "📄 Files with hardcoded colors:"
    find . -name "*.tsx" -not -path "./node_modules/*" -not -path "./.next/*" \
        -exec grep -l "bg-\(red\|green\|blue\|yellow\|orange\|rose\|indigo\|purple\)-[0-9]" {} \; | \
        head -10
        
    echo ""
    echo "📄 Files with hardcoded text colors:"
    find . -name "*.tsx" -not -path "./node_modules/*" -not -path "./.next/*" \
        -exec grep -l "text-\(red\|green\|blue\|yellow\|orange\|rose\|indigo\|purple\)-[0-9]" {} \; | \
        head -10
}

# Function to suggest specific updates for common patterns
suggest_updates() {
    print_info "Suggested updates for common patterns..."
    
    echo ""
    echo "🔄 Common Replacements Needed:"
    echo "================================"
    
    echo ""
    echo "1. Success States:"
    echo "   ❌ bg-green-500     ✅ statusStyles.success.button"
    echo "   ❌ text-green-600   ✅ statusStyles.success.text"
    echo "   ❌ border-green-300 ✅ statusStyles.success.border"
    
    echo ""  
    echo "2. Error States:"
    echo "   ❌ bg-red-500       ✅ statusStyles.error.button"
    echo "   ❌ text-red-600     ✅ statusStyles.error.text"
    echo "   ❌ border-red-300   ✅ statusStyles.error.border"
    
    echo ""
    echo "3. Primary Theme:"
    echo "   ❌ bg-orange-400    ✅ themeClasses.primaryButton"
    echo "   ❌ text-orange-600  ✅ themeClasses.primaryText"
    echo "   ❌ border-orange-300 ✅ themeClasses.primaryBorder"
    
    echo ""
    echo "4. Buttons:"
    echo "   ❌ className=\"bg-blue-500 hover:bg-blue-600\""
    echo "   ✅ <Button variant=\"primary\">Action</Button>"
    
    echo ""
    echo "5. Cards:"
    echo "   ❌ className=\"bg-white border rounded-lg p-4\""
    echo "   ✅ <Card variant=\"default\" padding=\"md\">Content</Card>"
}

# Function to create a migration checklist
create_migration_checklist() {
    print_info "Creating migration checklist..."
    
    cat > MIGRATION_CHECKLIST.md << EOF
# 🎨 Design System Migration Checklist

## ✅ Completed
- [x] Design system core files created
- [x] UI components updated (Button, Card, Badge, Input, Progress)
- [x] Style utilities created
- [x] Legacy compatibility maintained
- [x] CSS overrides added for hardcoded colors

## 🔄 In Progress

### High Priority Components
- [ ] \`app/lesson/challenge.tsx\` - Update challenge status colors
- [ ] \`app/lesson/result-card.tsx\` - ✅ COMPLETED 
- [ ] \`app/(main)/learn/lesson-button.tsx\` - Update lesson state colors
- [ ] \`components/user-progress.tsx\` - ✅ COMPLETED
- [ ] \`components/Character.tsx\` - Update character state colors

### Medium Priority Components  
- [ ] \`app/admin/components/admin-dashboard.tsx\` - Admin panel consistency
- [ ] \`app/(main)/quests/page.tsx\` - Quest card styling
- [ ] \`app/(main)/quests/quest-progress-tracker.tsx\` - Progress indicators
- [ ] \`components/modals/\` - Modal styling consistency

### Low Priority Components
- [ ] Legacy button variant cleanup
- [ ] Documentation component updates
- [ ] Theme demo component updates

## 📝 Migration Steps for Each Component

1. **Import Design System Utilities**
   \`\`\`typescript
   import { statusStyles, quickStyles } from '@/lib/style-utils'
   import { useThemeClasses } from '@/lib/theme-utils'  
   import { Badge } from '@/components/ui/badge'
   \`\`\`

2. **Replace Hardcoded Colors**
   \`\`\`typescript
   // Before
   className="bg-green-500 text-white"
   
   // After  
   className={statusStyles.success.button}
   \`\`\`

3. **Use Design System Components**
   \`\`\`typescript
   // Before
   <div className="bg-white border rounded-lg p-4">
   
   // After
   <Card variant="default" padding="md">
   \`\`\`

4. **Test Theme Compatibility**
   - Test with different course themes
   - Verify accessibility (focus states, contrast)
   - Check responsive behavior

## 🎯 Testing Checklist
- [ ] All themes work correctly
- [ ] No broken styling
- [ ] Accessibility maintained
- [ ] Performance not impacted  
- [ ] Legacy functionality preserved

## 📚 Resources
- Design System Documentation: \`DESIGN_SYSTEM_IMPLEMENTATION.md\`
- Migration Script: \`scripts/design-system-migration.sh\`
- Style Reference: \`lib/style-utils.ts\`

EOF

    print_status "Migration checklist created: MIGRATION_CHECKLIST.md"
}

# Function to run basic validation
run_validation() {
    print_info "Running basic validation..."
    
    # Check if TypeScript compiles
    if command -v npm >/dev/null 2>&1; then
        print_info "Checking TypeScript compilation..."
        if npm run build --silent > /dev/null 2>&1; then
            print_status "TypeScript compilation successful"
        else
            print_warning "TypeScript compilation has issues - check types"
        fi
    fi
    
    # Count design system usage
    design_system_imports=$(grep -r 'from.*design-system' --include="*.tsx" --include="*.ts" . 2>/dev/null | wc -l)
    style_utils_imports=$(grep -r 'from.*style-utils' --include="*.tsx" --include="*.ts" . 2>/dev/null | wc -l)
    
    echo ""
    print_info "Design System Usage Statistics:"
    echo "  Components using design-system: $design_system_imports"
    echo "  Components using style-utils: $style_utils_imports"
}

# Main function
main() {
    echo ""
    print_info "Starting design system implementation..."
    echo ""
    
    check_design_system_files
    echo ""
    
    update_package_scripts
    echo ""
    
    find_components_to_update
    echo ""
    
    suggest_updates
    echo ""
    
    create_migration_checklist
    echo ""
    
    run_validation
    echo ""
    
    print_status "Design system implementation setup complete!"
    echo ""
    print_info "Next Steps:"
    echo "1. Review MIGRATION_CHECKLIST.md for component updates"
    echo "2. Run 'npm run dev' to test the application"
    echo "3. Update components following the migration patterns"
    echo "4. Test with different themes to ensure compatibility"
    echo "5. Remove CSS overrides after migration is complete"
    echo ""
    print_info "For detailed guidance, see: DESIGN_SYSTEM_IMPLEMENTATION.md"
}

# Run the main function
main