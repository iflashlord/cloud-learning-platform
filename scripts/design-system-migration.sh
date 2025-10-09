#!/bin/bash

# 🎨 Design System Migration Script
# This script helps identify and update hardcoded colors to use the design system

echo "🎨 AWS Learning Platform - Design System Migration"
echo "================================================="

# Function to find hardcoded colors
find_hardcoded_colors() {
    echo "📍 Finding hardcoded colors in TSX/TS files..."
    echo ""
    
    # Common hardcoded color patterns
    echo "🔍 Hardcoded Tailwind Colors:"
    grep -r --include="*.tsx" --include="*.ts" -n "bg-\(red\|green\|blue\|yellow\|orange\|pink\|purple\|indigo\)-[0-9]" . | head -20
    echo ""
    
    echo "🔍 Hardcoded Text Colors:"
    grep -r --include="*.tsx" --include="*.ts" -n "text-\(red\|green\|blue\|yellow\|orange\|pink\|purple\|indigo\)-[0-9]" . | head -20
    echo ""
    
    echo "🔍 Hardcoded Border Colors:"
    grep -r --include="*.tsx" --include="*.ts" -n "border-\(red\|green\|blue\|yellow\|orange\|pink\|purple\|indigo\)-[0-9]" . | head -20
    echo ""
}

# Function to suggest replacements
suggest_replacements() {
    echo "💡 Suggested Replacements:"
    echo "========================="
    echo ""
    echo "❌ OLD (Hardcoded)           ✅ NEW (Design System)"
    echo "----------------------------------------------------"
    echo "bg-green-500                 statusStyles.success.button"
    echo "text-green-600               statusStyles.success.text"  
    echo "bg-red-500                   statusStyles.error.button"
    echo "text-red-600                 statusStyles.error.text"
    echo "bg-yellow-500                statusStyles.warning.button" 
    echo "text-yellow-600              statusStyles.warning.text"
    echo "bg-blue-500                  themeClasses.primaryButton"
    echo "text-blue-600                themeClasses.primaryText"
    echo "bg-gray-100                  statusStyles.neutral.bg"
    echo "text-gray-600                statusStyles.neutral.text"
    echo ""
    echo "📚 Import required utilities:"
    echo "import { statusStyles, quickStyles } from '@/lib/style-utils'"
    echo "import { useThemeClasses } from '@/lib/theme-utils'"
    echo ""
}

# Function to check component consistency
check_component_consistency() {
    echo "🔍 Component Consistency Check:"
    echo "==============================="
    echo ""
    
    echo "✅ Updated Components:"
    echo "- Button (/components/ui/button.tsx)"
    echo "- Card (/components/ui/card.tsx)" 
    echo "- Badge (/components/ui/badge.tsx)"
    echo "- Input (/components/ui/input.tsx)"
    echo "- Progress (/components/ui/progress.tsx)"
    echo ""
    
    echo "🔄 Components Needing Updates:"
    
    # Find components with hardcoded colors
    echo "📄 Files with hardcoded colors (sample):"
    find . -name "*.tsx" -not -path "./node_modules/*" -not -path "./.next/*" -exec grep -l "bg-\(red\|green\|blue\|yellow\|orange\|rose\|indigo\|purple\)-[0-9]" {} \; | head -10
    echo ""
}

# Function to validate design system usage
validate_design_system() {
    echo "🧪 Design System Validation:"
    echo "============================"
    echo ""
    
    # Check if design system files exist
    if [ -f "lib/design-system.ts" ]; then
        echo "✅ Design system core file exists"
    else
        echo "❌ Missing lib/design-system.ts"
    fi
    
    if [ -f "lib/style-utils.ts" ]; then
        echo "✅ Style utilities file exists"
    else
        echo "❌ Missing lib/style-utils.ts"
    fi
    
    echo ""
    echo "📊 Usage Statistics:"
    echo "Components using design system: $(grep -r 'from.*design-system' --include="*.tsx" --include="*.ts" . | wc -l)"
    echo "Components using style-utils: $(grep -r 'from.*style-utils' --include="*.tsx" --include="*.ts" . | wc -l)"
    echo ""
}

# Function to show migration priority
show_migration_priority() {
    echo "🎯 Migration Priority:"
    echo "====================="
    echo ""
    echo "🔴 HIGH PRIORITY (User-facing):"
    echo "- app/lesson/ components (learning interface)"
    echo "- app/(main)/learn/ components (main app)"  
    echo "- components/ui/ (shared components)"
    echo ""
    echo "🟡 MEDIUM PRIORITY (Admin/Secondary):"
    echo "- app/admin/ components (admin interface)"
    echo "- app/(main)/quests/ components (quest system)"
    echo "- components/modals/ (modal dialogs)"
    echo ""
    echo "🟢 LOW PRIORITY (Polish):"
    echo "- Legacy variant cleanup"
    echo "- Documentation components"
    echo "- Development utilities"
    echo ""
}

# Run all checks
main() {
    find_hardcoded_colors
    suggest_replacements  
    check_component_consistency
    validate_design_system
    show_migration_priority
    
    echo "🎉 Migration Analysis Complete!"
    echo ""
    echo "📖 Next Steps:"
    echo "1. Review the hardcoded colors found above"
    echo "2. Import design system utilities in components" 
    echo "3. Replace hardcoded colors with design system classes"
    echo "4. Test theme compatibility"
    echo "5. Remove legacy code after migration"
    echo ""
    echo "📚 Documentation: See DESIGN_SYSTEM_IMPLEMENTATION.md"
}

# Execute main function
main