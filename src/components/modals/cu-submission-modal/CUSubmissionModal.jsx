import { useState } from 'react';
import {
  useLoading,
  cuDeposit,
  useParticipation,
  useApprove,
} from '../../../context';
import {
  THEME_MAIN_COLOR,
  THEME_MAIN_COLOR_HOVER,
} from '../../../assets/colors';
import { Checkbox, Dialog } from '@mui/material';
import CloseIcon from '../../../assets/images/close.svg?component?';

const CUSubmissionModal = ({
  isOpen,
  handleModalClose,
  unionAddress,
  unionInfo,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const { setParticipateDone } = useParticipation();
  const { isTransactionMined, setLoadingScreen } = useLoading();
  const { setApproveModalOpen } = useApprove();
  const buttonAbleStyle = `bg-[${THEME_MAIN_COLOR}] py-2 px-12 mx-4 rounded-lg cursor-pointer hover:bg-[${THEME_MAIN_COLOR_HOVER}]`;
  const buttonDisableStyle = `bg-[#d8d8d8] py-2 px-12 mx-4 rounded-lg cursor-not-allowed`;

  const convertedInitDate = new Date(
    unionInfo.initDate * 1000,
  ).toLocaleString();
  const convertedDueDateStart = new Date(
    (unionInfo.dueDate - 120) * 1000,
  ).toLocaleString();
  const convertedDueDateEnd = new Date(
    unionInfo.dueDate * 1000,
  ).toLocaleString();

  const handleDepositDone = () => setParticipateDone(true);
  const handleApproveModalOpen = () => setApproveModalOpen(true);

  const handleSubmissionButtonClick = async () => {
    setIsChecked(false);
    handleModalClose();
    await cuDeposit(
      unionAddress,
      setLoadingScreen,
      isTransactionMined,
      handleDepositDone,
      handleApproveModalOpen,
    );
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
          <p className="text-white font-bold">이번 라운드 CU 입금</p>
          <div className="cursor-pointer" onClick={handleModalClose}>
            <CloseIcon className="fill-white hover:fill-[#E6E6E6]" />
          </div>
        </div>
        <div className="px-16 py-2 flex flex-col bg-[#27262C]">
          {unionInfo.initDate === undefined ||
          unionInfo.initDate.toNumber() === 0 ? (
            <div className="my-4 px-8 py-4 bg-[#3c3742] rounded-lg">
              <p className="flex-wrap text-white text-sm">
                유니온이 시작되기 전에는 자유롭게 입금이 가능합니다.
              </p>
              <p className="flex-wrap text-white text-sm">
                마지막 참가자가 CU 입금을 완료했을 때
              </p>
              <p className="flex-wrap text-white text-sm">
                Union이 자동으로 시작되며,
              </p>
              <p className="flex-wrap text-white text-sm">
                시작 후에는 정해진 기간 내에 입금이 이루어져야 합니다.
              </p>
            </div>
          ) : (
            <div className="my-4 px-8 py-4 bg-[#3c3742] rounded-lg">
              <p className="flex-wrap text-white text-sm text-center">
                이번 입금 기간은 다음과 같습니다.
              </p>
              <p className="mt-2 flex-wrap text-white text-sm text-center">{`라운드 시작시간 : ${convertedInitDate}`}</p>
              <p className="flex-wrap text-white text-sm text-center">{`입금 시작시간 : ${convertedDueDateStart}`}</p>
              <p className="flex-wrap text-white text-sm text-center">{`입금 종료시간 : ${convertedDueDateEnd}`}</p>

              <p className="mt-2 flex-wrap text-white text-center text-xs text-[#ff0044]">
                ※입금 종료일이 지난 후에는 보증금이 차감됩니다※
              </p>
            </div>
          )}
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