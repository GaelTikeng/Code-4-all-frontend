import React from "react";

type DropdownModalProps = {
  onClose: () => void;
  children: React.ReactNode;
  };
  
  const DropdownModal: React.FC<DropdownModalProps> = ({ onClose, children }) => {
  return (
    <div className="bg-white w-[150px] min-h-20 shadow justify-start z-20 flex flex-col">
      {children}
    </div>
  );
};

export default DropdownModal;
