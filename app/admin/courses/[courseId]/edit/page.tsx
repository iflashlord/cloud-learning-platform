"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CourseForm } from "../../components/course-form";

interface Course {
  id: number;
  title: string;
  imageSrc: string;
}

export default function EditCoursePage({ params }: { params: { courseId: string } }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${params.courseId}`);
        if (response.ok) {
          const data = await response.json();
          setCourse(data);
        } else {
          console.error('Failed to fetch course');
          router.push('/admin/courses');
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        router.push('/admin/courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [params.courseId, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!course) {
    return null; // Will redirect in useEffect
  }

  return (
    <CourseForm 
      mode="edit" 
      courseId={parseInt(params.courseId)}
      initialData={{
        title: course.title,
        imageSrc: course.imageSrc,
      }}
    />
  );
}