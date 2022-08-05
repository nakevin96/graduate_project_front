import React, { useState } from 'react';
import { Checkbox, Dialog } from '@mui/material';
import { CustomInput } from './custom-input';
import CloseIcon from '../../../assets/images/close.svg?component';
import {
  THEME_MAIN_COLOR,
  THEME_MAIN_COLOR_HOVER,
} from '../../../assets/colors';

const UnionMakeModal = ({ isOpen, handleModalClose }) => {
  const buttonAbleStyle = `bg-[${THEME_MAIN_COLOR}] py-2 px-12 mx-4 rounded-lg cursor-pointer hover:bg-[${THEME_MAIN_COLOR_HOVER}]`;
  const buttonDisableStyle = `bg-[#d8d8d8] py-2 px-12 mx-4 rounded-lg cursor-not-allowed`;
  const [newUnionName, setNewUnionName] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const canMakeUnion = isChecked && newUnionName !== '';
  return (
    <div className="overflow-auto scrollbar-hide">
      <Dialog
        open={isOpen}
        onClose={() => {
          handleModalClose();
          setNewUnionName('');
          setIsChecked(false);
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
              setNewUnionName('');
              setIsChecked(false);
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
            <p className="text-white">{`총 인원 수:`}</p>
            <p className="text-white">{`월별 입금량 (CU):`}</p>
            <p className="text-white">{`보증금 (ETH):`}</p>
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