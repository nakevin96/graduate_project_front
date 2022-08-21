import { Dialog } from '@mui/material';
import CloseIcon from '../../../assets/images/close.svg?component';
import {
  THEME_MAIN_COLOR,
  THEME_MAIN_COLOR_HOVER,
} from '../../../assets/colors';
import { useApprove } from '../../../context';

const TokenApproveModal = ({
  isOpen,
  handleModalClose,
  contractAddress,
  targetMessage,
}) => {
  const { approveToken } = useApprove();
  const buttonAbleStyle = `text-white font-bold bg-[${THEME_MAIN_COLOR}] py-2 px-12 mx-4 mt-6 mb-4 rounded-lg cursor-pointer hover:bg-[${THEME_MAIN_COLOR_HOVER}]`;

  const handleApproveButtonClick = () => {
    approveToken(contractAddress);
    handleModalClose();
  };

  return (
    <div className="overflow-auto scrollbar-hide">
      <Dialog open={isOpen} onClose={handleModalClose}>
        <div
          className="h-12 px-6 py-3 bg-[#383056] border-b-2 border-[#383241]
          flex justify-between items-center"
        >
          <p className="text-white font-bold">토큰 승인</p>
          <div className="cursor-pointer" onClick={handleModalClose}>
            <CloseIcon className="fill-white hover:fill-[#E6E6E6]" />
          </div>
        </div>
        <div className="px-16 py-2 flex flex-col justify-center bg-[#27262C]">
          <p className="pt-4 text-white font-bold text-center">{`${targetMessage}`}</p>
          <p className="text-white font-bold text-center">{`토큰 승인이 필요합니다`}</p>
          <button
            onClick={handleApproveButtonClick}
            type="button"
            className={buttonAbleStyle}
          >
            승인하기
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default TokenApproveModal;