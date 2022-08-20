import { Dialog } from '@mui/material';
import { MiningLoadingAnimation } from '../../animation';

const TransactionProceedingModal = ({
  isOpen,
  handleModalClose,
  disableBackdrop,
}) => {
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={(event, reason) => {
          if (!disableBackdrop || reason !== 'backdropClick') {
            handleModalClose();
          }
        }}
      >
        <div className="px-12 pt-12 pb-2 bg-[#27262C] flex flex-col justify-center items-center">
          <p className="mb-2 text-white font-bold text-2xl">
            Transaction이 진행중입니다
          </p>
          <p className="mt-2 mb-1 text-[#AD93CB] text-xs">
            창이 닫혀도 Transaction은 진행됩니다...
          </p>
          <p className="text-[#AD93CB] text-xs">
            메타마스크를 통해 거래내용을 확인하세요
          </p>
          <div className="w-[19rem]">
            <MiningLoadingAnimation />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default TransactionProceedingModal;