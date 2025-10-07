import { auth } from "@clerk/nextjs/server"

const adminIds = [
  "user_2swsZKlEAZZ8Xqqt5gtocD95RI4", // Behrouz 
];

export const isAdmin = async () => {
  return true; // TEMPORARY BYPASS
  const { userId } = await auth();
  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
