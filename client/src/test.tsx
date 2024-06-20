import React from 'react'
import {sendOTP} from "./Firebase/OTP"

const Test = () => {
  return (
    <div>
        <div id='recaptcha-container'></div>
        <button onClick={sendOTP}>Click</button>
    </div>
  )
}

export default Test