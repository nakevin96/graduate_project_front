import React from 'react';
import { Link } from 'react-router-dom';
import PersonAnimation from '../person-animation/PersonAnimation';
import { TransactionProceedingModal } from '../modals/transaction-proceeding-modal';
import { useLoading, useUnionFactory } from '../../context';

const Welcome = () => {
  const { loadingScreen, setLoadingScreen } = useLoading();
  const { getAllUnionAddress } = useUnionFactory();
  return (
    <div className="overflow-auto scrollbar-hide flex w-full justify-center items-center">
      <div className="flex flex-col wf:flex-row items-center justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-4xl text-white py-1">
            암호화폐와 함께 <br /> 돈을 모아보세요!
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            A big money raising platform, CREDIT UNION
            <br />
            Let's save up money together!
          </p>
          <button
            type="button"
            className="flex flex-row justify-center items-center
                    my-5 bg-[#0ea5e9] rounded-full cursor-pointer hover:bg-[#0284c7]"
          >
            <Link to="/union">
              <p
                onClick={getAllUnionAddress}
                className="px-24 py-3 text-white text-base font-semibold"
              >
                유니온 시작하기
              </p>
            </Link>
          </button>
        </div>
        <div className="w-[28rem]">
          <PersonAnimation />
        </div>
      </div>
      <TransactionProceedingModal
        isOpen={loadingScreen}
        handleModalClose={() => setLoadingScreen(false)}
      />
    </div>
  );
};

export default Welcome;