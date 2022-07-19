import { useState, useContext } from 'react';
import { TransactionContext } from '../../../context/TransactionContext';
import { WalletSelectModal } from './wallet-select-modal';
import {
  THEME_MAIN_COLOR,
  THEME_MAIN_COLOR_HOVER,
} from '../../../assets/colors';

const ConnectWalletButton = () => {
  const { connectWallet, connectedAccount, disconnectWallet } =
    useContext(TransactionContext);
  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] =
    useState(false);
  const handleConnectWalletButtonClick = () => {
    setIsConnectWalletModalOpen(true);
  };
  const handleConnectWalletModalClose = () => {
    setIsConnectWalletModalOpen(false);
  };

  return (
    <span className="ml-auto md:ml-0">
      {connectedAccount ? (
        <button
          onClick={disconnectWallet}
          className={`w-[7.5rem] text-white font-semibold bg-[${THEME_MAIN_COLOR}] py-2 px-7 mx-4 rounded-lg
          cursor-pointer hover:bg-[${THEME_MAIN_COLOR_HOVER}]`}
        >
          프로필
        </button>
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