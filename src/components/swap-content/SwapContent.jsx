import React, { useState, useContext } from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import RefreshIcon from '../../assets/images/refresh.svg?component';
import ArrowDownIcon from '../../assets/images/arrow_down_icon.svg?component';
import SwitchIcon from '../../assets/images/switch_icon.svg?component';
import CUIcon from '../../assets/images/coin_logo.svg?component';
import EthIcon from '../../assets/images/eth_logo.svg?component';

import { CustomInput } from '../custom-input';
import { THEME_MAIN_COLOR, THEME_MAIN_COLOR_HOVER } from '../../assets/colors';
import { WalletSelectModal } from '../modals/wallet-select-modal';

const SwapContent = () => {
  const { connectedAccount } = useContext(TransactionContext);
  const [isSwapHover, setIsSwapHover] = useState(false);
  const [ethInput, setEthInput] = useState('');
  const [cuInput, setCuInput] = useState('');
  const [swapList, setSwapList] = useState(['ETH', 'CU']);
  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] =
    useState(false);

  const handleConnectWalletButtonClick = () => {
    setIsConnectWalletModalOpen(true);
  };
  const handleConnectWalletModalClose = () => {
    setIsConnectWalletModalOpen(false);
  };

  const Coins = {
    ETH: {
      id: 'eth_amount',
      value: ethInput,
      onChange: e => setEthInput(String(parseFloat(e.target.value))),
      icon: <EthIcon />,
    },
    CU: {
      id: 'cu_amount',
      value: cuInput,
      onChange: e => setCuInput(String(parseFloat(e.target.value))),
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
                  onClick={() => {
                    setEthInput('');
                    setCuInput('');
                  }}
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
              />
            </div>
            <div className="mt-16">
              {connectedAccount ? (
                <button
                  onClick={() => {
                    console.log('CU: ' + cuInput);
                    console.log('ETH: ' + ethInput);
                  }}
                  className={`w-full text-white font-semibold bg-[${THEME_MAIN_COLOR}] py-2 mb-2 rounded-lg
          cursor-pointer hover:bg-[${THEME_MAIN_COLOR_HOVER}]`}
                >
                  ????????????
                </button>
              ) : (
                <div>
                  <button
                    onClick={handleConnectWalletButtonClick}
                    className={`w-full text-white font-semibold bg-[${THEME_MAIN_COLOR}] py-2 mb-2 rounded-lg
          cursor-pointer hover:bg-[${THEME_MAIN_COLOR_HOVER}]`}
                  >
                    ?????? ??????
                  </button>
                  <WalletSelectModal
                    isOpen={isConnectWalletModalOpen}
                    handleModalClose={handleConnectWalletModalClose}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SwapContent;