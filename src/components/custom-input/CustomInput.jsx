import React from 'react';
import CUIcon from '../../assets/images/coin_logo.svg?component';
import EthIcon from '../../assets/images/eth_logo.svg?component';

const CoinName = ['CU', 'EHT'];

const CustomInput = props => {
  return (
    <div>
      <div className="mb-1 flex items-center">
        {props.coinName == 'CU' ? <CUIcon /> : <EthIcon />}
        <p className="text-white text-start text-base font-bold ml-1">
          {props.coinName}
        </p>
      </div>
      <input
        type={props.coinType}
        name={props.coinName}
        id={props.coinId}
        placeholder="0.0"
        value={props.coinValue}
        className="w-full border-0 bg-[#372F47] text-white text-sm text-end py-4 mb-2 rounded-lg focus:ring-blue-500"
        onChange={props.onChange}
      />
    </div>
  );
};

export default CustomInput;