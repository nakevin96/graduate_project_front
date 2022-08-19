import { useState } from 'react';
import { useLoading, cuDeposit } from '../../../context';
import {
  THEME_MAIN_COLOR,
  THEME_MAIN_COLOR_HOVER,
} from '../../../assets/colors';
import { Checkbox, Dialog } from '@mui/material';
import CloseIcon from '../../../assets/images/close.svg?component?';

const CUSubmissionModal = ({ isOpen, handleModalClose, unionAddress }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { isTransactionMined, setLoadingScreen } = useLoading();
  const buttonAbleStyle = `bg-[${THEME_MAIN_COLOR}] py-2 px-12 mx-4 rounded-lg cursor-pointer hover:bg-[${THEME_MAIN_COLOR_HOVER}]`;
  const buttonDisableStyle = `bg-[#d8d8d8] py-2 px-12 mx-4 rounded-lg cursor-not-allowed`;

  const handleSubmissionButtonClick = async () => {
    setIsChecked(false);
    handleModalClose();
    await cuDeposit(unionAddress, setLoadingScreen, isTransactionMined);
  };
  return (
    <div className="overflow-auto scrollbar-hide">
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsChecked(false);
          handleModalClose();
        }}
      >
        <div
          className="h-12 px-6 py-3 bg-[#383056] border-b-2 border-[#383241]
          flex justify-between items-center"
        >
          <p className="text-white font-bold">수동 지급</p>
          <div className="cursor-pointer" onClick={handleModalClose}>
            <CloseIcon className="fill-white hover:fill-[#E6E6E6]" />
          </div>
        </div>
        <div className="px-16 py-2 flex flex-col bg-[#27262C]">
          <div className="my-4 px-8 py-4 bg-[#3c3742] rounded-lg">
            <p className="flex-wrap text-white text-sm">
              이번 입금 기간은 다음과 같습니다.
            </p>
            <p className="flex-wrap text-white text-sm">(기간 입력 공간)</p>
          </div>
          <div className="flex justify-end items-center">
            <p className="text-white text-xs">위 내용을 확인했습니다.</p>
            <Checkbox
              onChange={() => setIsChecked(!isChecked)}
              style={{ color: '#ffffff' }}
            />
          </div>
          <button
            onClick={() => {
              isChecked && handleSubmissionButtonClick();
            }}
            type="button"
            className={`text-white font-semibold mb-4 mt-2 ${
              isChecked ? buttonAbleStyle : buttonDisableStyle
            }`}
          >
            CU 입금하기
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default CUSubmissionModal;