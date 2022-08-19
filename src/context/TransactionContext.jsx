import { createContext, useContext, useState } from 'react';

const TransactionLoadingContext = createContext('');
const TransactionParticipateContext = createContext('');

export function useLoading() {
  return useContext(TransactionLoadingContext);
}

export function useParticipation() {
  return useContext(TransactionParticipateContext);
}

const isTransactionMined = async (
  transactionHash,
  provider,
  changeLoadingStatus,
  makeUnionDoneTrue,
  participateUnionDoneTrue,
) => {
  const txReceipt = await provider.getTransactionReceipt(transactionHash);
  if (txReceipt && txReceipt.blockNumber) {
    changeLoadingStatus(false);
    makeUnionDoneTrue && makeUnionDoneTrue();
    participateUnionDoneTrue && participateUnionDoneTrue();
  } else {
    window.setTimeout(() => {
      isTransactionMined(
        transactionHash,
        provider,
        changeLoadingStatus,
        makeUnionDoneTrue,
        participateUnionDoneTrue,
      );
    }, 2500);
  }
};

export const TransactionProvider = ({ children }) => {
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [makeUnionDone, setMakeUnionDone] = useState(false);
  const [participateDone, setParticipateDone] = useState(false);

  return (
    <TransactionLoadingContext.Provider
      value={{
        isTransactionMined,
        loadingScreen,
        setLoadingScreen,
        makeUnionDone,
        setMakeUnionDone,
      }}
    >
      <TransactionParticipateContext.Provider
        value={{ participateDone, setParticipateDone }}
      >
        {children}
      </TransactionParticipateContext.Provider>
    </TransactionLoadingContext.Provider>
  );
};