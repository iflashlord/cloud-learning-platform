"use client";

import { useState, useMemo } from "react";
import { BookOpen, Award, Star } from "lucide-react";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { courses, userProgress } from "@/db/schema";
import { upsertUserProgress } from "@/actions/user-progress";
import { CourseFilters } from "@/components/ui/course-filters";
import { CoursesGrid } from "@/components/ui/courses-grid";

type CourseWithProgress = typeof courses.$inferSelect & {
  progress?: {
    percentage: number;
    totalChallenges: number;
    completedChallenges: number;
  } | null;
  isActive?: boolean;
};

type Props = {
  courses: CourseWithProgress[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
  isAuthenticated: boolean;
};

const CATEGORIES = [
  { id: "all", name: "All Courses", icon: BookOpen },
  { id: "AWS", name: "AWS Cloud", icon: Award },
  { id: "Development", name: "Development", icon: Star },
  { id: "Architecture", name: "Architecture", icon: Award },
  { id: "DevOps", name: "DevOps", icon: Star },
  { id: "General", name: "General", icon: BookOpen },
];

const FILTERS = [
  { id: "all", name: "All Levels" },
  { id: "Beginner", name: "Beginner" },
  { id: "Intermediate", name: "Intermediate" },
  { id: "Advanced", name: "Advanced" },
];

export const CoursesCatalog = ({ 
  courses, 
  activeCourseId, 
  isAuthenticated 
}: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter courses based on criteria
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
      const matchesLevel = selectedFilter === "all" || course.level === selectedFilter;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [courses, searchQuery, selectedCategory, selectedFilter]);

  const onClick = (id: number) => {
    if (pending) return;

    if (!isAuthenticated) {
      router.push("/sign-in");
      return;
    }

    if (id === activeCourseId) {
      return router.push("/learn");
    }

    startTransition(() => {
      upsertUserProgress(id)  
        .catch(() => toast.error("Something went wrong."));
    });
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = CATEGORIES.find(cat => cat.id === categoryId);
    if (category) {
      const Icon = category.icon;
      return <Icon className="w-5 h-5" />;
    }
    return <BookOpen className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      {/* Course Filters */}
      <CourseFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        categories={CATEGORIES}
        filters={FILTERS}
      />

      {/* Courses Grid */}
      <CoursesGrid
        courses={filteredCourses}
        viewMode={viewMode}
        onCourseClick={onClick}
        pending={pending}
        activeCourseId={activeCourseId}
        getCategoryIcon={getCategoryIcon}
      />
    </div>
  );
};