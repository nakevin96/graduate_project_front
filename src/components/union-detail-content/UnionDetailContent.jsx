import { useEffect, useState } from 'react';
import ExistPerson from '../../assets/images/union_people.svg?component';
import {
  animationNameList,
  LottieAnimation,
} from '../animation/lottie-animation';
import { UnionNumberSelectModal } from '../modals/union-number-select-modal';
import { TransactionProceedingModal } from '../modals/transaction-proceeding-modal';
import { ParticipateUnionCompleteModal } from '../modals/participate-union-complete-modal';
import { SelfPaymentModal } from '../modals/self-payment-modal';
import { CUSubmissionModal } from '../modals/cu-submission-modal';
import { CardInfoModal } from '../modals/card-info-modal';
import {
  useLoading,
  useUnion,
  getUnionInfo,
  useWallet,
  useParticipation,
  useApprove,
} from '../../context';
import { BigNumber } from 'ethers';
import { TokenApproveModal } from '../modals/token-approve-modal';

const unionCardTrueStyle =
  'p-1.5 bg-gradient-to-r from-[#603dbf] via-[#69a2ff] to-[#7f0ee6] rounded-xl cursor-pointer ' +
  'transition ease-in-out delay-50 hover:-translate-y-2 hover:scale-105 duration-300';
const unionCardFalseStyle =
  'p-1.5 bg-gradient-to-r from-[#b52f22] via-[#ff698c] to-[#e60e56] rounded-xl';
const unionCardParticipateStyle =
  'p-1.5 bg-gradient-to-r from-[#b5b522] via-[#ffff69] to-[#e6e20e] rounded-xl cursor-pointer ' +
  'transition ease-in-out delay-50 hover:-translate-y-2 hover:scale-105 duration-300';
const depositCompleteMyCardStyle =
  'p-1.5 bg-gradient-to-r from-[#38b522] via-[#8cf5a1] to-[#0ee65d] rounded-xl';
const depositCompleteOthersCardStyle =
  'p-1.5 bg-gradient-to-r from-[#b5227a] via-[#f0a8d1] to-[#e60e88] rounded-xl';

