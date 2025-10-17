import { getCourses, getUserProgress } from "@/db/queries"
import { auth } from "@clerk/nextjs/server"
import { PageHeader } from "@/components/ui/page-header"
import { Badge } from "@/components/ui/badge"

import { CoursesCatalog } from "./courses-catalog"

const CoursesPage = async () => {
  const { userId } = await auth()
  const coursesData = getCourses()
  const userProgressData = getUserProgress()

  const [courses, userProgress] = await Promise.all([coursesData, userProgressData])

  return (
    <div className='w-full min-h-screen'>
      <div className='w-full max-w-[1200px] mx-auto px-4 py-6'>
        <PageHeader
          title='Course Catalog'
          description='Choose from our comprehensive collection of technology courses. Track your progress and continue learning at your own pace.'
          badge={<Badge variant='primary'>{courses.length} Courses</Badge>}
          size='lg'
          className='mb-8'
        />

        <CoursesCatalog
          courses={courses}
          activeCourseId={userProgress?.activeCourseId}
          isAuthenticated={!!userId}
        />
      </div>
    </div>
  )
}

export default CoursesPage
