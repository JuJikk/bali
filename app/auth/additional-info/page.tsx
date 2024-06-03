import AdditionalInfo from "@/components/auth/AdditionalInfo";
import { getServerSession } from "next-auth/next";
import { UserData } from "@/models/basic";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

async function getUserData(token: string): Promise<UserData> {
  const response = await fetch("https://api.bali321.com/api/v1/user", {
    method: "GET",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch client details");
  }

  const data = await response.json();
  return data;
}

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/log-in");
    return null;
  }
  let redirectPath: string | null = null;
  try {
    const userData = await getUserData(session.accessToken as string);

    if (userData.image && userData.phone) {
      redirectPath = `/`;
    }

    return (
      <div className="block lg:flex flex-col justify-center items-center w-screen bg-beiges-600">
        <AdditionalInfo userData={userData} />
      </div>
    );
  } catch (error) {
    return (
      <div className="block lg:flex flex-col justify-center items-center w-screen bg-beiges-600">
        <p>
          Error:{" "}
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred"}
        </p>
      </div>
    );
  } finally {
    if (redirectPath) redirect(redirectPath);
  }
}