const MakeUnionDetailCard = ({
  unionNum,
  canEnter,
  isParticipated,
  unionAddress,
  unionInfo,
  personalInfo,
  unionInterest,
  myAddress,
  setSubmissionState,
}) => {
  const [isUnionNumberSelectedModalOpen, setIsUnionNumberSelectedMModalOpen] =
    useState(false);
  const [isMouseOverCard, setIsMouseOverCard] = useState(false);

  const unionAmount =
    Object.keys(unionInfo).length === 0
      ? ''
      : unionInfo.amount.div(BigNumber.from(10).pow(18)).toString();
  const unionPeriodPayment =
    Object.keys(unionInfo).length === 0
      ? ''
      : unionInfo.periodicPayment.div(BigNumber.from(10).pow(18)).toString();
  const unionCanParticipate = canEnter.toNumber() === 0;
  const isMyCard =
    personalInfo.joiner.toLowerCase() === myAddress.toLowerCase();

  const handleUnionNumberSelectedModalClose = () => {
    setIsUnionNumberSelectedMModalOpen(false);
  };

  return (
    <div
      onMouseEnter={() => setIsMouseOverCard(true)}
      onMouseLeave={() => setIsMouseOverCard(false)}
    >
      <div
        onClick={() => {
          if (unionCanParticipate && !isParticipated) {
            setIsUnionNumberSelectedMModalOpen(true);
          } else if (
            isMyCard &&
            !personalInfo.isDeposit &&
            unionInfo.isActivate
          ) {
            setSubmissionState(true);
          }
        }}
        className={
          unionCanParticipate
            ? unionCardTrueStyle
            : !isMyCard
            ? personalInfo.isDeposit
              ? depositCompleteOthersCardStyle
              : unionCardFalseStyle
            : personalInfo.isDeposit
            ? depositCompleteMyCardStyle
            : unionCardParticipateStyle
        }
      >
        <div className="w-72 h-96 bg-[#27262C] flex flex-col justify-center items-center rounded-xl">
          {unionCanParticipate ? (
            isMouseOverCard ? (
              <div className="w-20">
                <LottieAnimation
                  animationName={animationNameList.addProfile}
                  loopBool={false}
                />
              </div>
            ) : (
              <div className="w-12 h-12 border-2 rounded-full flex justify-center items-center">
                <span className="text-white">{unionNum}</span>
              </div>
            )
          ) : (
            <ExistPerson className="w-12" />
          )}
          <div className="flex flex-col px-6 py-4 w-full">
            <div className="flex justify-evenly">
              <p className="py-2 w-full text-white text-center">{`총 입금액:`}</p>
              <p className="py-2 w-full text-white text-center">{`${unionAmount} CU`}</p>
            </div>
            <div className="flex justify-evenly">
              <p className="py-2 w-full text-white text-center">{`월 입금액:`}</p>
              <p className="py-2 w-full text-white text-center">{`${unionPeriodPayment} CU`}</p>
            </div>
            <div className="flex justify-evenly">
              <p className="py-2 w-full text-white text-center">{`이 율:`}</p>
              <p className="py-2 w-full text-white text-center">{`${unionInterest} %`}</p>
            </div>
            <div className="flex justify-evenly">
              <p className="py-2 w-full text-white text-center">{`실 지급액:`}</p>
              <p className="py-2 w-full text-white text-center">{`${
                (parseFloat(unionAmount) * (100 + unionInterest)) / 100
              } CU`}</p>
            </div>
          </div>
        </div>
      </div>
      <UnionNumberSelectModal
        isOpen={isUnionNumberSelectedModalOpen}
        handleModalClose={handleUnionNumberSelectedModalClose}
        unionNumber={unionNum}
        unionAddress={unionAddress}
        unionInfo={{
          totalAmount: unionAmount,
          periodAmount: unionPeriodPayment,
          interest: unionInterest,
          payment: (parseFloat(unionAmount) * (100 + unionInterest)) / 100,
        }}
      />
    </div>
  );
};

