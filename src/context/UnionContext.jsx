import { createContext, useContext, useState } from 'react';
import { useLoading } from './TransactionContext';
import { useWallet } from './WalletContext';
import { BigNumber, ethers } from 'ethers';
import {
  CUTokenAddress,
  SwapAddress,
  UnionABI,
  UnionFactoryABI,
  UnionFactoryAddress,
  UserParticipationABI,
  UserParticipationAddress,
} from '../utils/constants';

const UnionContext = createContext('');
const UnionFactoryContext = createContext('');

const { ethereum } = window;

export function useUnion() {
  return useContext(UnionContext);
}

export function useUnionFactory() {
  return useContext(UnionFactoryContext);
}

const getUnionContract = unionContractAddress => {
  const unionProvider = new ethers.providers.Web3Provider(ethereum);
  const signer = unionProvider.getSigner();
  const unionContract = new ethers.Contract(
    unionContractAddress,
    UnionABI,
    signer,
  );

  return { unionContract, unionProvider };
};

const getUnionFactoryContract = () => {
  const unionFactoryProvider = new ethers.providers.Web3Provider(ethereum);
  const signer = unionFactoryProvider.getSigner();
  const unionFactoryContract = new ethers.Contract(
    UnionFactoryAddress,
    UnionFactoryABI,
    signer,
  );

  return { unionFactoryContract, unionFactoryProvider };
};

const getUserParticipationContract = () => {
  const userParticipationProvider = new ethers.providers.Web3Provider(ethereum);
  const signer = userParticipationProvider.getSigner();
  const userParticipationContract = new ethers.Contract(
    UserParticipationAddress,
    UserParticipationABI,
    signer,
  );

  return { userParticipationContract, userParticipationProvider };
};

export const getUnionSimpleInfo = async unionAddress => {
  const { unionContract } = getUnionContract(unionAddress);
  const unionName = await unionContract.name();
  const unionEnterList = await unionContract.getUnionOrder();
  return { name: unionName, enterList: unionEnterList };
};

export const getUnionInfo = async (unionAddress, myAddress) => {
  try {
    if (unionAddress === '') return;
    const { unionContract } = getUnionContract(unionAddress);
    const tmpUnionPeople = await unionContract.people();
    const tmpUnionAllAmount = await unionContract.amount();
    const tmpUnionPeriodicPayment = await unionContract.periodicPayment();
    const tmpIsParticipate = await unionContract.isParticipate(myAddress);
    const tmpCanEnterList = await unionContract.getUnionOrder();
    const tmpParticipantsList = [];
    for (let i = 0; i < tmpUnionPeople; i++) {
      const tmpParticipant = await unionContract.participants(i);
      tmpParticipantsList.push(tmpParticipant);
    }

    return {
      people: tmpUnionPeople,
      amount: tmpUnionAllAmount,
      periodicPayment: tmpUnionPeriodicPayment,
      isParticipate: tmpIsParticipate,
      canEnterList: tmpCanEnterList,
      participantsList: tmpParticipantsList,
    };
  } catch (error) {
    console.log(error);
  }
};

export const UnionProvider = ({ children }) => {
  const [unionID, setUnionID] = useState(null);
  const { setLoadingScreen, isTransactionMined, setMakeUnionDone } =
    useLoading();

  const makeNewUnion = async (unionPeopleNum, unionTotalAmount, unionName) => {
    try {
      if (!ethereum) {
        window.open(
          'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko',
        );
        return;
      }
      const bigNumTokenTotal = BigNumber.from(unionTotalAmount).mul(
        BigNumber.from(10).pow(18),
      );
      const { unionFactoryContract, unionFactoryProvider } =
        getUnionFactoryContract();
      const newUnionAddress = await unionFactoryContract.createUnion(
        CUTokenAddress,
        BigNumber.from(unionPeopleNum),
        bigNumTokenTotal,
        unionName,
        SwapAddress,
        UserParticipationAddress,
        UnionFactoryAddress,
      );
      setLoadingScreen(true);
      const handleMakeUnionTrue = () => {
        setMakeUnionDone(true);
        setUnionID(unionName);
      };
      await isTransactionMined(
        newUnionAddress.hash,
        unionFactoryProvider,
        setLoadingScreen,
        handleMakeUnionTrue,
      );
      return newUnionAddress;
    } catch (error) {
      setLoadingScreen(false);
      if (error.error.message === 'execution reverted: UNION_EXISTS') {
        alert(
          '중복된 이름의 유니온이 존재합니다.\n 다른 유니온 이름을 입력해주세요.',
        );
      }

      throw new Error(`makeNewUnion is Failed.. (${error})`);
    }
  };

  const getUnionAddressByName = async searchUnionName => {
    try {
      const { unionFactoryContract } = getUnionFactoryContract();
      return await unionFactoryContract.getUnion(searchUnionName);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUnionAddress = async () => {
    try {
      const { unionFactoryContract } = getUnionFactoryContract();
      const allAddress = await unionFactoryContract.getAllUnions();
      return allAddress;
    } catch (error) {
      console.log(error);
    }
  };

  const participateToUnion = async (unionAddress, order, cuTotalAmount) => {
    try {
      if (unionAddress === '') return;
      const { unionContract, unionProvider } = getUnionContract(unionAddress);
      const participateTransaction = await unionContract.participate(order, {
        value: ethers.utils.parseEther(
          String(parseFloat(cuTotalAmount) / 10 ** 4),
        ),
      });
      setLoadingScreen(true);
      await isTransactionMined(
        participateTransaction.hash,
        unionProvider,
        setLoadingScreen,
        null,
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UnionContext.Provider
      value={{
        unionID,
        setUnionID,
        makeNewUnion,
        getUnionAddressByName,
        participateToUnion,
      }}
    >
      <UnionFactoryContext.Provider value={{ getAllUnionAddress }}>
        {children}
      </UnionFactoryContext.Provider>
    </UnionContext.Provider>
  );
};