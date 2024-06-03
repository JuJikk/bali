"use client";
import { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import TheInput from "../ui/TheInput";
import Icon from "../ui/Icon";
import TheButton from "../ui/TheButton";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "./GoogleLoginButton";
import { toast } from "react-toastify";

const SignUpForm: FC = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      setSubmitting(true);
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
          }),
        });

        if (res.ok) {
          toast.success(`Successfully sign up with email: ${values.email}`);
          localStorage.setItem("signupEmail", values.email);
          router.push("/auth/log-in");
        } else {
          const errorData = await res.json();
          console.error("Sign-up error:", errorData.message);
          if (res.status === 403) {
            setFieldError("email", "User already exists");
          } else {
            setFieldError(
              "email",
              `Sign-up failed: ${res.status} ${errorData.message}`
            );
          }
        }
      } catch (error) {
        console.error("Sign-up error:", error);
        if (error instanceof Error) {
          setFieldError("email", `Sign-up failed: ${error.message}`);
        } else {
          setFieldError("email", "Sign-up failed due to an unknown error");
        }
      }
      setSubmitting(false);
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="sm:max-w-[454px] w-full mx-auto px-6 py-[67px] sm:py-6 bg-grays-0 shadow-md sm:rounded-b-2xl rounded-t-2xl shadow-user-menu flex flex-col justify-center min-h-[calc(100dvh-92px)] sm:min-h-fit">
      <h2 className="heading_h4 mb-2">Sign up</h2>
      <p className="mb-5">
        <span className="body_s text-grays-700">Already have an account? </span>
        <Link
          href="/auth/log-in"
          className="text-grays-1000 underline body_s !leading-[30px]"
        >
          Log in
        </Link>
      </p>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          {/* first name */}
          <div className="flex-1 relative">
            <TheInput
              id="firstName"
              type="text"
              className="w-full !placeholder-grays-500 body_xs"
              placeholder="First Name"
              {...formik.getFieldProps("firstName")}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
                {formik.errors.firstName}
              </div>
            ) : null}
          </div>

          {/* last name */}
          <div className="flex-1">
            <TheInput
              id="lastName"
              type="text"
              className="w-full !placeholder-grays-500 body_xs"
              placeholder="Last Name (optional)"
              {...formik.getFieldProps("lastName")}
            />
          </div>
        </div>

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
            placeholder="Create Password"
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

        {/* repeat password */}
        <div className="relative">
          <div className="absolute top-1/2 -translate-y-1/2 left-[1.125rem]">
            <Icon iconName="lock" fill="none" width="16" />
          </div>
          <TheInput
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            className="w-full !placeholder-grays-500 placeholder:body_xs !px-11"
            placeholder="Repeat Password"
            {...formik.getFieldProps("confirmPassword")}
          />
          <button
            type="button"
            className="absolute top-1/2 -translate-y-1/2 right-[1.125rem]"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? (
              <Icon iconName="eye" fill="none" width="24" />
            ) : (
              <Icon iconName="eye-slash" fill="none" width="24" />
            )}
          </button>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="absolute text-func-red body_xs !text-[10px] -bottom-[14px] !leading-3 left-2">
              {formik.errors.confirmPassword}
            </div>
          ) : null}
        </div>
        <TheButton type="submit" className="mt-1 text-grays-0 body_m">
          Continue
        </TheButton>
        <div className="py-1 text-center whitespace-nowrap flex gap-3 items-center">
          <div className="flex-1 h-[1px] w-full bg-grays-100"></div>
          <span className="body_xs text-grays-100">or</span>
          <div className="flex-1 h-[1px] w-full bg-grays-100"></div>
        </div>

        <GoogleLoginButton />

        <p className="mt-1 body_xs text-grays-500 text-center">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="!text-grays-1000">
            Terms of use
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="!text-grays-1000">
            Privacy Policy
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
