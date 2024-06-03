"use client";
import { FC } from "react";
import Link from "next/link";
import TheButton from "../ui/TheButton";

const EmailSentForm: FC = () => {
  return (
    <div className="sm:max-w-[454px] w-full mx-auto px-6 py-[67px] sm:py-6 bg-grays-0 shadow-md sm:rounded-b-2xl rounded-t-2xl shadow-user-menu flex flex-col justify-center min-h-[calc(100dvh-92px)] sm:min-h-fit">
      <h2 className="heading_h4 mb-2 text-center">Check Your Email</h2>
      <p className="mb-5 text-center body_s text-grays-700">
        We&apos;ve sent a password reset link to your email. Open it up to create a
        new password.
      </p>
      <p className="mb-5 text-center body_s text-grays-700">
        The link is only valid for 30 minutes, so be quick!
      </p>
      <Link href="/">
        <TheButton
          type="button"
          className="w-full mt-1 mb-5 text-grays-0 body_m"
        >
          Back to Home
        </TheButton>
      </Link>
      <p className="mt-1 body_xs text-grays-500 text-center">
        Didn&apos;t receive the email? Make sure to check your spam folder or{" "}
        <Link
          href="/auth/forgot-password"
          className="!text-grays-1000 underline"
        >
          resend the link.
        </Link>{" "}
      </p>
    </div>
  );
};

export default EmailSentForm;
