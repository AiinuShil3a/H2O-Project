import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "./firebase.config";
import Swal from "sweetalert2";

interface CustomWindow extends Window {
  recaptchaVerifier?: RecaptchaVerifier;
  recaptchaWidgetId?: number;
}

declare let window: CustomWindow;

const sendOTP = async (phone: string, openInputOTP: () => void) => {
  console.log(phone);

  const recaptchaContainer = document.getElementById("reCAPTCHA");

  if (!recaptchaContainer) {
    console.log("ไม่พบ element ที่ระบุสำหรับ reCAPTCHA");
    return;
  }

  let recaptchaVerifier = window.recaptchaVerifier;

  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainer, {
      size: "normal",
      callback: () => {
        openInputOTP();
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
    return confirmationResult;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการส่ง OTP:", error);
  }
};

const verifyOTP = async (
  confirmationResult: any,
  otp: string,
  invalidOTP,
  formatOTP,
  userData,
  onClose,
) => {
  console.log(otp);
  try {
    await confirmationResult.confirm(otp);
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
        onClose();
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
  } catch (error) {
    formatOTP();
    invalidOTP();
  }
};

export { sendOTP, verifyOTP };
