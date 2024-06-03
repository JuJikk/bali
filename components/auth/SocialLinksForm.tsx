import React, { FC, useState, useEffect } from "react";
import Icon from "../ui/Icon";
import TheButton from "../ui/TheButton";
import { socialMediaAccounts } from "@/const/sicalLinks";

type SocialLinksFormProps = {
  handleSaveAndBack: (
    selectedSocialLinks: { socialName: string; username: string }[]
  ) => void;
  currentValue: { socialName: string; username: string }[];
};

const SocialLinksForm: FC<SocialLinksFormProps> = ({
  handleSaveAndBack,
  currentValue,
}) => {
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const initialInputs = currentValue.reduce((acc, link) => {
      acc[link.socialName] = link.username;
      return acc;
    }, {} as { [key: string]: string });
    setInputs(initialInputs);
  }, [currentValue]);

  const handleInputChange = (socialName: string, value: string) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [socialName]: value,
    }));
  };

  const handleSave = () => {
    const updatedLinks = socialMediaAccounts.map((account) => ({
      socialName: account.name,
      username: inputs[account.name] || "",
    }));
    handleSaveAndBack(updatedLinks);
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="heading_h4">Social Media Accounts</h2>
      <ul className="flex flex-col gap-3 w-full">
        {socialMediaAccounts.map((account) => (
          <li key={account.name} className="flex items-center w-full relative">
            <label
              htmlFor={account.name}
              className="border border-grays-50 rounded-[10px] px-[18px] py-[16px] w-full flex gap-2.5"
            >
              <div className="">
                <Icon iconName={account.icon} />
              </div>
              <div className="flex w-full">
                <span>{account.url}</span>
                <input
                  id={account.name}
                  type="text"
                  className="w-full focus:outline-none text-grays-1000 placeholder:text-grays-500"
                  placeholder="@username"
                  value={inputs[account.name] || ""}
                  onChange={(e) =>
                    handleInputChange(account.name, e.target.value)
                  }
                />
              </div>
            </label>
          </li>
        ))}
      </ul>
      <TheButton
        onClick={handleSave}
        type="button"
        className="mt-1 text-grays-0 !body_m"
      >
        Save
      </TheButton>
    </div>
  );
};

export default SocialLinksForm;
