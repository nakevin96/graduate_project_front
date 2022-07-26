import React, { useState } from 'react';
import ExistPerson from '../../assets/images/union_people.svg?component';
import { UnionNumberSelectModal } from '../modals/union-number-select-modal';

const UNION_TOTAL_NUM = [1, 2, 3, 4, 5];
const UnionCanEnter = [false, true, true, false, false];

const unionCardTrueStyle =
  'p-0.5 bg-gradient-to-r from-[#603dbf] via-[#69a2ff] to-[#7f0ee6] rounded-xl cursor-pointer ' +
  'transition ease-in-out delay-50 hover:-translate-y-2 hover:scale-105 duration-300';
const unionCardFalseStyle =
  'p-0.5 bg-gradient-to-r from-[#b52f22] via-[#ff698c] to-[#e60e56] rounded-xl';

const MakeUnionDetailCard = ({ unionNum, canEnter, unionId }) => {
  const [isUnionNumberSelectedModalOpen, setIsUnionNumberSelectedMModalOpen] =
    useState(false);

  const handleUnionNumberSelectedModalClose = () => {
    setIsUnionNumberSelectedMModalOpen(false);
  };
  return (
    <div>
      <div
        onClick={() => setIsUnionNumberSelectedMModalOpen(true)}
        className={canEnter ? unionCardTrueStyle : unionCardFalseStyle}
      >
        <div className="w-72 h-96 bg-[#27262C] flex flex-col justify-center items-center rounded-xl">
          {canEnter ? (
            <div className="w-12 h-12 border-2 rounded-full flex justify-center items-center">
              <span className="text-white">{unionNum}</span>
            </div>
          ) : (
            <ExistPerson className="w-12" />
          )}
          <div className="flex flex-col px-6 py-4 w-full">
            <p className="py-2 w-full text-white test-start">총 입금량:</p>
            <p className="py-2 w-full text-white test-start">월 입금량:</p>
            <p className="py-2 w-full text-white test-start">실 지급량:</p>
            <p className="py-2 w-full text-white test-start">적용 이율:</p>
            <p className="py-2 w-full text-white test-start">실 이자:</p>
          </div>
        </div>
      </div>
      <UnionNumberSelectModal
        isOpen={isUnionNumberSelectedModalOpen}
        handleModalClose={handleUnionNumberSelectedModalClose}
        unionName={unionId}
        unionNumber={unionNum}
      />
    </div>
  );
};

const UnionDetailContent = ({ unionId }) => {
  return (
    <div className="px-20 py-16 overflow-hidden w-full bg-union flex flex-col items-center">
      <p className="text-white text-xl py-4">{`[${unionId}] 유니온에서 참여하실 순번을 정해주세요`}</p>
      <p className="text-white text-xs">
        (참여 가능한 번호 중에서 원하는 카드를 선택해주세요)
      </p>
      <div className="px-20 py-16 w-5/6">
        <ul className="flex flex-wrap justify-center items-center">
          {UNION_TOTAL_NUM.map((value, index) => {
            return (
              <li className="m-4" key={value + index}>
                <MakeUnionDetailCard
                  unionNum={value}
                  canEnter={UnionCanEnter[index]}
                  unionId={unionId}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default UnionDetailContent;