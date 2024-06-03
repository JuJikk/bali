import { create } from "zustand";

export type AccountType =
  | "agent"
  | "agency"
  | "developer"
  | "propertyOwner"
  | null;

interface AccountTypeState {
  accountType: AccountType;
  setAccountType: (type: AccountType) => void;
}

const useAccountTypeStore = create<AccountTypeState>((set) => ({
  accountType: null,
  setAccountType: (type) => set({ accountType: type }),
}));

export default useAccountTypeStore;
