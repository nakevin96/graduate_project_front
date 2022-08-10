import React, { useState } from 'react';
import { UnionCompactCard } from '../card/union-compact-card';
import CardPlusIcon from '../../assets/images/card_plus.svg?component';
import { TransactionProceedingModal } from '../modals/transaction-proceeding-modal';
import { useLoading } from '../../context';

const UnionContent = () => {
  const [startCardIdx, setStartCardIdx] = useState(0);
  const [endCardIdx, setEndCardIdx] = useState(8);
  const [isCardEnd, setIsCardEnd] = useState(false);
  const { loadingScreen, setLoadingScreen } = useLoading();
  return (
    <div className="px-20 py-16 overflow-hidden w-full bg-union flex flex-col items-center">
      <div className="flex justify-center items-center flex-wrap content-center">
        <UnionCompactCard
          callStartIdx={startCardIdx}
          callEndIdx={endCardIdx}
          tellCardEnd={setIsCardEnd}
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
      />
    </div>
  );
};

export default UnionContent;