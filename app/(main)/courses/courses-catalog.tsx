"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Grid, List as ListIcon, BookOpen, Award, Star, X, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { courses, userProgress } from "@/db/schema";
import { upsertUserProgress } from "@/actions/user-progress";
import { cn } from "@/lib/utils";

import { Card } from "./card";

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
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Group courses by category
  const coursesByCategory = useMemo(() => {
    const filtered = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
      const matchesLevel = selectedFilter === "all" || course.level === selectedFilter;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });

    if (selectedCategory !== "all") {
      return { [selectedCategory]: filtered };
    }

    return filtered.reduce((acc: Record<string, CourseWithProgress[]>, course) => {
      const category = course.category || "General";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(course);
      return acc;
    }, {});
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
      {/* Search and Filters - Improved */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {/* Search Bar - Much Larger */}
        <div className="p-6 border-b">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search courses by name, description, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setSearchQuery('');
                }
              }}
              className="w-full pl-14 pr-12 py-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder:text-gray-400"
              aria-label="Search courses"
              autoComplete="off"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Filters Section */}
        <div className="p-6">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center justify-between w-full p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              aria-expanded={filtersOpen}
              aria-controls="filters-content"
            >
              <span className="flex items-center gap-2 font-medium">
                <Filter className="w-4 h-4" />
                Filters & View
              </span>
              <ChevronDown className={cn("w-4 h-4 transition-transform", filtersOpen && "rotate-180")} />
            </button>
          </div>

          {/* Filters Content */}
          <div 
            id="filters-content"
            className={cn(
              "space-y-4",
              !filtersOpen && "hidden lg:block"
            )}
          >
            {/* Category Filters - More Accessible */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all",
                        "border-2 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
                        isSelected
                          ? "bg-orange-500 text-white border-orange-500 shadow-md"
                          : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      )}
                      aria-pressed={isSelected}
                      aria-label={`Filter by ${category.name} category`}
                    >
                      <Icon className="w-4 h-4" />
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Level Filter & View Mode */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              {/* Level Filter - More Accessible */}
              <div>
                <label htmlFor="level-filter" className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <div className="relative">
                  <select
                    id="level-filter"
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-medium min-w-[160px]"
                    aria-label="Filter by difficulty level"
                  >
                    {FILTERS.map((filter) => (
                      <option key={filter.id} value={filter.id}>
                        {filter.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              {/* View Mode Toggle - More Accessible */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  View Mode
                </label>
                <div className="flex border-2 border-gray-200 rounded-xl p-1 bg-gray-50">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
                      viewMode === "grid" 
                        ? "bg-orange-500 text-white shadow-sm" 
                        : "text-gray-600 hover:bg-white hover:text-gray-800"
                    )}
                    aria-pressed={viewMode === "grid"}
                    aria-label="Grid view"
                  >
                    <Grid className="w-4 h-4" />
                    <span className="hidden sm:inline">Grid</span>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
                      viewMode === "list" 
                        ? "bg-orange-500 text-white shadow-sm" 
                        : "text-gray-600 hover:bg-white hover:text-gray-800"
                    )}
                    aria-pressed={viewMode === "list"}
                    aria-label="List view"
                  >
                    <ListIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">List</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Summary */}
            {(searchQuery || selectedCategory !== "all" || selectedFilter !== "all") && (
              <div className="flex items-center gap-2 pt-2 border-t">
                <span className="text-sm text-gray-600 font-medium">Active filters:</span>
                <div className="flex flex-wrap gap-1">
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-lg">
                      Search: &ldquo;{searchQuery}&rdquo;
                      <button 
                        onClick={() => setSearchQuery("")}
                        className="hover:text-orange-900"
                        aria-label="Remove search filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedCategory !== "all" && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-lg">
                      {CATEGORIES.find(c => c.id === selectedCategory)?.name}
                      <button 
                        onClick={() => setSelectedCategory("all")}
                        className="hover:text-orange-900"
                        aria-label="Remove category filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedFilter !== "all" && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-lg">
                      {FILTERS.find(f => f.id === selectedFilter)?.name}
                      <button 
                        onClick={() => setSelectedFilter("all")}
                        className="hover:text-orange-900"
                        aria-label="Remove level filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Courses by Category */}
      {Object.keys(coursesByCategory).length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(coursesByCategory).map(([category, categoryCourses]) => (
            <div key={category} className="space-y-4">
              <div className="flex items-center gap-3">
                {getCategoryIcon(category)}
                <h2 className="text-2xl font-bold text-gray-800">{category}</h2>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                  {categoryCourses.length} {categoryCourses.length === 1 ? 'course' : 'courses'}
                </span>
              </div>
              
              <div className={cn(
                viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-3"
              )}>
                {categoryCourses.map((course) => (
                  <Card
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    imageSrc={course.imageSrc}
                    description={course.description || undefined}
                    level={course.level || undefined}
                    duration={course.duration || undefined}
                    progress={course.progress}
                    onClick={onClick}
                    disabled={pending}
                    active={course.id === activeCourseId}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};