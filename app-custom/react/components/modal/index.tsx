// import React, { useState, useRef, useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import { useCssHandles } from "vtex.css-handles";

// interface CustomModalProps {
//   children: React.ReactNode[];
// }

// export const HANDLES_VIEWED = [
//   "custom-modal-container",
//   "modal-trigger",
//   "modal-content",
//   "modal-content--wrapper",
//   "modal-content--button"
// ] as const;

// export const CustomModal: React.FC<CustomModalProps> = ({ children }) => {
//   const { handles } = useCssHandles(HANDLES_VIEWED);
//   const triggerRef = useRef<HTMLDivElement>(null);
//   const modalRef = useRef<HTMLDivElement>(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

//   const handleToggleModal = (event: React.MouseEvent<HTMLElement>) => {
//     event.preventDefault(); 
//     event.stopPropagation(); 

//     setIsOpen(prev => !prev);

//     if (!isOpen) {
//       if (triggerRef.current) {
//         const { top, left, height } = triggerRef.current.getBoundingClientRect();
//         setModalPosition({
//           top: top + height + window.scrollY, 
//           left: left + window.scrollX + triggerRef.current.offsetWidth - (modalRef.current?.offsetWidth || 0) 
//         });
//       }
//     }
//   };

//   const handleOutsideClick = (event: MouseEvent) => {
//     if (
//       modalRef.current && 
//       !triggerRef.current?.contains(event.target as Node) && 
//       !modalRef.current.contains(event.target as Node)
//     ) {
//       setIsOpen(false); 
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleOutsideClick);
//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, []);

//   return (
//     <div ref={triggerRef} className={handles['custom-modal-container']}>
//       <div onClick={handleToggleModal} className={handles['modal-trigger']}>
//         {children[0]} 
//       </div>

//       {isOpen && ReactDOM.createPortal(
//         <div
//           ref={modalRef}
//           className={handles['modal-content']}
//           style={{
//             position: 'absolute',
//             top: modalPosition.top,
//             left: modalPosition.left,
//             zIndex: 1000,
//           }}
//           onClick={(e) => e.stopPropagation()} 
//         >
//           <div className={handles['modal-content--wrapper']}>
//             <button onClick={handleToggleModal} className={handles['modal-content--button']}>
//               +
//             </button>
//             {children[1]} 
//           </div>
//         </div>,
//         document.body
//       )}
//     </div>
//   );
// };


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
  "modal-content--button",
  "modal-overlay",
] as const;

export const CustomModal: React.FC<CustomModalProps> = ({ children }) => {
  const { handles } = useCssHandles(HANDLES_VIEWED);
  const triggerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // Mobile width threshold
  };

  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggleModal = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsOpen((prev) => !prev);

    if (!isOpen && !isMobile) {
      // Only calculate modal position for desktop
      if (triggerRef.current) {
        const { top, left, height } = triggerRef.current.getBoundingClientRect();
        setModalPosition({
          top: top + height + window.scrollY,
          left: left + window.scrollX + triggerRef.current.offsetWidth - (modalRef.current?.offsetWidth || 0),
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
      setIsOpen(false);
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
        <>
          {/* Render overlay only on mobile */}
          {isMobile && (
            <div
              className={handles['modal-overlay']}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999,
              }}
              onClick={() => setIsOpen(false)}
            />
          )}
          <div
            ref={modalRef}
            className={handles['modal-content']}
            style={{
              position: isMobile ? 'fixed' : 'absolute',
              top: isMobile ? '50%' : modalPosition.top,
              left: isMobile ? '50%' : modalPosition.left,
              transform: isMobile ? 'translate(-50%, -50%)' : undefined,
              zIndex: 1000,
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={handles['modal-content--wrapper']}>
              <button onClick={handleToggleModal} className={handles['modal-content--button']}>
                +
              </button>
              {children[1]}
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
};
