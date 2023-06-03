import { useState } from 'react';
import PopUpModal from './PopUpModal';

const SearchModal = () => {
  const [showModal, setShowModal] = useState(false);
  const openPopUp = () => {
    setShowModal(true);
  };
  const closePopUp = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className='border rounded-md py-4 px-5 shadow-lg shadow-slate-600 active:scale-95 duration-150 ease-in '>
        <button
          className='font-bold text-[28px] tracking-widest'
          onClick={openPopUp}
        >
          FILTER
        </button>
      </div>
      {showModal && <PopUpModal closePopUp={closePopUp} />}
    </>
  );
};

export default SearchModal;
