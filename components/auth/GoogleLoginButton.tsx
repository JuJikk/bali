"use client";
import TheButton from "../ui/TheButton";
import Icon from "../ui/Icon";

const GoogleLoginButton: React.FC = () => {
  const basicUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleLogin = () => {
    window.location.href = `${basicUrl}/auth/google`;
  };

  return (
    <TheButton
      onClick={handleLogin}
      variant="secondary"
      type="button"
      className="!body_s !text-grays-800"
    >
      <Icon iconName="google" fill="none" stroke="none" width="16" />
      <span>Continue with Google</span>
    </TheButton>
  );
};

export default GoogleLoginButton;
