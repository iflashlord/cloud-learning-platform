import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { ChallengeOptionForm } from "../components/ChallengeOptionForm";

const AdminChallengeOptionNewPage = async ({
  searchParams
}: {
  searchParams: { challengeId?: string }
}) => {
  if (!await isAdmin()) {
    return redirect("/");
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create New Challenge Option</h1>
        <p className="text-gray-600 mt-2">Add a new answer option to a challenge</p>
      </div>
      
      <ChallengeOptionForm preselectedChallengeId={searchParams.challengeId ? parseInt(searchParams.challengeId) : undefined} />
    </div>
  );
};

export default AdminChallengeOptionNewPage;