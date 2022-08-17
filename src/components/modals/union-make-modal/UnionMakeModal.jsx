import React, { useState } from 'react';
import { Checkbox, Dialog } from '@mui/material';
import { CustomInput } from './custom-input';
import CloseIcon from '../../../assets/images/close.svg?component';
import {
  THEME_MAIN_COLOR,
  THEME_MAIN_COLOR_HOVER,
} from '../../../assets/colors';
import { useUnion } from '../../../context';

const UnionMakeModal = ({ isOpen, handleModalClose }) => {
  const buttonAbleStyle = `bg-[${THEME_MAIN_COLOR}] py-2 px-12 mx-4 rounded-lg cursor-pointer hover:bg-[${THEME_MAIN_COLOR_HOVER}]`;
  const buttonDisableStyle = `bg-[#d8d8d8] py-2 px-12 mx-4 rounded-lg cursor-not-allowed`;
  const [newUnionName, setNewUnionName] = useState('');
  const [newUnionPeopleNum, setNewUnionPeopleNum] = useState('5');
  const [newUnionCUAmount, setNewUnionCUAmount] = useState('50');
  const [isChecked, setIsChecked] = useState(false);
  const { makeNewUnion, getUnionAddressByName } = useUnion();

  const ethDeposit = String(parseFloat(newUnionCUAmount) / 10000);
  const cuMonthAmount = String(
    parseFloat(newUnionCUAmount) / parseInt(newUnionPeopleNum),
  );

  const canMakeUnion = isChecked && newUnionName !== '';

  const clearState = () => {
    setNewUnionName('');
    setIsChecked(false);
    setNewUnionPeopleNum('5');
    setNewUnionCUAmount('50');
  };

  const handlePeopleSelect = e => {
    setNewUnionPeopleNum(e.target.value);
  };
  const handleNewUnionCUAmountChange = e => {
    setNewUnionCUAmount(e.target.value);
  };
  const handleMakeUnionButtonClick = async () => {
    await makeNewUnion(newUnionPeopleNum, newUnionCUAmount, newUnionName);
    clearState();
    handleModalClose();
  };

  return (
    <div className="overflow-auto scrollbar-hide">
      <Dialog
        open={isOpen}
        onClose={() => {
          handleModalClose();
          clearState();
        }}
      >
        <div
          className="h-12 px-6 py-3 bg-[#383056] border-b-2 border-[#383241]
          flex justify-between items-center"
        >
          <p className="text-white font-bold">유니온 생성</p>
          <div
            className="cursor-pointer"
            onClick={() => {
              handleModalClose();
              clearState();
            }}
          >
            <CloseIcon className="fill-white hover:fill-[#E6E6E6]" />
          </div>
        </div>
        <div className="px-16 py-2 flex flex-col bg-[#27262C]">
          <div className="my-2 mt-8 flex justify-between items-center">
            <p className="mr-12 text-white">새 유니온 이름:</p>
            <CustomInput
              onChange={e => {
                setNewUnionName(e.target.value);
              }}
              customValue={newUnionName}
            />
          </div>
          <div className="my-4 px-8 py-4 bg-[#3c3742] rounded-lg">
            <div className="flex justify-between items-center">
              <p className="text-white">{`유니온 인원 수:`}</p>

              <select
                onChange={handlePeopleSelect}
                value={newUnionPeopleNum}
                className="h-9 border-0 text-sm rounded-lg "
              >
                <option className="text-sm" value="2">
                  2 명
                </option>
                <option className="text-sm" value="3">
                  3 명
                </option>
                <option className="text-sm" value="4">
                  4 명
                </option>
                <option className="text-sm" value="5">
                  5 명
                </option>
              </select>
            </div>
            <div className="mt-6 mb-2 flex justify-between items-center">
              <p className="text-white">{`총 입금량 (CU):`}</p>
              <input
                className="w-32 h-8 border-0 text-sm text-end py-2 px-4 rounded-lg outline-0"
                type="string"
                value={newUnionCUAmount}
                onChange={handleNewUnionCUAmountChange}
              />
            </div>
            <div>
              <p className="text-[#AD93CB] text-xs text-end mr-3">
                월 입금량: {cuMonthAmount}CU
              </p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-white">{`총 보증금 (ETH):`}</p>
              <input
                className="w-32 h-8 border-0 text-sm text-end py-2 px-4 rounded-lg outline-0"
                value={ethDeposit}
                readOnly
              />
            </div>
          </div>
          <div className="flex justify-end items-center">
            <p className="text-white text-xs">
              위 조건으로 유니온을 생성합니다.
            </p>
            <Checkbox
              onChange={() => setIsChecked(!isChecked)}
              style={{ color: '#ffffff' }}
            />
          </div>
          <button
            onClick={handleMakeUnionButtonClick}
            type="button"
            className={`text-white font-semibold mb-4 mt-2 ${
              canMakeUnion ? buttonAbleStyle : buttonDisableStyle
            }`}
          >
            유니온 생성
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default UnionMakeModal;