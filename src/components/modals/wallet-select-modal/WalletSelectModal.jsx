import React from 'react';
import CloseIcon from '../../../assets/images/close.svg?component';
import MetaMaskIcon from '../../../assets/images/MetaMask_Fox.svg?component';
import { Dialog } from '@mui/material';
import { useWallet } from '../../../context';

const WalletSelectModal = ({ isOpen, handleModalClose }) => {
  const { connectWallet } = useWallet();
  return (
    <div>
      <Dialog open={isOpen} onClose={() => handleModalClose()}>
        <div className="w-96 h-12 px-6 py-3 bg-[#383056] border-b-2 border-[#383241] flex justify-between items-center">
          <p className="text-white font-bold">지갑 선택</p>
          <div className="cursor-pointer" onClick={handleModalClose}>
            <CloseIcon className="fill-white hover:fill-[#E6E6E6]" />
          </div>
        </div>
        <div className="px-6 py-12 bg-[#27262C] flex justify-center items-center">
          <div
            className="w-80 px-4 py-2 rounded-lg flex justify-between items-center cursor-pointer bg-[#353547] hover:bg-[#49495E]"
            onClick={() => {
              handleModalClose();
              connectWallet();
            }}
          >
            <div className="flex items-center">
              <MetaMaskIcon className="w-8" />
              <p className="pl-2 text-white font-bold">Metamask</p>
            </div>
            <span
              className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs
            font-medium text-gray-500 bg-gray-200 rounded"
            >
              popular
            </span>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
export default WalletSelectModal;