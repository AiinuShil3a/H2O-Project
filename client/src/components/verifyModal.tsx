import React, { useRef, useEffect } from "react";
import { BsShieldLockFill } from "react-icons/bs";

interface ModalProps {
  showModal: boolean;
}

const VerifyModal: React.FC<ModalProps> = ({ showModal }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current && backdropRef.current) {
      if (showModal) {
        modalRef.current.style.display = "flex";
        backdropRef.current.style.display = "block";
      } else {
        modalRef.current.style.display = "none";
        backdropRef.current.style.display = "none";
      }
    }
  }, [showModal]);

  return (
    <>
      <div
        ref={modalRef}
        className="fixed inset-0 z-50 hidden items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
        style={{ display: "none" }}
      >
        <div className="relative w-auto max-w-3xl mx-auto my-6">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <div className="flex flex-row justify-center items-center">
                <h4 className="text-2xl font-semibold">Please verify...</h4>
                <BsShieldLockFill size={23} />
              </div>
            </div>
            <div className="relative p-6 flex-auto">
              <div
                id="reCAPTCHA"
                className="flex items-center justify-center"
              />
            </div>
            <div className="flex items-center justify-center p-6 border-t border-solid border-gray-300 rounded-b">
              <span className="text-md">Please confirm that you are not a robot.</span>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={backdropRef}
        className="fixed inset-0 z-40 bg-dark bg-opacity-50"
        style={{ display: "none", backdropFilter: "blur(5px)" }}
      ></div>
    </>
  );
};

export default VerifyModal;
