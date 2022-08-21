import { useEffect, useState } from 'react';
import CreateUnionIcon from '../../../assets/images/make_union_icon.svg?component';
import { Link } from 'react-router-dom';
import { useUnion, useUnionFactory, useWallet } from '../../../context';
import { UnionMakeModal } from '../../modals/union-make-modal';
import { getUnionSimpleInfo, getMyUnionList } from '../../../context';

const unionCardStyle = `m-4 p-3 w-80 h-[17rem] cursor-pointer flex flex-col justify-center items-center content-center text-center
flex-col rounded-xl union-card border-2 border-neutral-300 transition ease-in-out delay-50 hover:-translate-y-1
hover:scale-105 duration-300`;

const MakeUnionCard = ({ unionInfo, isIndividual }) => {
  const singleUnionName = unionInfo?.name;
  const singleUnionEnterList = unionInfo?.enterList;
  const singleUnionIsActive = unionInfo?.isActive;
  const singleUnionRound = unionInfo?.round;
  const singleUnionOrder = unionInfo?.order;

  return (
    <div className={unionCardStyle}>
      <span className="text-white text-lg font-bold">{singleUnionName}</span>
      <div className="flex">
        {singleUnionEnterList &&
          singleUnionEnterList.map((enterData, index) => {
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
      {isIndividual && (
        <div className="w-4/5 mt-8 px-8 py-4 bg-[#3c3742] rounded-lg">
          {singleUnionIsActive ? (
            <div className="flex justify-between">
              <p className="text-white text-sm">{`현재 라운드:`}</p>
              <p className="text-white text-sm">{`${singleUnionRound} 라운드`}</p>
            </div>
          ) : (
            <p className="text-[#B8ADD2] text-sm">{`종료된 유니온입니다`}</p>
          )}
          <div className="flex justify-between mt-2">
            <p className="text-white text-sm">{`내 참여순번:`}</p>
            <p className="text-white text-sm">{`${singleUnionOrder} 번`}</p>
          </div>
        </div>
      )}
    </div>
  );
};
const UnionCompactCard = ({
  callEndIdx,
  resetCallEndIdx,
  tellCardEnd,
  isIndividual,
}) => {
  const [isUnionMakeModalOpen, setIsUnionMakeModalOpen] = useState(false);
  const [renderUnionAddressList, setRenderUnionAddressList] = useState([]);
  const [renderUnionInfoDict, setRenderUnionInfoDict] = useState({});
  const [allUnionAddress, setAllUnionAddress] = useState([]);
  const { connectedAccount } = useWallet();
  const { setUnionID, setUnionAddressG } = useUnion();
  const { getAllUnionAddress } = useUnionFactory();

  const handleUnionMakeModalClose = () => {
    setIsUnionMakeModalOpen(false);
  };

  useEffect(() => {
    renderUnionAddressList.map(address => {
      getUnionSimpleInfo(address, isIndividual, connectedAccount).then(
        simpleInfo => {
          setRenderUnionInfoDict(prevState => {
            return {
              ...prevState,
              [address]: {
                name: simpleInfo?.name,
                enterList: simpleInfo?.enterList,
                isActive: simpleInfo?.isActivate,
                round: simpleInfo?.round,
                order: simpleInfo?.order,
              },
            };
          });
        },
      );
    });
  }, [renderUnionAddressList]);

  useEffect(() => {
    setRenderUnionAddressList(allUnionAddress.slice(0, callEndIdx));
    if (allUnionAddress.length !== 0 && callEndIdx > allUnionAddress.length) {
      tellCardEnd(true);
    }
  }, [allUnionAddress, callEndIdx]);

  useEffect(() => {
    setRenderUnionAddressList(() => {
      return [];
    });
    setRenderUnionInfoDict(() => {
      return {};
    });
    resetCallEndIdx();
    tellCardEnd(false);
    if (isIndividual) {
      getMyUnionList(connectedAccount).then(data => {
        setAllUnionAddress([...data].reverse());
      });
    } else {
      getAllUnionAddress().then(data => {
        setAllUnionAddress([...data].reverse());
      });
    }
  }, [isIndividual]);

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
        className={`m-4 p-3 w-80 h-[17rem] cursor-pointer flex flex-col justify-center items-center content-center text-center
      rounded-xl union-make-card transition ease-in-out delay-100 ${
        isIndividual && 'hidden'
      } hover:-translate-y-1 hover:scale-105 duration-300 border-2 border-gray-300`}
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
              unionInfo={renderUnionInfoDict[unionAddress]}
              isIndividual={isIndividual}
            />
          </div>
        ) : (
          <div
            className={`${
              renderUnionInfoDict !== undefined &&
              Object.keys(renderUnionInfoDict).length !== 0
                ? 'block'
                : 'hidden'
            }`}
            key={unionAddress + index}
          >
            <Link
              onClick={() => {
                setUnionID(renderUnionInfoDict[unionAddress]?.name);
                setUnionAddressG(unionAddress);
              }}
              to="/unionDetail"
            >
              <MakeUnionCard
                unionInfo={renderUnionInfoDict[unionAddress]}
                isIndividual={isIndividual}
              />
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default UnionCompactCard;