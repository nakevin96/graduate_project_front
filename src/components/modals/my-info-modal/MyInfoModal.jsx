import React, { useContext } from 'react';
import { TransactionContext } from '../../../context/TransactionContext';
import { Dialog } from '@mui/material';
import CloseIcon from '../../../assets/images/close.svg?component';

const MyInfoModal = ({ isOpen, handleModalClose }) => {
  const { connectedAccount, connectWallet, disconnectWallet } =
    useContext(TransactionContext);
  return (
    <div>
      <Dialog open={isOpen} onClose={() => handleModalClose()}>
        <div className="w-[23rem] h-12 px-6 py-3 bg-[#383056] border-b-2 border-[#383241] flex justify-between items-center">
          <p className="text-white font-bold">내 정보</p>
          <div className="cursor-pointer" onClick={handleModalClose}>
            <CloseIcon className="fill-white hover:fill-[#E6E6E6]" />
          </div>
        </div>
        <div className="p-6 flex flex-col bg-[#27262C]">
          <p className="text-white text-xs">내 지갑 주소</p>
          <div className="w-72 px-2 py-1 bg-[#1E1D20] text-white rounded-lg">
            {connectedAccount}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default MyInfoModal;