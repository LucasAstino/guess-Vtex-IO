import React, { useState, ReactNode } from 'react';
import './CustomModal.css'; 
import { useCssHandles } from "vtex.css-handles";

interface CustomModalProps {
  children: ReactNode[]; 
}

export const HANDLES_VIEWED = [
    "custom-modal-container",
    "modal-trigger",
    "modal-content",
    "modal-content--wrapper",
    "modal-content--button"
  ] as const;

export const CustomModal: React.FC<CustomModalProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { handles } = useCssHandles(HANDLES_VIEWED);

  const handleToggleModal = (event: React.MouseEvent<HTMLElement>)  => {
    event.preventDefault(); 
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className={handles['custom-modal-container']}>
      <div onClick={handleToggleModal} className={handles['modal-trigger']}>
        {children[0]} 
      </div>
      {isOpen && (
        <div className={handles['modal-content']}>
          <div className={handles['modal-content--wrapper']}>
            <button onClick={handleToggleModal} className={handles['modal-content--button']}>
              +
            </button>
            {children[1]} 
          </div>
        </div>
      )}
    </div>
  );
};