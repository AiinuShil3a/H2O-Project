import React, { useState } from 'react';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const Signin = () => {
    // ทำตรวจสอบรหัสผ่านและเรียก API เข้าสู่ระบบ
    console.log(`เข้าสู่ระบบด้วยชื่อผู้ใช้: ${username} และรหัสผ่าน: ${password}`);
  };

  return (
    <div className="Signin-container">
      <h2>เข้าสู่ระบบ</h2>
      <form>
        <label>ชื่อผู้ใช้:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label>รหัสผ่าน:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="button" onClick={Signin}>เข้าสู่ระบบ</button>
      </form>
    </div>
  );
};

export default Signin;
