"use client";
import { FC, useState } from "react";
import TheButton from "../ui/TheButton";
import Icon from "../ui/Icon";
import useAccountTypeStore, { AccountType } from "@/store/accountTypeStore";
import { useRouter } from "next/navigation";

type AccountTypeItem = {
  value: AccountType;
  icon: string;
  text: string;
};

const accountTypes: AccountTypeItem[] = [
  {
    value: "agent",
    icon: "profile",
    text: "I'm an Agent",
  },
  {
    value: "agency",
    icon: "people",
    text: "I'm an Agency",
  },
  {
    value: "developer",
    icon: "buildings",
    text: "I'm a Developer",
  },
  {
    value: "propertyOwner",
    icon: "profile-circle",
    text: "I'm a Property Owner",
  },
];

type ChooseAccountTypeFormProps = { closeModal: () => void };

const ChooseAccountTypeForm: FC<ChooseAccountTypeFormProps> = ({
  closeModal,
}) => {
  const router = useRouter();
  const { setAccountType } = useAccountTypeStore();
  const [selectedAccountType, setSelectedAccountType] =
    useState<AccountType>(null);

  const handleSetAccountType = (
    event: React.MouseEvent<HTMLButtonElement>,
    accountType: AccountType
  ) => {
    event.stopPropagation();
    setSelectedAccountType(accountType);
  };

  const handleSubmitAccountType = () => {
    setAccountType(selectedAccountType);
    closeModal();
    router.push("/auth/sign-up/client");
  };

  return (
    <div
      className="sm:max-w-[454px] w-full mx-auto px-6 py-[67px] sm:py-6 bg-grays-0 shadow-md sm:rounded-b-2xl rounded-t-2xl shadow-user-menu flex flex-col justify-center min-h-[calc(100dvh-92px)] sm:min-h-fit"
      onClick={(event) => event.stopPropagation()}
    >
      <h2 className="heading_h4 mb-2 text-center">Choose your account type</h2>
      <p className="mb-5 text-center body_s text-grays-700">
        To list your property, simply choose account type and let us guide you
        through a quick setup.
      </p>
      <div className="flex flex-col gap-3 mb-6">
        {accountTypes.map((el) => (
          <TheButton
            key={el.value}
            type="button"
            variant="secondary"
            onClick={(event) => handleSetAccountType(event, el.value)}
            className={`!justify-start !heading_h5 ${
              selectedAccountType === el.value
                ? "!border-grays-600"
                : "!border-grays-50"
            }`}
          >
            <Icon iconName={el.icon} width="16" />
            <span>{el.text}</span>
          </TheButton>
        ))}
      </div>

      <TheButton
        type="button"
        onClick={handleSubmitAccountType}
        className="w-full mt-1 mb-5 text-grays-0 body_m"
      >
        Continue
      </TheButton>
    </div>
  );
};

export default ChooseAccountTypeForm;
