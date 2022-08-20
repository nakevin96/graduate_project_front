import { useEffect, useState } from 'react';
import ExistPerson from '../../assets/images/union_people.svg?component';
import { UnionNumberSelectModal } from '../modals/union-number-select-modal';
import { TransactionProceedingModal } from '../modals/transaction-proceeding-modal';
import { ParticipateUnionCompleteModal } from '../modals/participate-union-complete-modal';
import { SelfPaymentModal } from '../modals/self-payment-modal';
import { CUSubmissionModal } from '../modals/cu-submission-modal';
import {
  useLoading,
  useUnion,
  getUnionInfo,
  useWallet,
  useParticipation,
  useApprove,
} from '../../context';
import { BigNumber } from 'ethers';

const unionCardTrueStyle =
  'p-0.5 bg-gradient-to-r from-[#603dbf] via-[#69a2ff] to-[#7f0ee6] rounded-xl cursor-pointer ' +
  'transition ease-in-out delay-50 hover:-translate-y-2 hover:scale-105 duration-300';
const unionCardFalseStyle =
  'p-0.5 bg-gradient-to-r from-[#b52f22] via-[#ff698c] to-[#e60e56] rounded-xl';
const unionCardParticipateStyle =
  'p-0.5 bg-gradient-to-r from-[#b5b522] via-[#ffff69] to-[#e6e20e] rounded-xl cursor-pointer ' +
  'transition ease-in-out delay-50 hover:-translate-y-2 hover:scale-105 duration-300';
const depositCompleteMyCardStyle =
  'p-0.5 bg-gradient-to-r from-[#38b522] via-[#8cf5a1] to-[#0ee65d] rounded-xl';
const depositCompleteOthersCardStyle =
  'p-0.5 bg-gradient-to-r from-[#b5227a] via-[#f0a8d1] to-[#e60e88] rounded-xl';

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
    <div>
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
            <div className="w-12 h-12 border-2 rounded-full flex justify-center items-center">
              <span className="text-white">{unionNum}</span>
            </div>
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
  const [unionAddressD, setUnionAddressD] = useState('');
  const [unionInfo, setUnionInfo] = useState({});
  const [infoRerender, setInfoRerender] = useState({
    projectName: 'graduateFront',
  });
  const { loadingScreen, setLoadingScreen } = useLoading();
  const { participateDone, setParticipateDone } = useParticipation();
  const { connectedAccount } = useWallet();
  const { getUnionAddressByName, exitFromUnion } = useUnion();
  const { approveToken } = useApprove();

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
      } px-20 py-16 overflow-hidden bg-union flex flex-col items-center`}
    >
      {Object.keys(unionInfo).length === 0 ? (
        <>
          <p className="text-white text-xl py-4">{`[${unionId}] 세부 정보 로딩중입니다.. 기다려주세요!`}</p>
          <div role="status">
            <svg
              className="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
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
                onClick={() => setIsSelfPaymentModalOpen(true)}
                className="px-2 py-1 rounded-lg bg-[#EBFF82] text-[#27262C] font-bold cursor-pointer transition ease-in-out delay-10 hover:-translate-y-0.5 hover:scale-105 duration-300"
              >
                수동 지급 받기
              </div>
              <div
                onClick={() => approveToken(unionAddressD)}
                className="px-2 py-1 ml-4 rounded-lg bg-[#B8ADD2] text-[#372F47] font-bold cursor-pointer transition ease-in-out delay-10 hover:-translate-y-0.5 hover:scale-105 duration-300"
              >
                유니온에 대해 토큰 승인
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
    </div>
  );
};

export default UnionDetailContent;