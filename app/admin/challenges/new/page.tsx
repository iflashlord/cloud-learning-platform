import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { ChallengeForm } from "../components/ChallengeForm";

const AdminChallengeNewPage = async ({
  searchParams
}: {
  searchParams: { lessonId?: string }
}) => {
  if (!await isAdmin()) {
    return redirect("/");
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create New Challenge</h1>
        <p className="text-gray-600 mt-2">Add a new challenge question to the system</p>
      </div>
      
      <ChallengeForm preselectedLessonId={searchParams.lessonId ? parseInt(searchParams.lessonId) : undefined} />
    </div>
  );
};

export default AdminChallengeNewPage;