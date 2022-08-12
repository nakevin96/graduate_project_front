import React from 'react';
import AddTokenIcon from '../../../assets/images/addTokenToWallet.svg?component';
import {
  CUTokenAddress,
  CUTokenSymbol,
  CUTokenDecimals,
} from '../../../utils/constants';

const { ethereum } = window;

const CustomInput = props => {
  const handleAddTokenClick = async () => {
    try {
      const wasAdded = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: CUTokenAddress,
            symbol: CUTokenSymbol,
            decimals: CUTokenDecimals,
          },
        },
      });
      if (wasAdded) {
        console.log(
          '토큰을 추가해주셔서 감사합니다.(Thank you for your interest!)',
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="mb-1 flex items-center">
        {props.coinIcon}
        <p className="text-white text-start text-base font-bold ml-1">
          {props.coinName}
        </p>
        {props.coinName !== 'ETH' && (
          <div onClick={handleAddTokenClick} className="ml-2 cursor-pointer">
            <AddTokenIcon className="w-7 fill-white" />
          </div>
        )}
      </div>
      <input
        type={props.coinType}
        name={props.coinName}
        id={props.coinId}
        placeholder="0.0"
        value={props.coinValue}
        className="w-full border-0 bg-[#372F47] text-white text-sm text-end py-4 mb-2 rounded-lg focus:ring-blue-500 "
        onChange={props.onChange}
        autoComplete="off"
        readOnly={props.isReadOnly}
      />
    </div>
  );
};

export default CustomInput;