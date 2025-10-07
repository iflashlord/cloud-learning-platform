import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { isAdmin } from "@/lib/admin";
import db from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { ChallengeOptionForm } from "../../components/ChallengeOptionForm";

const AdminChallengeOptionEditPage = async ({
  params
}: {
  params: { optionId: string }
}) => {
  if (!await isAdmin()) {
    return redirect("/");
  }

  const optionId = parseInt(params.optionId);
  
  // Fetch challenge option data directly from database
  const option = await db.query.challengeOptions.findFirst({
    where: eq(challengeOptions.id, optionId),
    with: {
      challenge: {
        columns: {
          id: true,
          question: true,
        },
        with: {
          lesson: {
            columns: {
              id: true,
              title: true,
            },
          },
        },
      },
    },
  });
  
  if (!option) {
    return redirect("/admin/challenge-options");
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Challenge Option</h1>
        <p className="text-gray-600 mt-2">Modify answer option details</p>
      </div>
      
      <ChallengeOptionForm 
        optionId={optionId} 
        initialData={{
          ...option,
          imageSrc: option.imageSrc || undefined,
          audioSrc: option.audioSrc || undefined,
          guide: option.guide || undefined
        }} 
      />
    </div>
  );
};

export default AdminChallengeOptionEditPage;