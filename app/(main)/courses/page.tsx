import { getCourses, getUserProgress } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";

import { CoursesCatalog } from "./courses-catalog";

const CoursesPage = async () => {
  const { userId } = await auth();
  const coursesData = getCourses();
  const userProgressData = getUserProgress();

  const [
    courses,
    userProgress,
  ] = await Promise.all([
    coursesData,
    userProgressData,
  ]);

  return (
    <div className="h-full max-w-[1200px] px-4 mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-800 mb-2">
          Course Catalog
        </h1>
        <p className="text-neutral-600">
          Choose from our comprehensive collection of technology courses. Track your progress and continue learning at your own pace.
        </p>
      </div>
      
      {/* <div className="mb-4 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <p>Courses found: {courses.length}</p>
        <p>User authenticated: {!!userId ? 'Yes' : 'No'}</p>
        <p>Active course ID: {userProgress?.activeCourseId || 'None'}</p>
      </div>
       */}
      <CoursesCatalog
        courses={courses}
        activeCourseId={userProgress?.activeCourseId}
        isAuthenticated={!!userId}
      />
    </div>
  );
};

export default CoursesPage;
