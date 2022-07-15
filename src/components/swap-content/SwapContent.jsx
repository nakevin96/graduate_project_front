import React from 'react';
import RefreshIcon from '../../assets/images/refresh.svg?component';
import ArrowDownIcon from '../../assets/images/arrow_down_icon.svg?component';
import SwitchIcon from '../../assets/images/switch_icon.svg?component';
import { useState } from 'react';
import { THEME_MAIN_COLOR, THEME_MAIN_COLOR_HOVER } from '../../assets/colors';

const SwapContent = () => {
  const [isSwapHover, setIsSwapHover] = useState(false);
  return (
    <div className="flex w-full h-screen justify-center items-start content-center bg-swap">
      <div className="flex p-8">
        <div className="w-80 bg-[#27262C] rounded-[24px] shadow-md">
          <div className="border-b border-b-gray-700">
            <div className="py-8 pt-4 flex flex-col justify-center">
              <div className="pb-1 flex items-center">
                <p className="pr-16 text-white text-right text-xl font-bold basis-4/5">
                  Swap
                </p>
                <RefreshIcon className="fill-white basis-1/5 hover:fill-[#E6E6E6] cursor-pointer" />
              </div>
              <p className="text-white text-center text-[12px] font-light">
                Trade tokens in an instant
              </p>
            </div>
          </div>
          <div className="flex flex-col p-4">
            <div>
              <p className="text-white text-start text-base font-bold mb-1 ml-2">
                ETH
              </p>
              <input
                type="text"
                name="cu_amount"
                id="cu_amount"
                placeholder="0.0"
                className="w-full border-0 bg-[#372F47] text-white text-sm text-end py-4 mb-2 rounded-lg focus:ring-blue-500"
              />
              <div
                className="w-8 h-8 my-2 ml-32 cursor-pointer flex justify-center items-center rounded-full bg-[#D8D2E1] hover:bg-[#8C7AA7]"
                onMouseOver={() => setIsSwapHover(true)}
                onMouseOut={() => setIsSwapHover(false)}
              >
                {isSwapHover ? <SwitchIcon /> : <ArrowDownIcon />}
              </div>
              <p className="text-white text-start text-base font-bold mb-1 ml-2 ">
                CU
              </p>
              <input
                type="text"
                name="eth_amount"
                id="eth_amount"
                placeholder="0.0"
                className="w-full border-0 bg-[#372F47] text-white text-sm text-end py-4 mb-2 rounded-lg focus:ring-blue-500"
              />
            </div>
            <div className="mt-16">
              <button
                className={`w-full text-white font-semibold bg-[${THEME_MAIN_COLOR}] py-2 rounded-lg
          cursor-pointer hover:bg-[${THEME_MAIN_COLOR_HOVER}]`}
              >
                지갑 연결
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapContent;