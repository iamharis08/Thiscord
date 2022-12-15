import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import ServerForm from './ServerForm';
import '../button.css';

function ServerFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='button' onClick={() => setShowModal(true)}>
        <span>
          ooohh wow yup
        </span>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className='signUpLogInTop'>
            hey
          </div>
          <div className='welcome'>
            Welcome to This.cord
          </div>
          <ServerForm />
        </Modal>
      )}
    </>
  );
}

export default ServerFormModal;
