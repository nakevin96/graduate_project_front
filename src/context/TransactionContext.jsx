import React, { createContext, useContext, useRef, useState } from 'react';
import { BigNumber, ethers, utils } from 'ethers';
import {
  CUTokenABI,
  CUTokenAddress,
  SwapABI,
  SwapAddress,
  UnionFactoryABI,
  UserParticipationABI,
  UnionFactoryAddress,
  UserParticipationAddress,
  UnionABI,
} from '../utils/constants';

const WalletContext = createContext();
const WalletBalanceContext = createContext();
const UnionContext = createContext();
const SwapContext = createContext();
const TransactionLoadingContext = createContext();
const UnionFactoryContext = createContext();

export function useWallet() {
  return useContext(WalletContext);
}

export function useWalletBalance() {
  return useContext(WalletBalanceContext);
}

export function useUnion() {
  return useContext(UnionContext);
}

export function useSwap() {
  return useContext(SwapContext);
}

export function useLoading() {
  return useContext(TransactionLoadingContext);
}

export function useUnionFactory() {
  return useContext(UnionFactoryContext);
}

const { ethereum } = window;

const getCUTokenContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const cuTokenContract = new ethers.Contract(
    CUTokenAddress,
    CUTokenABI,
    signer,
  );

  return [cuTokenContract, provider];
};

const getSwapContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const swapContract = new ethers.Contract(SwapAddress, SwapABI, signer);

  return [swapContract, provider];
};

const getUnionContract = unionContractAddress => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const unionContract = new ethers.Contract(
    unionContractAddress,
    UnionABI,
    signer,
  );

  return [unionContract, provider];
};

const getUnionFactoryContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const unionFactoryContract = new ethers.Contract(
    UnionFactoryAddress,
    UnionFactoryABI,
    signer,
  );

  return [unionFactoryContract, provider];
};

const getUserParticipationContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const userParticipationContract = new ethers.Contract(
    UserParticipationAddress,
    UserParticipationABI,
    signer,
  );

  return [userParticipationContract, provider];
};

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
  const [connectedAccount, setConnectedAccount] = useState('');
  const [ethBalance, setEthBalance] = useState('0.0');
  const [cuBalance, setCuBalance] = useState('0.0');
  const [unionID, setUnionID] = useState(null);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [makeUnionDone, setMakeUnionDone] = useState(false);
  const cuBalanceRef = useRef(0);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        window.open(
          'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko',
        );
        return;
      }
      const accounts = await ethereum
        .request({
          method: 'wallet_requestPermissions',
          params: [
            {
              eth_accounts: {},
            },
          ],
        })
        .then(() => ethereum.request({ method: 'eth_requestAccounts' }));

      setConnectedAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error('No ethereum object.');
    }
  };

  const disconnectWallet = async () => {
    setConnectedAccount('');
  };

  const getEthBalance = async () => {
    try {
      if (!ethereum) {
        window.open(
          'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko',
        );
        return;
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const balance = await provider.getBalance(connectedAccount);
      setEthBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.log(error);

      throw new Error('No ethereum object.');
    }
  };

  // about CUToken & CUTokenSwap
  const ethToCuSwap = async ethAmount => {
    try {
      if (!ethereum) {
        window.open(
          'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko',
        );
        return;
      }
      const [contract, swapProvider] = getSwapContract();
      const transaction = await contract.buy({
        value: utils.parseEther(ethAmount),
      });
      setLoadingScreen(true);
      await isTransactionMined(
        transaction.hash,
        swapProvider,
        setLoadingScreen,
        null,
      );
    } catch (error) {
      setLoadingScreen(false);
      console.log(error);

      throw new Error('No ethereum object');
    }
  };

  const cuToEthSwap = async cuAmount => {
    try {
      if (!ethereum) {
        window.open(
          'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko',
        );
        return;
      }
      const [cuContract, cuTokenProvider] = getCUTokenContract();
      const allowance = await cuContract.allowance(
        connectedAccount,
        SwapAddress,
      );
      const allowanceAmount = parseInt(allowance._hex) / 10 ** 18;
      if (allowanceAmount <= parseInt(cuAmount)) {
        alert('토큰 승인을 먼저 진행해주세요');
        return;
      }
      const cuSwapAmount = (cuAmount * 1e18).toString();

      const [swapContract, swapProvider] = getSwapContract();
      const transaction = await swapContract.sell(cuSwapAmount);
      setLoadingScreen(true);
      await isTransactionMined(
        transaction.hash,
        swapProvider,
        setLoadingScreen,
        null,
      );
    } catch (error) {
      setLoadingScreen(false);
      console.log(error);

      throw new Error('No ethereum object');
    }
  };

  const getCuBalance = async () => {
    try {
      if (!ethereum) {
        window.open(
          'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko',
        );
        return;
      }
      const [contract, cuTokenProvider] = getCUTokenContract();
      const balanceData = await contract.balanceOf(connectedAccount);
      const CuBalance = parseInt(balanceData._hex) / 10 ** 18;
      cuBalanceRef.current = CuBalance;
      setCuBalance(CuBalance.toString());
    } catch (error) {
      console.log(error);

      throw new Error('No ethereum object');
    }
  };

  const approveToken = async () => {
    try {
      if (!ethereum) {
        window.open(
          'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko',
        );
        return;
      }

      const [cuContract, cuTokenProvider] = getCUTokenContract();
      await getCuBalance();
      const transaction = await cuContract.approve(
        SwapAddress,
        (cuBalanceRef.current * 1e18).toString(),
        {
          from: connectedAccount,
        },
      );
      setLoadingScreen(true);
      await isTransactionMined(
        transaction.hash,
        cuTokenProvider,
        setLoadingScreen,
        null,
      );
    } catch (error) {
      setLoadingScreen(false);
      console.log(error);

      throw new Error('No ethereum object');
    }
  };

  //about UnionFactory
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
      const [unionFactoryContract, provider] = getUnionFactoryContract();
      const newUnionAddress = await unionFactoryContract.createUnion(
        CUTokenAddress,
        BigNumber.from(unionPeopleNum),
        bigNumTokenTotal,
        unionName,
      );
      setLoadingScreen(true);
      const handleMakeUnionTrue = () => {
        setMakeUnionDone(true);
      };
      await isTransactionMined(
        newUnionAddress.hash,
        provider,
        setLoadingScreen,
        handleMakeUnionTrue,
      );
      setUnionID(unionName);
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
      const [unionFactoryContract, provider] = getUnionFactoryContract();
      const unionAddress = await unionFactoryContract.getUnion(searchUnionName);
      return unionAddress;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUnionAddress = async () => {
    try {
      const [unionFactoryContract, provider] = getUnionFactoryContract();
      const allAddress = await unionFactoryContract.allUnions(0);
      console.log(allAddress);
      return allAddress;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WalletContext.Provider
      value={{ connectWallet, disconnectWallet, connectedAccount }}
    >
      <WalletBalanceContext.Provider
        value={{ getEthBalance, getCuBalance, ethBalance, cuBalance }}
      >
        <UnionContext.Provider
          value={{ unionID, setUnionID, makeNewUnion, getUnionAddressByName }}
        >
          <SwapContext.Provider
            value={{ ethToCuSwap, cuToEthSwap, approveToken }}
          >
            <TransactionLoadingContext.Provider
              value={{
                loadingScreen,
                setLoadingScreen,
                makeUnionDone,
                setMakeUnionDone,
              }}
            >
              <UnionFactoryContext.Provider value={{ getAllUnionAddress }}>
                {children}
              </UnionFactoryContext.Provider>
            </TransactionLoadingContext.Provider>
          </SwapContext.Provider>
        </UnionContext.Provider>
      </WalletBalanceContext.Provider>
    </WalletContext.Provider>
  );
};