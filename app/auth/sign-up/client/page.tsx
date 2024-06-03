import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import ClientForm from "@/components/auth/ClientForm";
import { UserData } from "@/models/basic";
import { fetchUserData } from "@/utils/api";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

async function getUserData(): Promise<UserData | null> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
      throw new Error("No session found");
    }

    const data = await fetchUserData(session.accessToken, "");
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

const Page: React.FC = async () => {
  const userData = await getUserData();

  if (!userData) {
    redirect("/auth/log-in"); 
  }

  return <ClientForm userData={userData} />;
};

export default Page;
