"use client";
import { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import useHeaderStore from "@/store/headerStore";
import TheInput from "../ui/TheInput";
import Icon from "../ui/Icon";
import TheButton from "../ui/TheButton";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "./GoogleLoginButton";
import { signIn } from "next-auth/react";

const ResetPasswordForm: FC = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const res = await signIn("custom-signup", {
        redirect: false,
        password: values.password,
      });

      if (res?.error) {
        console.error("Sign-up error:", res.error);
      } else {
        router.push("/");
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="sm:max-w-[454px] w-full mx-auto px-6 py-[67px] sm:py-6 bg-grays-0 shadow-md sm:rounded-b-2xl rounded-t-2xl shadow-user-menu flex flex-col justify-center min-h-[calc(100dvh-92px)] sm:min-h-fit">
      <h2 className="heading_h4 mb-2 text-center">Create a New Password</h2>
      <p className="mb-5 text-center body_s text-grays-700">
        Choose a new password for your BaliProfit account.
      </p>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
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
          Update Password
        </TheButton>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
