import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Portal from "../ui/Portal";
import Icon from "../ui/Icon";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ChooseAccountTypeForm from "../auth/ChooseAccountTypeForm";

type UserMenuProps = {
  setIsUserMenuOpen: Dispatch<SetStateAction<boolean>>;
};

const UserMenu: React.FC<UserMenuProps> = ({ setIsUserMenuOpen }) => {
  const { status } = useSession();
  const router = useRouter();
  const [showAccountTypeModal, setShowAccountTypeModal] = useState(false);

  const handleLogout = async () => {
    await signOut();
  };

  const handleShowAccountTypeModal = () => {
    setShowAccountTypeModal(true);
  };

  const handleRedirectToSignUp = () => {
    router.push("/auth/sign-up");
    setIsUserMenuOpen(false);
  };
  const handleRedirectToLogIn = () => {
    router.push("/auth/log-in");
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <Portal>
        <div
          onClick={() => setIsUserMenuOpen(false)}
          className="fixed inset-0 bg-grays-1000 bg-opacity-40 z-[29] flex items-center justify-center"
        >
          {showAccountTypeModal && (
            <ChooseAccountTypeForm
              closeModal={() => setIsUserMenuOpen(false)}
            />
          )}
        </div>
      </Portal>
      {!showAccountTypeModal && (
        <div className="fixed lg:absolute bottom-0 left-0 lg:left-auto lg:bottom-auto lg:top-11 lg:right-0 w-full lg:w-[420px] mt-[14px] p-6 bg-grays-0 z-30 shadow-user-menu rounded-t-2xl lg:rounded-2xl">
          {status === "authenticated" && (
            <ul className="flex flex-col gap-6">
              <li className="flex gap-4 items-center ">
                <Icon iconName="heart" fill="none" stroke="#3C3E3D" />
                <span className="body_m  text-grays-800">Saved Listings</span>
              </li>
              <li className="flex gap-4 items-center ">
                <div className="relative">
                  <Icon iconName="clock" fill="none" stroke="#3C3E3D" />
                  <div className="absolute bg-func-red right-[1px] top-[1.25px] w-[6px] h-[6px] rounded-full border border-grays-0"></div>
                </div>
                <span className="body_m  text-grays-800">Saved searches</span>
                <div className="bg-grays-500 text-grays-0 rounded-full w-6 h-6 flex justify-center items-center body_xs">
                  1
                </div>
              </li>
              <li className="flex gap-4 items-center border-y border-grays-200 py-6">
                <button
                  onClick={handleShowAccountTypeModal}
                  className="body_m text-grays-900"
                >
                  List your property for free
                </button>
                <div className="rotate-[270deg] w-fit h-fit">
                  <Icon
                    iconName="arrow"
                    fill="none"
                    stroke="black"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  />
                </div>
              </li>
              <li className="flex gap-4">
                <span className="body_m  text-grays-800">Settings</span>
              </li>
              <li className="flex gap-4">
                <button
                  onClick={handleLogout}
                  className="body_s text-func-red w-full text-start"
                >
                  Log out
                </button>
              </li>
            </ul>
          )}
          {status === "unauthenticated" && (
            <ul className="flex flex-col gap-6">
              <li className="flex gap-4">
                <button
                  onClick={handleRedirectToSignUp}
                  className="body_m  text-grays-1000 w-full text-start"
                >
                  Sign up
                </button>
              </li>
              <li className="flex gap-4">
                <button
                  onClick={handleRedirectToLogIn}
                  className="body_m text-grays-800 w-full text-start"
                >
                  Log in
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default UserMenu;
