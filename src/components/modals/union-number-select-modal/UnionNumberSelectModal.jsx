import { useState } from 'react';
import { useUnion } from '../../../context';
import { Checkbox, Dialog } from '@mui/material';
import CloseIcon from '../../../assets/images/close.svg?component';
import {
  THEME_MAIN_COLOR,
  THEME_MAIN_COLOR_HOVER,
} from '../../../assets/colors';

const UnionNumberSelectModal = ({
  isOpen,
  handleModalClose,
  unionNumber,
  unionAddress,
  unionInfo,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const { participateToUnion } = useUnion();
  const buttonAbleStyle = `bg-[${THEME_MAIN_COLOR}] py-2 px-12 mx-4 rounded-lg cursor-pointer hover:bg-[${THEME_MAIN_COLOR_HOVER}]`;
  const buttonDisableStyle = `bg-[#d8d8d8] py-2 px-12 mx-4 rounded-lg cursor-not-allowed`;

  const handleConfirmTransactionButtonClick = async () => {
    setIsChecked(false);
    handleModalClose();
    await participateToUnion(
      unionAddress,
      parseInt(unionNumber),
      unionInfo.totalAmount,
    );
  };
  return (
    <div className="overflow-auto scrollbar-hide">
      <Dialog open={isOpen} onClose={handleModalClose}>
        <div
          className="h-12 px-6 py-3 bg-[#383056] border-b-2 border-[#383241]
          flex justify-between items-center"
        >
          <p className="text-white font-bold">유니온에 참가할 번호 선택</p>
          <div className="cursor-pointer" onClick={handleModalClose}>
            <CloseIcon className="fill-white hover:fill-[#E6E6E6]" />
          </div>
        </div>
        <div className="px-16 py-2 flex flex-col bg-[#27262C]">
          <p className="pt-4 text-white text-xl font-bold">{`${unionNumber} 순번으로 유니온을 시작합니다.`}</p>
          <div className="my-4 px-8 py-4 bg-[#3c3742] rounded-lg">
            <div className="flex justify-between">
              <p className="text-white">{`총 입금량:`}</p>
              <p className="text-white">{`${unionInfo.totalAmount} CU`}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-white">{`월 입금량:`}</p>
              <p className="text-white">{`${unionInfo.periodAmount} CU`}</p>
            </div>
          </div>
          <div className="flex justify-end items-center">
            <p className="text-white text-xs">위 내용을 확인했습니다.</p>
            <Checkbox
              onChange={() => setIsChecked(!isChecked)}
              style={{ color: '#ffffff' }}
            />
          </div>
          <button
            onClick={handleConfirmTransactionButtonClick}
            type="button"
            className={`text-white font-semibold mb-4 mt-2 ${
              isChecked ? buttonAbleStyle : buttonDisableStyle
            }`}
          >
            거래 결정
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default UnionNumberSelectModal;