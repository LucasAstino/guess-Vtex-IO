import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useCssHandles } from "vtex.css-handles";

interface CustomModalProps {
  children: React.ReactNode[];
}

export const HANDLES_VIEWED = [
  "custom-modal-container",
  "modal-trigger",
  "modal-content",
  "modal-content--wrapper",
  "modal-content--button"
] as const;

export const CustomModal: React.FC<CustomModalProps> = ({ children }) => {
  const { handles } = useCssHandles(HANDLES_VIEWED);
  const triggerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const handleToggleModal = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault(); 
    event.stopPropagation(); // Impede a propagação do clique

    setIsOpen(prev => !prev);

    if (!isOpen) {
      if (triggerRef.current) {
        const { top, left, height } = triggerRef.current.getBoundingClientRect();
        setModalPosition({
          top: top + height + window.scrollY, // Posição abaixo do trigger
          left: left + window.scrollX + triggerRef.current.offsetWidth - (modalRef.current?.offsetWidth || 0) // Alinhamento do lado direito
        });
      }
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      modalRef.current && 
      !triggerRef.current?.contains(event.target as Node) && 
      !modalRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false); // Fecha o modal se clicar fora
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={triggerRef} className={handles['custom-modal-container']}>
      <div onClick={handleToggleModal} className={handles['modal-trigger']}>
        {children[0]} 
      </div>

      {isOpen && ReactDOM.createPortal(
        <div
          ref={modalRef}
          className={handles['modal-content']}
          style={{
            position: 'absolute',
            top: modalPosition.top,
            left: modalPosition.left,
            zIndex: 1000,
          }}
          onClick={(e) => e.stopPropagation()} // Impede o fechamento ao clicar no modal
        >
          <div className={handles['modal-content--wrapper']}>
            <button onClick={handleToggleModal} className={handles['modal-content--button']}>
              +
            </button>
            {children[1]} 
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
