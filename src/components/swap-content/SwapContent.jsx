import React from 'react';
import RefreshIcon from '../../assets/images/refresh.svg?component';
import { THEME_MAIN_COLOR, THEME_MAIN_COLOR_HOVER } from '../../assets/colors';

const SwapContent = () => {
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
                <RefreshIcon className="fill-white basis-1/5 hover:rotate-180 transition duration-300 cursor-pointer" />
              </div>
              <p className="text-white text-center text-[12px] font-light">
                Trade tokens in an instant
              </p>
            </div>
          </div>
          <div className="p-4">
            <div>
              <input
                type="text"
                name="eth_amount"
                id="eth_amount"
                className="w-full border-0 bg-[#372F47] text-white text-sm text-end py-4 my-1 rounded-lg focus:ring-blue-500"
              />
              <input
                  type="text"
                  name="eth_amount"
                  id="eth_amount"
                  className="w-full border-0 bg-[#372F47] text-white text-sm text-end py-4 my-1 rounded-lg focus:ring-blue-500"
              />
            </div>
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
  );
};

export default SwapContent;