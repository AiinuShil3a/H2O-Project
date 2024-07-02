import React, { useState, useRef, useEffect } from "react";
import { verifyOTP } from "../Firebase/OTP";
import { UserRegister , User } from "../AuthContext/auth.provider"
import { ConfirmationResult } from "../Firebase/OTP";
import { MdSecurity } from "react-icons/md";
import Swal from "sweetalert2";

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  messageOTP: ConfirmationResult | undefined;
  invalidOTP: () => void;
  dataRegister: UserRegister | null;
  setMessageOTPUndify: () => void;
  changPassword: User | null;
}


let currentOTPIndex: number = 0;
const VerifyModal: React.FC<ModalProps> = ({showModal,onClose,messageOTP,invalidOTP,dataRegister,setMessageOTPUndify,changPassword}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);
  const [invalidCounter, setInvalidCounter] = useState(0);
  const [counter, setCounter] = useState(60);

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
    setOtp(new Array(6).fill(""));
    setActiveOTPIndex(0);
    setCounter(60);
    setMessageOTPUndify();
    onClose();
  };

  const formatOTP = () => {
    setOtp(new Array(6).fill(""));
    setActiveOTPIndex(0);
  };

  const invalidCounterUser = () => {
    if(invalidCounter <= 1){
      invalidOTP();
      setInvalidCounter((prevCounter) => prevCounter + 1)
    }else{
      setInvalidCounter(0)
      handleModalClose();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "You entered the wrong OTP and exceeded the limit.",
      }).then(() => {
        (document.getElementById("Get-Started") as HTMLDialogElement)?.showModal();
      });
    }
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
    const fullOTP = otp.join("");
    const verifyAndProcessOTP = async () => {
      if (fullOTP.length === 6 && messageOTP) {
        try {
          await verifyOTP(messageOTP, fullOTP , invalidCounterUser , formatOTP , dataRegister , handleModalClose , changPassword);
        } catch (error) {
          console.error("Error verifying OTP:", error);
        }
      }
    };

    verifyAndProcessOTP();
  }, [activeOTPIndex, showModal , messageOTP , invalidCounter]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (showModal && counter > 0) {
      interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    } else if (counter === 0) {
      handleModalClose();
      Swal.fire({
        icon: 'warning',
        title: 'Time expired for OTP input',
        text: 'Please try again',
        timer: 3000,
        timerProgressBar: true, 
        showConfirmButton: false
      });
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [showModal , counter]);
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
                <h4 className="text-2xl font-semibold">Please verify OTP...</h4>
                <MdSecurity size={23} />
              </div>
              <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={handleModalClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                      clipRule="evenodd"
                    />
                  </svg>
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
                          "w-8 h-8 border-2 rounded bg-white outline-none text-center font-semibold text-xl spin-button-none border-primaryUser focus:border-primaryBusiness focus:text-primaryUser text-dark transition shadow-md shadow-dark"
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
            <div className="flex flex-col items-center justify-center p-6 border-t border-solid border-gray-300 rounded-b">
              <p>ระบบได้ส่ง OTP เรียบร้อยแล้ว</p>
              {counter > 0 ? `โปรดกรอกภายใน ${counter} วิ` : "หมดเวลา"}
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
