import React, { useState } from 'react';
import { UnionCompactCard } from '../card/union-compact-card';
import CardPlusIcon from '../../assets/images/card_plus.svg?component';
import { TransactionProceedingModal } from '../modals/transaction-proceeding-modal';
import { useLoading, useWallet } from '../../context';
import { MakeUnionCompleteModal } from '../modals/make-union-complete-modal';

const UnionContent = () => {
  const [startCardIdx, setStartCardIdx] = useState(0);
  const [endCardIdx, setEndCardIdx] = useState(8);
  const [isCardEnd, setIsCardEnd] = useState(false);
  const [isIndividual, setIsIndividual] = useState(false);
  const { connectedAccount } = useWallet();
  const { loadingScreen, setLoadingScreen, makeUnionDone, setMakeUnionDone } =
    useLoading();

  return (
    <div className="px-20 py-16 overflow-hidden w-full bg-union flex flex-col items-center">
      <div className="my-4 flex rounded-full bg-[#372F47]">
        <div
          onClick={() => setIsIndividual(false)}
          className={`px-4 py-2 cursor-pointer rounded-full ${
            !isIndividual && 'bg-[#B8ADD2]'
          } hover:opacity-50`}
        >
          <p
            className={`${
              !isIndividual ? 'text-[#372F47]' : 'text-[#B8ADD2]'
            } font-bold`}
          >
            전체 유니온
          </p>
        </div>
        <div
          onClick={() => {
            if (connectedAccount === '') {
              alert('지갑을 먼저 연결해주세요');
            } else {
              setIsIndividual(true);
            }
          }}
          className={`px-4 py-2 cursor-pointer rounded-full ${
            isIndividual && 'bg-[#B8ADD2]'
          } hover:opacity-50`}
        >
          <p
            className={`${
              isIndividual ? 'text-[#372F47]' : 'text-[#B8ADD2]'
            } font-bold`}
          >
            내가 참여한 유니온
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center flex-wrap content-center">
        <UnionCompactCard
          callStartIdx={startCardIdx}
          callEndIdx={endCardIdx}
          tellCardEnd={setIsCardEnd}
          isIndividual={isIndividual}
        />
      </div>
      {!isCardEnd && (
        <CardPlusIcon
          onClick={() => {
            setStartCardIdx(endCardIdx);
            setEndCardIdx(endCardIdx + 6);
          }}
          className="m-10 fill-[#27262C] cursor-pointer hover:fill-[#0284c7]
      transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-300"
        />
      )}
      <TransactionProceedingModal
        isOpen={loadingScreen}
        handleModalClose={() => setLoadingScreen(false)}
        disableBackdrop={true}
      />
      <MakeUnionCompleteModal
        isOpen={makeUnionDone}
        handleModalClose={() => setMakeUnionDone(false)}
      />
    </div>
  );
};

export default UnionContent;