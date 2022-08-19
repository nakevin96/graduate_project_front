import { useState, useRef, useEffect } from 'react';
import { useApprove, useWallet, useWalletBalance } from '../../../context';
import { WalletSelectModal } from '../../modals/wallet-select-modal';
import { MyInfoModal } from '../../modals/my-info-modal';
import ProfileIcon from '../../../assets/images/profile.svg?component';
import ExitIcon from '../../../assets/images/exit.svg?component';
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

const DropdownMenu = ({
  disconnect,
  setDropdown,
  handleInfoClick,
  getBalance,
  approveToken,
}) => {
  return (
    <div className="absolute top-[4.5rem] z-50 w-40 bg-[#27262C] p-1 border-2 border-[#383241] translate-x-[-50%] rounded-lg overflow-hidden">
      <div className="border-b-2 border-[#383241]">
        <div>
          <button
            onClick={() => {
              setDropdown(false);
              handleInfoClick();
              getBalance();
            }}
            className="h-12 w-full p-2 flex items-center rounded-lg text-white cursor-pointer hover:bg-[#353547]"
          >
            내 정보
          </button>
        </div>
        <div>
          <button
            onClick={approveToken}
            className="h-12 w-full p-2 flex items-center rounded-lg text-white cursor-pointer hover:bg-[#353547]"
          >
            토큰 승인
          </button>
        </div>
      </div>
      <div
        onClick={() => {
          disconnect();
          setDropdown(false);
        }}
        className="h-12 p-2 flex justify-between items-center rounded-lg text-white cursor-pointer hover:bg-[#353547] "
      >
        지갑 해제
        <ExitIcon className="w-6 fill-white" />
      </div>
    </div>
  );
};

const ConnectWalletButton = () => {
  const { connectedAccount, disconnectWallet } = useWallet();
  const { getEthBalance, getCuBalance } = useWalletBalance();
  const { approveToken } = useApprove();

  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] =
    useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);
  const [isMyInfoModalOpen, setIsMyInfoModalOpen] = useState(false);
  const handleConnectWalletButtonClick = () => {
    setIsConnectWalletModalOpen(true);
  };
  const handleConnectWalletModalClose = () => {
    setIsConnectWalletModalOpen(false);
  };
  const handleMyInfoButtonClick = () => {
    setIsMyInfoModalOpen(true);
  };
  const handleMyInfoModalClose = () => {
    setIsMyInfoModalOpen(false);
  };

  useDetectOutsideClick(wrapperRef, setIsProfileDropdownOpen);

  return (
    <span className="ml-auto md:ml-0">
      {connectedAccount ? (
        <div ref={wrapperRef}>
          <div
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="px-6 py-3 cursor-pointer rounded-lg hover:bg-[#353547]"
          >
            <ProfileIcon className="fill-white w-7 " />
          </div>
          {isProfileDropdownOpen && (
            <DropdownMenu
              disconnect={disconnectWallet}
              setDropdown={setIsProfileDropdownOpen}
              handleInfoClick={handleMyInfoButtonClick}
              getBalance={() => {
                getEthBalance();
                getCuBalance();
              }}
              approveToken={approveToken}
            />
          )}
          <MyInfoModal
            isOpen={isMyInfoModalOpen}
            handleModalClose={handleMyInfoModalClose}
          />
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