const UnionDetailContent = ({ unionId, unionAddress }) => {
  const [isSelfPaymentModalOpen, setIsSelfPaymentModalOpen] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [cardInfoModalOpen, setCardInfoModalOpen] = useState(false);
  const [unionAddressD, setUnionAddressD] = useState('');
  const [unionInfo, setUnionInfo] = useState({});
  const [infoRerender, setInfoRerender] = useState({
    projectName: 'graduateFront',
  });
  const { loadingScreen, setLoadingScreen } = useLoading();
  const { participateDone, setParticipateDone } = useParticipation();
  const { connectedAccount } = useWallet();
  const { getUnionAddressByName, exitFromUnion } = useUnion();
  const { approveModalOpen, setApproveModalOpen } = useApprove();

  const unionDetailArray =
    Object.keys(unionInfo).length === 0
      ? []
      : Array.from({ length: unionInfo.people.toNumber() }, (v, i) => i + 1);
  const interestArray =
    Object.keys(unionInfo).length === 0
      ? []
      : Array.from(
          { length: unionInfo.people.toNumber() },
          (v, i) => 2 * (i + 1) - unionInfo.people.toNumber() - 1,
        );

  useEffect(() => {
    setUnionInfo(() => {
      return {};
    });
    getUnionInfo(unionAddressD, connectedAccount).then(unionInfo => {
      setUnionInfo(() => (unionInfo === undefined ? {} : unionInfo));
    });
  }, [unionAddressD, infoRerender]);

  useEffect(() => {
    if (unionAddress === '') {
      getUnionAddressByName(unionId).then(address => {
        setUnionAddressD(() => address);
      });
    } else {
      setUnionAddressD(() => unionAddress);
    }
  }, []);

  return (
    <div
      className={`w-full ${
        Object.keys(unionInfo).length === 0 ? 'h-screen' : 'h-full'
      } px-16 py-16 overflow-hidden bg-union flex flex-col items-center`}
    >
      {Object.keys(unionInfo).length === 0 ? (
        <>
          <p className="text-white text-xl py-4">{`[${unionId}] 세부 정보 로딩중입니다.. 기다려주세요!`}</p>
          <div className="w-[32rem]">
            <LottieAnimation
              animationName={animationNameList.detailLoading}
              loopBool={true}
            />
          </div>
        </>
      ) : unionInfo.isParticipate ? (
        unionInfo.isActivate ? (
          <>
            <p className="text-white text-xl py-4">{`[${unionId}] 유니온에 참여해주셔서 감사합니다`}</p>
            <p className="text-white text-sm">
              (CU 입금을 원하시면 본인카드를 클릭해주세요)
            </p>
            <div className="flex mt-3">
              <div
                onClick={() => setCardInfoModalOpen(true)}
                className="px-2 py-1 rounded-lg bg-[#B8ADD2] text-[#372F47] font-bold cursor-pointer transition ease-in-out delay-10 hover:-translate-y-0.5 hover:scale-105 duration-300"
              >
                카드 색상 정보
              </div>
              <div
                onClick={() => setIsSelfPaymentModalOpen(true)}
                className="px-2 py-1 ml-4 rounded-lg bg-[#EBFF82] text-[#27262C] font-bold cursor-pointer transition ease-in-out delay-10 hover:-translate-y-0.5 hover:scale-105 duration-300"
              >
                수동 지급 받기
              </div>
              <div
                onClick={() => exitFromUnion(unionAddressD, connectedAccount)}
                className="px-2 py-1 ml-4 rounded-lg bg-[#CD5C5C] text-white font-bold cursor-pointer transition ease-in-out delay-10 hover:-translate-y-0.5 hover:scale-105 duration-300"
              >
                유니온 나가기
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="text-white text-xl py-4">{`[${unionId}] 종료된 유니온입니다.`}</p>
          </>
        )
      ) : (
        <>
          <p className="text-white text-xl py-4">{`[${unionId}] 유니온에서 참여하실 순번을 정해주세요`}</p>
          <p className="text-white text-xs">
            (참여 가능한 번호 중에서 원하는 카드를 선택해주세요)
          </p>
        </>
      )}

      <div className="px-20 py-16 w-5/6">
        <ul className="flex flex-wrap justify-center items-center">
          {unionDetailArray.map((value, index) => {
            return (
              <li className="m-4" key={value + index}>
                <MakeUnionDetailCard
                  unionNum={value}
                  canEnter={unionInfo.canEnterList[index]}
                  isParticipated={unionInfo.isParticipate}
                  unionAddress={unionAddressD}
                  unionInfo={unionInfo}
                  personalInfo={unionInfo.participantsList[index]}
                  unionInterest={interestArray[index]}
                  myAddress={connectedAccount}
                  setSubmissionState={setIsSubmissionModalOpen}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <TransactionProceedingModal
        isOpen={loadingScreen}
        handleModalClose={() => {
          setLoadingScreen(false);
        }}
        disableBackdrop={true}
      />
      <ParticipateUnionCompleteModal
        isOpen={participateDone}
        handleModalClose={() => {
          setParticipateDone(false);
          setInfoRerender({ ...infoRerender });
        }}
      />
      <SelfPaymentModal
        isOpen={isSelfPaymentModalOpen}
        handleModalClose={() => {
          setIsSelfPaymentModalOpen(false);
        }}
        unionAddress={unionAddressD}
      />
      <CUSubmissionModal
        isOpen={isSubmissionModalOpen}
        handleModalClose={() => {
          setIsSubmissionModalOpen(false);
        }}
        unionAddress={unionAddressD}
        unionInfo={unionInfo}
      />
      <TokenApproveModal
        isOpen={approveModalOpen}
        handleModalClose={() => setApproveModalOpen(false)}
        targetMessage={'유니온에 입금을 하기 위해서는'}
        contractAddress={unionAddressD}
      />
      <CardInfoModal
        isOpen={cardInfoModalOpen}
        handleModalClose={() => setCardInfoModalOpen(false)}
      />
    </div>
  );
};

export default UnionDetailContent;