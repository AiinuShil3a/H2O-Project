import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  UserCredential,
} from "./firebase.config";
import Swal from "sweetalert2";
import { User } from "../AuthContext/auth.provider"

interface CustomWindow extends Window {
  recaptchaVerifier?: RecaptchaVerifier;
  recaptchaWidgetId?: number;
}

interface ConfirmationResult {
  confirm: (verificationCode: string) => Promise<UserCredential>;
}

declare let window: CustomWindow;

const sendOTP = async (phone: string , openInputOTP: () => void , invalidMessageOTP: () => void): Promise<ConfirmationResult | undefined> => {
  const recaptchaContainer = document.getElementById("reCAPTCHA");
  console.log(auth);
  
  if (!recaptchaContainer) {
    console.log("ไม่พบ element ที่ระบุสำหรับ reCAPTCHA");
    return;
  }

  let recaptchaVerifier = window.recaptchaVerifier;

  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainer, {
      size: "normal",
      callback: () => {
        console.log("reCAPTCHA verify");
      },
      "expired-callback": () => {
        console.log("reCAPTCHA expired");
      },
    });

    window.recaptchaVerifier = recaptchaVerifier;

    recaptchaVerifier.render().then((widgetId) => {
      window.recaptchaWidgetId = widgetId;
    });
  } else {
    console.log("reCAPTCHA ถูก render แล้ว");
  }

  try {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phone,
      recaptchaVerifier
    );
    console.log("OTP ส่งเรียบร้อยแล้ว");
    openInputOTP();
    return confirmationResult;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการส่ง OTP:", error);
    console.log(recaptchaVerifier);
    
    invalidMessageOTP();
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to send OTP. Please try again.",
    }).then(() => {
      (document.getElementById("Get-Started") as HTMLDialogElement)?.showModal();
    });
  }
};

const verifyOTP = async (
  confirmationResult: ConfirmationResult,
  otp: string,
  invalidOTP:() => void,
  formatOTP:() => void,
  userData:User|null,
  onClose:() => void,
) => {
  console.log(otp);
  try {
    const connect = await confirmationResult.confirm(otp);
    if (connect) {
      onClose();
      try {
        const response = await fetch("/userData.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        } else if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Sign up successful!",
          });
        }
        const data = await response.json();
        console.log("Registration successful:", data);
      } catch (error) {
        console.error("Error registering user:", error);
      }
    } else {
      return;
    }
  } catch (error) {
    formatOTP();
    invalidOTP();
  }
};

export { sendOTP, verifyOTP };
export type { ConfirmationResult };