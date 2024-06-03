'use client';

import { FC, useState } from 'react';

const Modal: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <div className="w-[420px] h-[338px] bg-white">Modal</div>;
};

export default Modal;
