import React, { useContext } from 'react';
import { TransactionContext } from '../../../context/TransactionContext';
import CloseIcon from '../../../assets/images/close.svg?component';
import MetaMaskIcon from '../../../assets/images/MetaMask_Fox.svg?component';
import { Dialog } from '@mui/material';

const WalletSelectModal = ({ isOpen, handleModalClose }) => {
  const { connectWallet, connectedAccount, disconnectWallet } =
    useContext(TransactionContext);
  return (
    <div>
      <Dialog open={isOpen} onClose={() => handleModalClose()}>
        <div className="w-80 h-12 px-6 py-3 bg-[#383056] border-b-2 border-[#383241] flex justify-between items-center">
          <p className="text-white font-bold">지갑 선택</p>
          <div className="cursor-pointer" onClick={handleModalClose}>
            <CloseIcon className="fill-white hover:fill-[#E6E6E6]" />
          </div>
        </div>
        <div className="px-6 py-12 bg-[#27262C] flex justify-center items-center">
          <div
            className="w-32 flex justify-center items-center cursor-pointer"
            onClick={() => {
              handleModalClose();
              connectWallet();
            }}
          >
            <MetaMaskIcon className="w-12" />
            <p className="text-white font-bold">Metamask</p>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
export default WalletSelectModal;