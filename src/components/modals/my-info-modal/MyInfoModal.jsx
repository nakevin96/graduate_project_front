import React, { useRef, useState } from 'react';
import { Dialog } from '@mui/material';
import CloseIcon from '../../../assets/images/close.svg?component';
import CopyIcon from '../../../assets/images/copy.svg?component';
import { useWallet, useWalletBalance } from '../../../context';

const MyInfoModal = ({ isOpen, handleModalClose }) => {
  const [isCopied, setIsCopied] = useState(false);
  const walletAddressRef = useRef(null);
  const { connectedAccount } = useWallet();
  const { ethBalance, cuBalance } = useWalletBalance();

  const copyToClipboard = () => {
    const copiedWalletAddress = document.getElementById('walletInfoInput');
    copiedWalletAddress.select();
    document.execCommand('copy');
  };

  const handleClickCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1200);
  };

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
          <div className="flex justify-between items-center">
            <p className="py-1 text-white text-xs">내 지갑 주소</p>
            {isCopied && (
              <p className="text-white text-xs border border-white px-2 rounded-lg">
                copied!!
              </p>
            )}
          </div>
          <div className="w-80 px-2 py-3 mt-3 bg-[#1E1D20] rounded-lg flex justify-between items-center">
            <input
              className="ml-2 w-60 text-white text-ellipsis font-bold bg-[#1E1D20] outline-0"
              id="walletInfoInput"
              value={connectedAccount}
              ref={walletAddressRef}
              readOnly
            />
            <CopyIcon
              onClick={() => {
                copyToClipboard();
                handleClickCopy();
              }}
              className="fill-white mr-2 w-4 h-6 cursor-pointer"
            />
          </div>
          <div className="my-4">
            <div className="flex justify-between">
              <p className="text-[#B6ABD0] text-base font-bold">ETH 잔액</p>
              <p className="text-white text-end text-base font-bold">
                {ethBalance}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#B6ABD0] text-base font-bold">CU 잔액</p>
              <p className="text-white text-end text-base font-bold">
                {cuBalance}
              </p>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default MyInfoModal;