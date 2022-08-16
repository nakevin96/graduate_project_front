import { createContext, useContext, useState } from 'react';

const TransactionLoadingContext = createContext('');

export function useLoading() {
  return useContext(TransactionLoadingContext);
}

const isTransactionMined = async (
  transactionHash,
  provider,
  changeLoadingStatus,
  makeUnionDoneTrue,
) => {
  const txReceipt = await provider.getTransactionReceipt(transactionHash);
  if (txReceipt && txReceipt.blockNumber) {
    changeLoadingStatus(false);
    makeUnionDoneTrue && makeUnionDoneTrue();
  } else {
    window.setTimeout(() => {
      isTransactionMined(
        transactionHash,
        provider,
        changeLoadingStatus,
        makeUnionDoneTrue,
      );
    }, 2500);
  }
};

export const TransactionProvider = ({ children }) => {
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [makeUnionDone, setMakeUnionDone] = useState(false);

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
      {children}
    </TransactionLoadingContext.Provider>
  );
};