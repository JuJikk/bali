"use client";
import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import { getCsrfToken, signIn } from "next-auth/react";
import * as Yup from "yup";
import Link from "next/link";
import useHeaderStore from "@/store/headerStore";
import TheInput from "../ui/TheInput";
import Icon from "../ui/Icon";
import TheButton from "../ui/TheButton";
import { useRouter } from "next/navigation";

const LogInForm: FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const [emailFromSignUp, setEmailFromSignUp] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("signupEmail");
    if (email) {
      setEmailFromSignUp(email);
      localStorage.removeItem("signupEmail");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: emailFromSignUp || "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: "/auth/additional-info",
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push(res?.url || "/auth/additional-info");
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="sm:max-w-[454px] w-full mx-auto px-6 py-[67px] sm:py-6 bg-grays-0 shadow-md sm:rounded-b-2xl rounded-t-2xl shadow-user-menu flex flex-col justify-center min-h-[calc(100dvh-92px)] sm:min-h-fit">
      <h2 className="heading_h4 mb-2">Log in</h2>
      <p className="mb-5">
        <span className="body_s text-grays-700">Don’t have an account? </span>
        <Link
          href="/auth/sign-up"
          className="text-grays-1000 underline body_s !leading-[30px]"
        >
          Sign up
        </Link>
      </p>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        {/* Email */}
        <div className="relative">
          <div className="absolute top-1/2 -translate-y-1/2 left-[1.125rem]">
            <Icon iconName="mail" fill="white" stroke="black" width="16" />
          </div>
          <TheInput
            id="email"
            type="email"
            className="w-full !placeholder-grays-500 placeholder:body_xs pl-11"
            placeholder="Email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
              {formik.errors.email}
            </div>
          ) : null}
        </div>

        {/* Create password */}
        <div className="relative">
          <div className="absolute top-1/2 -translate-y-1/2 left-[1.125rem]">
            <Icon iconName="lock" fill="none" width="16" />
          </div>
          <TheInput
            id="password"
            type={showPassword ? "text" : "password"}
            className="w-full !placeholder-grays-500 placeholder:body_xs !px-11"
            placeholder="Password"
            {...formik.getFieldProps("password")}
          />
          <button
            type="button"
            className="absolute top-1/2 -translate-y-1/2 right-[1.125rem]"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <Icon iconName="eye" fill="none" width="24" />
            ) : (
              <Icon iconName="eye-slash" fill="none" width="24" />
            )}
          </button>
          {formik.touched.password && formik.errors.password ? (
            <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
              {formik.errors.password}
            </div>
          ) : null}
        </div>

        <TheButton type="submit" className="mt-1 text-grays-0 body_m">
          Log in
        </TheButton>
        <Link
          href="/auth/forgot-password"
          className="body_xs text-grays-800 self-center"
        >
          Forgot Password?
        </Link>
      </form>
    </div>
  );
};

export default LogInForm;

export async function getServerSideProps(context: any) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
