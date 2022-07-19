import React, { useState, useContext, useRef, useEffect } from 'react';
import { TransactionContext } from '../../../context/TransactionContext';
import { WalletSelectModal } from './wallet-select-modal';
import ProfileIcon from '../../../assets/images/profile.svg?component';
import {
  THEME_MAIN_COLOR,
  THEME_MAIN_COLOR_HOVER,
} from '../../../assets/colors';

const useDetectOutsideClick = (ref, setDropdown) => {
  useEffect(() => {
    const handleClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

const DropdownMenu = ({ account, disconnect, setDropdown }) => {
  return (
    <div className="absolute top-[4.5rem] w-32 bg-[#27262C] p-1 border-2 border-[#383241] translate-x-[-40%] rounded-lg overflow-hidden">
      <div
        onClick={() => {
          console.log(account);
          setDropdown(false);
        }}
        className="h-12 p-2 flex items-center rounded-lg text-white cursor-pointer hover:bg-[#353547]"
      >
        내 정보
      </div>
      <div
        onClick={() => {
          disconnect();
          setDropdown(false);
        }}
        className="h-12 p-2 flex items-center rounded-lg text-white cursor-pointer hover:bg-[#353547]"
      >
        지갑 해제
      </div>
    </div>
  );
};

const ConnectWalletButton = () => {
  const { connectedAccount, disconnectWallet } = useContext(TransactionContext);
  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] =
    useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);
  const handleConnectWalletButtonClick = () => {
    setIsConnectWalletModalOpen(true);
  };
  const handleConnectWalletModalClose = () => {
    setIsConnectWalletModalOpen(false);
  };

  useDetectOutsideClick(wrapperRef, setIsProfileDropdownOpen);

  return (
    <span className="ml-auto md:ml-0">
      {connectedAccount ? (
        <div>
          <div
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="px-6 py-3 cursor-pointer rounded-lg hover:bg-[#353547]"
          >
            <ProfileIcon className="fill-white w-7 " />
          </div>
          {isProfileDropdownOpen && (
            <div ref={wrapperRef}>
              <DropdownMenu
                account={connectedAccount}
                disconnect={disconnectWallet}
                setDropdown={setIsProfileDropdownOpen}
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          <button
            onClick={handleConnectWalletButtonClick}
            className={`text-white font-semibold bg-[${THEME_MAIN_COLOR}] py-2 px-7 mx-4 rounded-lg
          cursor-pointer hover:bg-[${THEME_MAIN_COLOR_HOVER}]`}
          >
            지갑 연결
          </button>
          <WalletSelectModal
            isOpen={isConnectWalletModalOpen}
            handleModalClose={handleConnectWalletModalClose}
          />
        </div>
      )}
    </span>
  );
};
export default ConnectWalletButton;