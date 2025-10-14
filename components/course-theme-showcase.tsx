/**
 * Course Theme Showcase Component
 * 
 * Interactive showcase of AWS service-specific course themes
 * with theme selection, previews, and service demonstrations.
 */

import { CourseThemeShowcase } from '@/components/course-theme';
import type { ThemeShowcaseProps } from '@/components/course-theme';

export const CourseThemeShowcaseComponent: React.FC<ThemeShowcaseProps> = ({ className }) => {
  return <CourseThemeShowcase className={className} />;
};

export default CourseThemeShowcaseComponent;