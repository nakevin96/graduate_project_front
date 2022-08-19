import { useState } from 'react';
import { Checkbox, Dialog } from '@mui/material';
import CloseIcon from '../../../assets/images/close.svg?component';
import { useLoading, selfCUReceive } from '../../../context';
import {
  THEME_MAIN_COLOR,
  THEME_MAIN_COLOR_HOVER,
} from '../../../assets/colors';

const SelfPaymentModal = ({ isOpen, handleModalClose, unionAddress }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { isTransactionMined, setLoadingScreen } = useLoading();
  const buttonAbleStyle = `bg-[${THEME_MAIN_COLOR}] py-2 px-12 mx-4 rounded-lg cursor-pointer hover:bg-[${THEME_MAIN_COLOR_HOVER}]`;
  const buttonDisableStyle = `bg-[#d8d8d8] py-2 px-12 mx-4 rounded-lg cursor-not-allowed`;

  const handleConfirmSelfPaymentButtonClick = async () => {
    setIsChecked(false);
    handleModalClose();
    await selfCUReceive(unionAddress, setLoadingScreen, isTransactionMined);
  };
  return (
    <div className="overflow-auto scrollbar-hide">
      <Dialog open={isOpen} onClose={handleModalClose}>
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
              기본적으로 CreditUnion은 모든 사람이 기간 내
            </p>
            <p className="flex-wrap text-white text-sm">
              입금을 할 경우 자동으로 입금절차가 진행됩니다.
            </p>
            <p className="mt-4 flex-wrap text-white text-sm">
              연체한 사람이 있을 경우
            </p>
            <p className="flex-wrap text-white text-sm">
              아래 수동지급 버튼을 통해 이번달의 지급금을 수령하실 수 있습니다
            </p>
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
              isChecked && handleConfirmSelfPaymentButtonClick();
            }}
            type="button"
            className={`text-white font-semibold mb-4 mt-2 ${
              isChecked ? buttonAbleStyle : buttonDisableStyle
            }`}
          >
            수동 지급 받기
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default SelfPaymentModal;