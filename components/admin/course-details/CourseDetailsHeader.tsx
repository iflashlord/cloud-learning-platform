'use client';

import { ArrowLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Course } from "./types";
import Image from "next/image";
import Link from "next/link";

interface CourseDetailsHeaderProps {
  course: Course;
  onBack: () => void;
}

export const CourseDetailsHeader = ({ course, onBack }: CourseDetailsHeaderProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Courses</span>
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6 space-y-4 lg:space-y-0">
          <div className="w-full lg:w-auto flex justify-center lg:justify-start">
            <Image
              src={course.imageSrc}
              alt={course.title}
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
                {course.title}
              </h1>
              <Link href={`/admin/courses/${course.id}/edit`}>
                <Button className="flex items-center space-x-2">
                  <Edit className="w-4 h-4" />
                  <span>Edit Course</span>
                </Button>
              </Link>
            </div>
            
            {course.description && (
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {course.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};