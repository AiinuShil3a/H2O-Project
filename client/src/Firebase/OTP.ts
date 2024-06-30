import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  UserCredential,
} from "./firebase.config";
import Swal from "sweetalert2";
import axiosPublic from "../hook/axiosPublic";
import { UserRegister , User } from "../AuthContext/auth.provider"

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
  userData:UserRegister|null,
  onClose:() => void,
  changPassword:User | null,
) => {
  try {
    const connect = await confirmationResult.confirm(otp);
    if (connect) {
      onClose();
      if(userData !== null){
        try {
          const response = await axiosPublic.post(`/user/${userData.role}Register` , userData)
  
          if (!response) {
            throw new Error(`Error: can't register`);
          } else if (response) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Sign up successful! Pless cheack verify in Email..",
            });
          }
          const data = await response.data;
          console.log("Registration successful:", data);
        } catch (error) {
          console.error("Error registering user:", error);
        }
      }else if(userData === null && changPassword !== null){
        try {
          const { value: formValues } = await Swal.fire({
            title: 'Enter your new password',
            html:
              '<input id="swal-input1" type="password" class="swal2-input" placeholder="New password">' +
              '<input id="swal-input2" type="password" class="swal2-input" placeholder="Confirm password">',
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
              const newPassword = (document.getElementById('swal-input1') as HTMLInputElement).value;
              const confirmPassword = (document.getElementById('swal-input2') as HTMLInputElement).value;
              if (!newPassword || !confirmPassword) {
                Swal.showValidationMessage('You need to enter both passwords');
              } else if (newPassword.length < 8) {
                Swal.showValidationMessage('Password must be at least 8 characters long');
              } else if (newPassword !== confirmPassword) {
                Swal.showValidationMessage('Passwords do not match');
              }
              return { newPassword };
            },
          });

          if (formValues) {
            const newPassword = formValues.newPassword;
            changPassword.password = newPassword;

            const response = await fetch(`/${changPassword.role}Data.json`, {
              method: "PUT",
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
                text: "Password change successful!",
              });
            }
            const data = await response.json();
            console.log("Password change successful:", data);
          }
        } catch (error) {
          console.error("Error updating password:", error);
        }
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