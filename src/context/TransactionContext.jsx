import React, { createContext, useEffect, useRef, useState } from 'react';
import { ethers, utils } from 'ethers';
import {
  CUTokenABI,
  CUTokenAddress,
  SwapABI,
  SwapAddress,
} from '../utils/constants';

export const TransactionContext = createContext();

const { ethereum } = window;

const getCUTokenContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const cuTokenContract = new ethers.Contract(
    CUTokenAddress,
    CUTokenABI,
    signer,
  );

  return cuTokenContract;
};

const getSwapContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const swapContract = new ethers.Contract(SwapAddress, SwapABI, signer);

  return swapContract;
};

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState('');
  const [ethBalance, setEthBalance] = useState('0.0');
  const [cuBalance, setCuBalance] = useState('0.0');
  const [unionID, setUnionID] = useState(null);
  const cuBalanceRef = useRef(0);
  const connectWallet = async () => {
    try {
      if (!ethereum) {
        window.open(
          'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko',
        );
        return;
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

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
      const contract = getCUTokenContract();
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
      const contract = getSwapContract();
      const save = await contract.buy({ value: utils.parseEther(ethAmount) });
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
      const cuContract = getCUTokenContract();
      // const a = await cuContract.allowance(connectedAccount, SwapAddress);
      // await getCuBalance();
      // // console.log(a._hex);
      // // console.log(cuBalance);
      // await cuContract.approve(
      //   SwapAddress,
      //   (cuBalanceRef.current * 1e18).toString(),
      //   {
      //     from: connectedAccount,
      //   },
      // );
      const cuSwapAmount = (cuAmount * 1e18).toString();

      const swapContract = getSwapContract();
      await swapContract.sell(cuSwapAmount);
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
    <TransactionContext.Provider
      value={{
        connectWallet,
        connectedAccount,
        disconnectWallet,
        getEthBalance,
        getCuBalance,
        ethBalance,
        cuBalance,
        unionID,
        setUnionID,
        ethToCuSwap,
        cuToEthSwap,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};