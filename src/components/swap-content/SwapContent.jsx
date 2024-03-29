import { useEffect, useState } from 'react';
import { useSwap, useWallet, useLoading, useApprove } from '../../context';
import RefreshIcon from '../../assets/images/refresh.svg?component';
import ArrowDownIcon from '../../assets/images/arrow_down_icon.svg?component';
import SwitchIcon from '../../assets/images/switch_icon.svg?component';
import CUIcon from '../../assets/images/coin_logo.svg?component';
import EthIcon from '../../assets/images/eth_logo.svg?component';

import { CustomInput } from './custom-input';
import { THEME_MAIN_COLOR, THEME_MAIN_COLOR_HOVER } from '../../assets/colors';
import { WalletSelectModal } from '../modals/wallet-select-modal';
import { TransactionProceedingModal } from '../modals/transaction-proceeding-modal';
import { TokenApproveModal } from '../modals/token-approve-modal';
import { SwapAddress } from '../../utils/constants';

const SwapContent = () => {
  const [isSwapHover, setIsSwapHover] = useState(false);
  const [ethInput, setEthInput] = useState('0.0');
  const [cuInput, setCuInput] = useState('0.0');
  const [swapList, setSwapList] = useState(['ETH', 'CU']);
  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] =
    useState(false);
  const { connectedAccount } = useWallet();
  const { ethToCuSwap, cuToEthSwap } = useSwap();
  const { loadingScreen, setLoadingScreen } = useLoading();
  const { approveModalOpen, setApproveModalOpen } = useApprove();

  const resetInputFiled = () => {
    setEthInput('0.0');
    setCuInput('0.0');
  };
  const handleConnectWalletButtonClick = () => {
    setIsConnectWalletModalOpen(true);
  };
  const handleConnectWalletModalClose = () => {
    setIsConnectWalletModalOpen(false);
  };
  const handleSwapClick = async () => {
    resetInputFiled();
    if (swapList[0] === 'ETH') {
      if (parseFloat(ethInput) < 0.00000001) {
        alert('최소 교환 가능한 이더리움은 0.00000001 eth 입니다.');
        return;
      }
      ethToCuSwap(ethInput);
    } else {
      if (parseFloat(cuInput) < 0.0001) {
        alert('최소 교환 가능한 CU 토큰은 0.0001 CU 입니다.');
        return;
      }
      cuToEthSwap(cuInput);
    }
  };

  useEffect(() => {
    if (swapList[0] === 'ETH') {
      setCuInput(String(parseFloat(ethInput) * 10000));
    } else {
      setEthInput(String(parseFloat(cuInput) / 10000));
    }
  }, [cuInput, ethInput]);

  const Coins = {
    ETH: {
      id: 'eth_amount',
      value: ethInput,
      onChange: e => {
        const tmpValue = String(e.target.value).replace(/[^0-9.]/g, '');
        setEthInput(tmpValue.trim());
      },
      icon: <EthIcon />,
    },
    CU: {
      id: 'cu_amount',
      value: cuInput,
      onChange: e => {
        const tmpValue = String(e.target.value).replace(/[^0-9.]/g, '');
        setCuInput(tmpValue.trim());
      },
      icon: <CUIcon />,
    },
  };
  return (
    <div className="overflow-auto scrollbar-hide flex w-full h-screen justify-center items-start content-center bg-swap">
      <div className="flex p-8">
        <div className="w-80 bg-[#27262C] rounded-[24px] shadow-md">
          <div className="border-b border-b-gray-700">
            <div className="py-8 pt-4 flex flex-col justify-center">
              <div className="pb-1 flex items-center">
                <p className="pr-16 text-white text-right text-xl font-bold basis-4/5">
                  Swap
                </p>
                <div
                  className="basis-1/5 cursor-pointer mt-1.5"
                  onClick={resetInputFiled}
                >
                  <RefreshIcon className="fill-white hover:fill-[#E6E6E6]" />
                </div>
              </div>
              <p className="text-white text-center text-[12px] font-light">
                Trade tokens in an instant
              </p>
            </div>
          </div>
          <div className="flex flex-col p-4">
            <div>
              <CustomInput
                coinType="text"
                coinName={swapList[0]}
                coinId={Coins[swapList[0]].id}
                coinValue={Coins[swapList[0]].value}
                coinIcon={Coins[swapList[0]].icon}
                onChange={Coins[swapList[0]].onChange}
                isReadOnly={false}
              />
              <div
                className="w-8 h-8 my-2 ml-32 cursor-pointer flex justify-center items-center rounded-full bg-[#D8D2E1] hover:bg-[#8C7AA7]"
                onMouseOver={() => setIsSwapHover(true)}
                onMouseOut={() => setIsSwapHover(false)}
              >
                <div
                  onClick={() => {
                    const tmpList = [];
                    tmpList.push(swapList[1]);
                    tmpList.push(swapList[0]);
                    setSwapList(tmpList);
                  }}
                >
                  {isSwapHover ? <SwitchIcon /> : <ArrowDownIcon />}
                </div>
              </div>
              <CustomInput
                coinType="text"
                coinName={swapList[1]}
                coinId={Coins[swapList[1]].id}
                coinValue={Coins[swapList[1]].value}
                coinIcon={Coins[swapList[1]].icon}
                onChange={Coins[swapList[1]].onChange}
                isReadOnly={true}
              />
            </div>
            <div className="mt-12">
              {connectedAccount ? (
                <>
                  <button
                    onClick={handleSwapClick}
                    className={`w-full text-white font-semibold bg-[${THEME_MAIN_COLOR}] py-2 mb-2 rounded-lg
          cursor-pointer hover:bg-[${THEME_MAIN_COLOR_HOVER}]`}
                  >
                    스왑하기
                  </button>
                </>
              ) : (
                <div>
                  <button
                    onClick={handleConnectWalletButtonClick}
                    className={`w-full text-white font-semibold bg-[${THEME_MAIN_COLOR}] py-2 mb-2 rounded-lg
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
            </div>
            <TransactionProceedingModal
              isOpen={loadingScreen}
              handleModalClose={() => setLoadingScreen(false)}
            />
            <TokenApproveModal
              isOpen={approveModalOpen}
              handleModalClose={() => setApproveModalOpen(false)}
              targetMessage={'스왑을 진행하기 위해서는'}
              contractAddress={SwapAddress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default SwapContent;