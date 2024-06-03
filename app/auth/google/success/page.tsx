"use client";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GoogleCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const completeGoogleLogin = async (code: string) => {
      const res = await signIn("custom-google-log-in", {
        redirect: false,
        code,
      });

      if (res?.error) {
        console.error("Sign-up error:", res.error);
      } else {
        router.push("/");
      }
    };

    const code = searchParams.get("code");

    if (code) {
      completeGoogleLogin(code);
    } else {
      console.error("Authorization code is missing");
    }
  }, [router, searchParams]);

  return (
    <div className="flex justify-center items-center min-h-dvh w-screen bg-beiges-600">
      <div className="flex flex-col items-center -mt-[92px]">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-grays-200 border-t-grays-500 h-12 w-12 mb-4"></div>
        <h2 className="text-center text-grays-700 heading_h4">Log in...</h2>
      </div>
    </div>
  );
};

export default GoogleCallback;
