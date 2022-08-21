import { useState } from 'react';
import { Dialog } from '@mui/material';
import CloseIcon from '../../../assets/images/close.svg?component';
import ExistPerson from '../../../assets/images/union_people.svg?component';
import MoveBackIcon from '../../../assets/images/moveBackCard.svg?component';
import MoveForwardIcon from '../../../assets/images/moveRightCard.svg?component';

const cardInfoDict = {
  YELLOW: {
    borderStyle:
      'p-1.5 bg-gradient-to-r from-[#b5b522] via-[#ffff69] to-[#e6e20e] rounded-xl',
    info: '내가 참여한 순번을 의미하며,',
    info2: '이번 라운드에 아직 CU를 입금하지 않은 상태입니다.',
  },
  GREEN: {
    borderStyle:
      'p-1.5 bg-gradient-to-r from-[#38b522] via-[#8cf5a1] to-[#0ee65d] rounded-xl',
    info: '내가 참여한 순번을 의미하며,',
    info2: '이번 라운드에 CU 입금을 마친 상태입니다.',
  },
  RED: {
    borderStyle:
      'p-1.5 bg-gradient-to-r from-[#b52f22] via-[#ff698c] to-[#e60e56] rounded-xl',
    info: '타인이 참여한 순번을 의미하며,',
    info2: '이번 라운드에 아직 CU를 입금하지 않은 상태입니다.',
  },
  PINK: {
    borderStyle:
      'p-1.5 bg-gradient-to-r from-[#b5227a] via-[#f0a8d1] to-[#e60e88] rounded-xl',
    info: '타인이 참여한 순번을 의미하며,',
    info2: '이번 라운드에 CU 입금을 마친 상태입니다.',
  },
};

const numToColorDict = {
  0: 'YELLOW',
  1: 'GREEN',
  2: 'RED',
  3: 'PINK',
};

const CardInfoModal = ({ isOpen, handleModalClose }) => {
  const [currCardNum, setCurrCardNum] = useState(0);
  const moveForward = currNum => {
    if (currNum === Object.keys(numToColorDict).length - 1) {
      return 0;
    }
    return currNum + 1;
  };
  const moveBack = currNum => {
    if (currNum === 0) {
      return Object.keys(numToColorDict).length - 1;
    }
    return currNum - 1;
  };

  const handleForwardClick = () => {
    setCurrCardNum(prev => moveForward(prev));
  };
  const handleBackClick = () => {
    setCurrCardNum(prev => moveBack(prev));
  };

  return (
    <div className="overflow-auto scrollbar-hide">
      <Dialog
        open={isOpen}
        onClose={() => {
          setCurrCardNum(0);
          handleModalClose();
        }}
      >
        <div className="w-96 h-12 px-6 py-3 bg-[#383056] border-b-2 border-[#383241] flex justify-between items-center">
          <p className="text-white font-bold">카드 색상 정보</p>
          <div
            className="cursor-pointer"
            onClick={() => {
              setCurrCardNum(0);
              handleModalClose();
            }}
          >
            <CloseIcon className="fill-white hover:fill-[#E6E6E6]" />
          </div>
        </div>
        <div className="w-full py-6 bg-[#27262C] flex justify-center items-center">
          <MoveBackIcon onClick={handleBackClick} className="cursor-pointer" />
          <div className="flex flex-col justify-center items-center">
            <div
              className={cardInfoDict[numToColorDict[currCardNum]].borderStyle}
            >
              <div className="w-72 h-96 bg-[#27262C] flex flex-col justify-center items-center rounded-xl">
                <ExistPerson className="w-12" />
                <div className="my-4 mx-4 px-8 py-4 bg-[#3c3742] rounded-lg">
                  <p className="text-white text-sm">
                    {cardInfoDict[numToColorDict[currCardNum]].info}
                  </p>
                  <p className="text-white text-sm">
                    {cardInfoDict[numToColorDict[currCardNum]].info2}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <MoveForwardIcon
            onClick={handleForwardClick}
            className="cursor-pointer"
          />
        </div>
      </Dialog>
    </div>
  );
};

export default CardInfoModal;