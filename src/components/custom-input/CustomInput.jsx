import React from 'react';

const CustomInput = props => {
  return (
    <div>
      <p className="text-white text-start text-base font-bold mb-1 ml-2">
        {props.coinName}
      </p>
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