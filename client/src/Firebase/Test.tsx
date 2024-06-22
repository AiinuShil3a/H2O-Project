import React, { useState } from 'react';
import Modal from './test2'; // ตั้งชื่อไฟล์ Modal ตามที่คุณตั้ง

const PageWithModal: React.FC = () => {
  const [showModalRecaptcha, setShowModalRecaptcha] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button
        className="bg-dark text-white px-4 py-2 rounded"
        onClick={openModal}
      >
        Show Modal
      </button>

      <Modal showModal={showModal} onClose={closeModal} />
    </div>
  );
};

export default PageWithModal;
