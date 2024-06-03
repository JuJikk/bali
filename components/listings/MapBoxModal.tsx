import { FC, ReactNode } from "react";
import Portal from "../ui/Portal";
import Icon from "../ui/Icon";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[99] w-screen h-screen bg-grays-1000 bg-opacity-40 backdrop-blur-sm"
      ></div>

      <div className="fixed z-[100] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-14 -right-40 text-black"
        >
          <Icon iconName="close" stroke="#ffffff" width="32" />
        </button>
        <div className="bg-white rounded-2xl overflow-hidden relative">
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
