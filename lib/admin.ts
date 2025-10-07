import { auth } from "@clerk/nextjs"

const adminIds = [
  "user_2swsZKlEAZZ8Xqqt5gtocD95RI4", // Behrouz 
];

export const isAdmin = () => {
  return true; // TEMPORARY BYPASS
  const { userId } = auth();
  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
