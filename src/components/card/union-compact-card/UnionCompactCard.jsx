import React, { useEffect, useState } from 'react';
import CreateUnionIcon from '../../../assets/images/make_union_icon.svg?component';
import { Link } from 'react-router-dom';
import { useUnion, useUnionFactory, useWallet } from '../../../context';
import { UnionMakeModal } from '../../modals/union-make-modal';
import { getUnionSimpleInfo } from '../../../context';

const unionCardStyle = `m-4 p-3 w-80 h-[17rem] cursor-pointer flex flex-col justify-center items-center content-center text-center
flex-col rounded-xl union-card border-2 border-neutral-300 transition ease-in-out delay-50 hover:-translate-y-1
hover:scale-105 duration-300`;

const MakeUnionCard = ({ cardName, enterList }) => {
  return (
    <div className={unionCardStyle}>
      <span className="text-white text-lg font-bold">{cardName}</span>
      <div className="flex">
        {enterList &&
          enterList.map((enterData, index) => {
            return (
              <div
                className={`w-4 h-4 rounded-full mr-1 mt-2 ${
                  enterData.toNumber() === 0 ? 'bg-[#4AA8D8]' : 'bg-[#DB4455]'
                }`}
                key={index}
              />
            );
          })}
      </div>
    </div>
  );
};

const UnionCompactCard = ({ callEndIdx, tellCardEnd, isIndividual }) => {
  const [isUnionMakeModalOpen, setIsUnionMakeModalOpen] = useState(false);
  const [renderUnionAddressList, setRenderUnionAddressList] = useState([]);
  const [renderUnionNameDict, setRenderUnionNameDict] = useState({});
  const [renderUnionEnterListDict, setRenderUnionEnterListDict] = useState({});
  const [allUnionAddress, setAllUnionAddress] = useState([]);
  const { connectedAccount } = useWallet();
  const { setUnionID } = useUnion();
  const { getAllUnionAddress } = useUnionFactory();

  const handleUnionMakeModalClose = () => {
    setIsUnionMakeModalOpen(false);
  };

  useEffect(() => {
    renderUnionAddressList.map(address => {
      getUnionSimpleInfo(address).then(simpleInfo => {
        setRenderUnionNameDict(prevState => {
          return { ...prevState, [address]: simpleInfo.name };
        });
        setRenderUnionEnterListDict(prevState => {
          return { ...prevState, [address]: simpleInfo.enterList };
        });
      });
    });
  }, [renderUnionAddressList]);

  useEffect(() => {
    setRenderUnionAddressList(allUnionAddress.slice(0, callEndIdx));
    if (allUnionAddress.length !== 0 && callEndIdx > allUnionAddress.length) {
      tellCardEnd(true);
    }
  }, [allUnionAddress, callEndIdx]);

  useEffect(() => {
    getAllUnionAddress().then(data => {
      setAllUnionAddress([...data].reverse());
    });
  }, []);

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
      {renderUnionAddressList.map((unionAddress, index) => {
        return connectedAccount === '' ? (
          <div
            onClick={() => alert('지갑을 먼저 연결해주세요')}
            key={unionAddress + index}
          >
            <MakeUnionCard
              cardName={renderUnionNameDict[unionAddress]}
              enterList={renderUnionEnterListDict[unionAddress]}
            />
          </div>
        ) : (
          <div
            className={`${
              renderUnionNameDict !== undefined &&
              Object.keys(renderUnionNameDict).length !== 0
                ? 'block'
                : 'hidden'
            }`}
            key={unionAddress + index}
          >
            <Link
              onClick={() => setUnionID(renderUnionNameDict[unionAddress])}
              to="/unionDetail"
            >
              <MakeUnionCard
                cardName={renderUnionNameDict[unionAddress]}
                enterList={renderUnionEnterListDict[unionAddress]}
              />
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default UnionCompactCard;