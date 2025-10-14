"use client";

import { CourseDetails } from '@/components/admin/course';

/**
 * Course Details Page - Modularized
 * 
 * This page has been refactored from a 362-line monolithic component 
 * into a clean composition using modular components:
 * 
 * - CourseHeader: Course title, image, and action buttons
 * - CourseStats: Statistics cards (units, lessons, challenges, completion)  
 * - CourseThemeSection: Theme configuration panel
 * - UnitsList: List of course units with lessons and challenges
 * - UnitCard: Individual unit with lesson management
 * - LessonSection: Lesson display with challenge list
 * - ChallengeItem: Individual challenge with type indicators
 * 
 * All components are available in /components/admin/course/
 */
export default function CourseViewPage({ params }: { params: { courseId: string } }) {
  return <CourseDetails courseId={params.courseId} />;
}