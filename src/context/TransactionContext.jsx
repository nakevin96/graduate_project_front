import React, { createContext, useContext, useRef, useState } from 'react';
import { ethers, utils } from 'ethers';
import {
  CUTokenABI,
  CUTokenAddress,
  SwapABI,
  SwapAddress,
} from '../utils/constants';

const WalletContext = createContext();
const WalletBalanceContext = createContext();
const UnionContext = createContext();
const SwapContext = createContext();
const TransactionLoadingContext = createContext();

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

const isTransactionMined = async (
  transactionHash,
  provider,
  changeLoadingStatus,
) => {
  const txReceipt = await provider.getTransactionReceipt(transactionHash);
  if (txReceipt && txReceipt.blockNumber) {
    changeLoadingStatus(false);
  } else {
    window.setTimeout(() => {
      isTransactionMined(transactionHash, provider, changeLoadingStatus);
    }, 2500);
  }
};

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState('');
  const [ethBalance, setEthBalance] = useState('0.0');
  const [cuBalance, setCuBalance] = useState('0.0');
  const [unionID, setUnionID] = useState(null);
  const [loadingScreen, setLoadingScreen] = useState(false);
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
      );
    } catch (error) {
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
      );
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
      );
    } catch (error) {
      console.log(error);

      throw new Error('No ethereum object');
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

  return (
    <WalletContext.Provider
      value={{ connectWallet, disconnectWallet, connectedAccount }}
    >
      <WalletBalanceContext.Provider
        value={{ getEthBalance, getCuBalance, ethBalance, cuBalance }}
      >
        <UnionContext.Provider value={{ unionID, setUnionID }}>
          <SwapContext.Provider
            value={{ ethToCuSwap, cuToEthSwap, approveToken }}
          >
            <TransactionLoadingContext.Provider
              value={{ loadingScreen, setLoadingScreen }}
            >
              {children}
            </TransactionLoadingContext.Provider>
          </SwapContext.Provider>
        </UnionContext.Provider>
      </WalletBalanceContext.Provider>
    </WalletContext.Provider>
  );
};