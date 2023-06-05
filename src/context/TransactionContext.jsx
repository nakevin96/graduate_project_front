import {createContext, useContext, useState} from 'react';

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
    setTransactionSuccessModalTrue,
) => {
    provider.waitForTransaction(transactionHash).then((receipt) => {
        changeLoadingStatus(false);
        setTransactionSuccessModalTrue && setTransactionSuccessModalTrue();
    }).catch((error) => {
        changeLoadingStatus(false);
        console.alert('이더리움 네트워크에서 에러가 발생했습니다');
    });
};

export const TransactionProvider = ({children}) => {
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
                value={{participateDone, setParticipateDone}}
            >
                {children}
            </TransactionParticipateContext.Provider>
        </TransactionLoadingContext.Provider>
    );
};