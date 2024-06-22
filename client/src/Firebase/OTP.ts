import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "./firebase.config";

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

const verifyOTP = async (confirmationResult: any, otp: string) => {
  try {
    await confirmationResult.confirm(otp);
    console.log("ยืนยัน OTP สำเร็จ");
    // ทำการเชื่อมโยงผู้ใช้หรือทำอย่างอื่นตามที่ต้องการหลังจากยืนยัน OTP สำเร็จ
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการยืนยัน OTP:", error);
    // แสดงข้อความหรือกระบวนการแก้ไขข้อผิดพลาดต่อไป
  }
}


export { sendOTP , verifyOTP };
