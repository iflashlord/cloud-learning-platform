"use client";

import { CourseDetails } from "@/components/admin/course-details";

export default function CourseViewPage({ params }: { params: { courseId: string } }) {
  return <CourseDetails courseId={params.courseId} />;
}
