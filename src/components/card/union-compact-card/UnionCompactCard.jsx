import React, { useEffect, useState } from 'react';
import CreateUnionIcon from '../../../assets/images/make_union_icon.svg?component';

const unionCardStyle = `m-4 p-3 w-80 h-[17rem] cursor-pointer flex justify-center items-center content-center text-center
flex-col rounded-xl union-card border-2 border-neutral-300 transition ease-in-out delay-50 hover:-translate-y-1
hover:scale-105 duration-300`;

const makeUnionCard = (cardName, cardKey) => {
  return (
    <div className={unionCardStyle} key={cardKey}>
      <span className="text-white text-lg font-bold">{cardName}</span>
    </div>
  );
};

const testArray = [
  '유니온 이름 1',
  '유니온 이름 2',
  '유니온 이름 3',
  '유니온 이름 4',
  '유니온 이름 5',
  '유니온 이름 6',
  '유니온 이름 7',
  '유니온 이름 8',
  '유니온 이름 9',
  '유니온 이름 10',
  '유니온 이름 11',
  '유니온 이름 12',
  '유니온 이름 13',
  '유니온 이름 14',
  '유니온 이름 15',
  '유니온 이름 16',
  '유니온 이름 17',
  '유니온 이름 18',
  '유니온 이름 19',
  '유니온 이름 20',
  '유니온 이름 21',
  '유니온 이름 22',
  '유니온 이름 23',
  '유니온 이름 24',
  '유니온 이름 25',
  '유니온 이름 26',
  '유니온 이름 27',
];

const UnionCompactCard = ({ callStartIdx, callEndIdx, tellCardEnd }) => {
  const [renderCardList, setRenderCardList] = useState([]);
  const [cardEndIdx, setCardEndIdx] = useState(26);

  useEffect(() => {
    const callList = testArray.slice(callStartIdx, callEndIdx);
    setRenderCardList([...renderCardList, ...callList]);
    if (callEndIdx > cardEndIdx) {
      tellCardEnd(true);
    }
  }, [callStartIdx, callEndIdx, cardEndIdx]);
  return (
    <>
      <div
        className="m-4 p-3 w-80 h-[17rem] cursor-pointer flex flex-col justify-center items-center content-center text-center
      rounded-xl union-make-card transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-300 border-2 border-gray-300"
      >
        <span className="text-[#27262C] text-lg font-bold">유니온 만들기</span>
        <CreateUnionIcon className="mt-4" />
      </div>
      {renderCardList.map((testName, index) => {
        return makeUnionCard(testName, testName + index);
      })}
    </>
  );
};

export default UnionCompactCard;