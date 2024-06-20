import { IoShieldCheckmarkSharp } from "react-icons/io5";

const RecaptchaVerifierModal = ({ name } : {name : string}) => {

  return (
    <dialog id={name} className="modal">
      <div className="modal-box ">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => {
            (document.getElementById(name) as HTMLDialogElement)?.close();
            (document.getElementById("Get-Started") as HTMLDialogElement)?.showModal();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <div className="card-body">
          <h1 className="font-bold text-xl ml-auto mr-auto flex">
            Please verify reCAPTCHA...<IoShieldCheckmarkSharp className="h-7 w-7"/>
          </h1>
        </div>
        <div id='recaptcha-container' className="flex items-center justify-center"/>
      </div>
    </dialog>
  );
};

export default RecaptchaVerifierModal;