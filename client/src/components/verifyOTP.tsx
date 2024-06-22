import React, { useState, useRef, useEffect } from "react";
import { verifyOTP } from "../Firebase/OTP";


interface ModalProps {
  showModal: boolean;
  onClose: () => void;
}

let currentOTPIndex: number = 0;
const VerifyModal: React.FC<ModalProps> = ({ showModal, onClose , messageOTP }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    const newOTP: string[] = [...otp];
    newOTP[currentOTPIndex] = value.substring(value.length - 1);

    if (!value) setActiveOTPIndex(currentOTPIndex - 1);
    else setActiveOTPIndex(currentOTPIndex + 1);

    setOtp(newOTP);
  };

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOTPIndex = index;
    if (e.key === "Backspace") setActiveOTPIndex(currentOTPIndex - 1);
  };

  const handleModalClose = () => {
    onClose();
  };

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
    inputRef.current?.focus();
    const fullOTP = otp.join('');
  // Verify OTP when full OTP is 6 digits
  const verifyAndProcessOTP = async () => {
    if (fullOTP.length === 6) {
      try {
        // Assuming verifyOTP returns a promise
        await verifyOTP(messageOTP, fullOTP);
        
        // Perform actions after OTP verification if needed
        // Example: Navigate to the next step, close modal, etc.
      } catch (error) {
        console.error('Error verifying OTP:', error);
        // Handle error if necessary
      }
    }
  };

  verifyAndProcessOTP();
  }, [activeOTPIndex, showModal]);

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
              <h4 className="text-2xl font-semibold">Modal OTP</h4>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={handleModalClose}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  &times;
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              <div className={"flex justify-center items-center space-x-2"}>
                {otp.map((_, index) => {
                  return (
                    <React.Fragment key={index}>
                      <input
                        ref={activeOTPIndex === index ? inputRef : null}
                        type="text"
                        className={
                          "w-12 h-12 border-2 rounded bg-white outline-none text-center font-semibold text-xl spin-button-none border-primaryUser focus:border-primaryBusiness focus:text-primaryUser text-dark transition shadow-md shadow-dark"
                        }
                        onChange={handleOnChange}
                        onKeyDown={(e) => handleOnKeyDown(e, index)}
                        value={otp[index]}
                      />
                      {index === otp.length - 1 ? null : (
                        <span className={"w-2 py-0.5 bg-gray-400"} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
              <button
                className="bg-dark text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={handleModalClose}
              >
                Close
              </button>
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
