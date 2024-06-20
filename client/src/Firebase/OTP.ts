import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "./firebase.config.js";
import Swal from "sweetalert2";

interface CustomWindow extends Window {
  recaptchaVerifier?: RecaptchaVerifier;
  recaptchaWidgetId?: number;
}

declare let window: CustomWindow;

const sendOTP = async (phone: string) => {
  if (phone.length <= 10 && phone.length >= 9) {
    if (phone.startsWith("0")) {
      phone = "+66" + phone.substr(1);
    } else if (!phone.startsWith("0")) {
      phone = "+66" + phone;
    }
  } else {
    (document.getElementById("Get-Started") as HTMLDialogElement)?.close();
    (document.getElementById("Modal-RecaptchaVerifier") as HTMLDialogElement)?.close();

    Swal.fire({
      icon: "error",
      title: "หมายเลขโทรศัพท์ไม่ถูกต้อง",
      text: "กรุณาตรวจสอบหมายเลขโทรศัพท์อีกครั้ง",
      confirmButtonText: "โอเค",
    }).then((result) => {
      if (result.isConfirmed) {
        (document.getElementById("Get-Started") as HTMLDialogElement)?.showModal();
      }
    });
  }

  const recaptchaContainer = document.getElementById("recaptcha-container")

  if (!recaptchaContainer) {
    console.log("ไม่พบ element ที่ระบุสำหรับ reCAPTCHA");
    return;
  }

  let recaptchaVerifier = window.recaptchaVerifier;

  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainer, {
      size: "normal",
      callback: () => {
        (document.getElementById("Modal-RecaptchaVerifier") as HTMLDialogElement)?.close();
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

export { sendOTP };
