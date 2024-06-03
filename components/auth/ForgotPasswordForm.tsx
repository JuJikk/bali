"use client";
import { FC, useState } from "react";
import { useFormik } from "formik";
import { getCsrfToken, signIn } from "next-auth/react";
import * as Yup from "yup";
import Link from "next/link";
import useHeaderStore from "@/store/headerStore";
import TheInput from "../ui/TheInput";
import Icon from "../ui/Icon";
import TheButton from "../ui/TheButton";
import { useRouter } from "next/navigation";

const ForgotPasswordForm: FC = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        callbackUrl: "/",
      });

      if (res?.error) {
      } else {
        router.push(res?.url || "/");
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const { headerHeight } = useHeaderStore();

  return (
    <div className="sm:max-w-[454px] w-full mx-auto px-6 py-[67px] sm:py-6 bg-grays-0 shadow-md sm:rounded-b-2xl rounded-t-2xl shadow-user-menu flex flex-col justify-center min-h-[calc(100dvh-92px)] sm:min-h-fit">
      <h2 className="heading_h4 mb-2 text-center">Forgot Your Password?</h2>
      <p className="mb-5 text-center body_s text-grays-700">
        No worries, we&apos;ll help you reset it. Just enter your registered
        email address, and we&apos;ll send you a link to create a new password.
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

        <TheButton type="submit" className="mt-1 text-grays-0 body_m">
          Submit{" "}
        </TheButton>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
