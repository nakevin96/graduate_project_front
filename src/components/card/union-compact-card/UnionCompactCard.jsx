import React, { useEffect, useState, useRef } from 'react';
import CreateUnionIcon from '../../../assets/images/make_union_icon.svg?component';
import { Link } from 'react-router-dom';
import { useUnion, useUnionFactory, useWallet } from '../../../context';
import { UnionMakeModal } from '../../modals/union-make-modal';
import { getUnionName } from '../../../context';

const unionCardStyle = `m-4 p-3 w-80 h-[17rem] cursor-pointer flex justify-center items-center content-center text-center
flex-col rounded-xl union-card border-2 border-neutral-300 transition ease-in-out delay-50 hover:-translate-y-1
hover:scale-105 duration-300`;

const MakeUnionCard = ({ cardName }) => {
  return (
    <div className={unionCardStyle}>
      <span className="text-white text-lg font-bold">{cardName}</span>
    </div>
  );
};

const UnionCompactCard = ({
  callStartIdx,
  callEndIdx,
  tellCardEnd,
  isIndividual,
}) => {
  const [isUnionMakeModalOpen, setIsUnionMakeModalOpen] = useState(false);
  const [renderCardList, setRenderCardList] = useState([]);
  const [cardEndIdx, setCardEndIdx] = useState(26);
  const [allUnionAddress, setAllUnionAddress] = useState([]);
  const { connectedAccount } = useWallet();
  const { setUnionID } = useUnion();
  const { getAllUnionAddress } = useUnionFactory();
  const allUnionNames = useRef([]);

  const handleUnionMakeModalClose = () => {
    setIsUnionMakeModalOpen(false);
  };

  useEffect(() => {
    getAllUnionAddress().then(data => {
      setAllUnionAddress(data);
      const callList = data.slice(callStartIdx, callEndIdx);
      setRenderCardList([...renderCardList, ...callList]);
      if (callEndIdx > cardEndIdx) {
        tellCardEnd(true);
      }
    });
  }, [callStartIdx, callEndIdx, cardEndIdx]);

  return (
    <>
      <div
        onClick={() => {
          if (connectedAccount === '') {
            alert('지갑을 먼저 연결해주세요');
          } else {
            setIsUnionMakeModalOpen(true);
          }
        }}
        className="m-4 p-3 w-80 h-[17rem] cursor-pointer flex flex-col justify-center items-center content-center text-center
      rounded-xl union-make-card transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-300 border-2 border-gray-300"
      >
        <span className="text-[#27262C] text-lg font-bold">유니온 만들기</span>
        <CreateUnionIcon className="mt-4" />
      </div>
      <UnionMakeModal
        isOpen={isUnionMakeModalOpen}
        handleModalClose={handleUnionMakeModalClose}
      />
      {renderCardList.map((testName, index) => {
        return connectedAccount === '' ? (
          <div
            onClick={() => alert('지갑을 먼저 연결해주세요')}
            key={testName + index}
          >
            <MakeUnionCard cardName={testName} />
          </div>
        ) : (
          <Link
            onClick={() => setUnionID(testName)}
            to="/unionDetail"
            key={testName + index}
          >
            <MakeUnionCard cardName={testName} />
          </Link>
        );
      })}
    </>
  );
};

export default UnionCompactCard;