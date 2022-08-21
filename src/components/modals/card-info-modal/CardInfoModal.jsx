import { Dialog } from '@mui/material';
import CloseIcon from '../../../assets/images/close.svg?component';
import ExistPerson from '../../../assets/images/union_people.svg?component';

const CardInfoModal = ({ isOpen, handleModalClose }) => {
  return (
    <div className="overflow-auto scrollbar-hide">
      <Dialog open={isOpen} onClose={() => handleModalClose()}>
        <div className="w-96 h-12 px-6 py-3 bg-[#383056] border-b-2 border-[#383241] flex justify-between items-center">
          <p className="text-white font-bold">카드 색상 정보</p>
          <div className="cursor-pointer" onClick={handleModalClose}>
            <CloseIcon className="fill-white hover:fill-[#E6E6E6]" />
          </div>
        </div>
        <div className="w-full px-6 py-6 bg-[#27262C] flex flex-col justify-center items-center">
          <div className="p-0.5 bg-gradient-to-r from-[#38b522] via-[#8cf5a1] to-[#0ee65d] rounded-xl">
            <div className="w-72 h-96 bg-[#27262C] flex flex-col justify-center items-center rounded-xl">
              <ExistPerson className="w-12" />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CardInfoModal;