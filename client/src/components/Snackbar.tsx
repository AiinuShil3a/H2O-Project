// Snackbar.tsx

import React, { useState, useEffect } from 'react';

type SnackbarProps = {
  message: string;
  show: boolean;
  onClose: () => void;
};
//ใช้ state ในการจัดการ Show and Close
const Snackbar: React.FC<SnackbarProps> = ({ message, show, onClose }) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isVisible) {
      timeout = setTimeout(() => {
        onClose();
        setIsVisible(false);
      }, 10000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isVisible, onClose]);

  return (
    <div
      className={`flex items-center justify-center bg-primaryAdmin text-dark px-4 py-2 rounded-md transition-opacity ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <p>{message}</p>
    </div>
  );
};

export default Snackbar;
