'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Plus } from "lucide-react";
import { Course } from "./course-types";

export interface CourseHeaderProps {
  course: Course;
}

export const CourseHeader = ({ course }: CourseHeaderProps) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Link href="/admin/courses">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </Link>
      <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Image
          src={course.imageSrc}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <PageHeader
          title={course.title}
          description={`${course.units.length} units`}
          badge={<Badge variant="primary">Course</Badge>}
          actions={
            <div className="flex gap-2">
              <Link href={`/admin/courses/${course.id}/edit`}>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Course
                </Button>
              </Link>
              <Link href={`/admin/units/new?courseId=${course.id}`}>
                <Button variant="primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Unit
                </Button>
              </Link>
            </div>
          }
        />
      </div>
    </div>
  );
};