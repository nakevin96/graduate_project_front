import { createContext, useContext } from 'react';
import { ethers, utils } from 'ethers';
import {
  CUTokenABI,
  CUTokenAddress,
  SwapABI,
  SwapAddress,
} from '../utils/constants';
import { useLoading } from './TransactionContext';
import { useWallet } from './WalletContext';

const SwapContext = createContext('');
const { ethereum } = window;

const getCUTokenContract = () => {
  const cuTokenProvider = new ethers.providers.Web3Provider(ethereum);
  const signer = cuTokenProvider.getSigner();
  const cuTokenContract = new ethers.Contract(
    CUTokenAddress,
    CUTokenABI,
    signer,
  );

  return { cuTokenContract, cuTokenProvider };
};

const getSwapContract = () => {
  const swapProvider = new ethers.providers.Web3Provider(ethereum);
  const signer = swapProvider.getSigner();
  const swapContract = new ethers.Contract(SwapAddress, SwapABI, signer);

  return { swapContract, swapProvider };
};

export function useSwap() {
  return useContext(SwapContext);
}

export const SwapProvider = ({ children }) => {
  const { setLoadingScreen, isTransactionMined } = useLoading();
  const { connectedAccount } = useWallet();

  const ethToCuSwap = async ethAmount => {
    try {
      if (!ethereum) {
        window.open(
          'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko',
        );
        return;
      }
      const { swapContract, swapProvider } = getSwapContract();
      const transaction = await swapContract.buy({
        value: utils.parseEther(ethAmount),
      });
      setLoadingScreen(true);
      await isTransactionMined(
        transaction.hash,
        swapProvider,
        setLoadingScreen,
        null,
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
      const { cuTokenContract } = getCUTokenContract();
      const allowance = await cuTokenContract.allowance(
        connectedAccount,
        SwapAddress,
      );
      const allowanceAmount = parseInt(allowance._hex) / 10 ** 18;
      if (allowanceAmount <= parseInt(cuAmount)) {
        alert('토큰 승인을 먼저 진행해주세요');
        return;
      }
      const cuSwapAmount = (cuAmount * 1e18).toString();

      const { swapContract, swapProvider } = getSwapContract();
      const transaction = await swapContract.sell(cuSwapAmount);
      setLoadingScreen(true);
      await isTransactionMined(
        transaction.hash,
        swapProvider,
        setLoadingScreen,
        null,
        null,
      );
    } catch (error) {
      setLoadingScreen(false);
      console.log(error);

      throw new Error('No ethereum object');
    }
  };
  return (
    <SwapContext.Provider value={{ ethToCuSwap, cuToEthSwap }}>
      {children}
    </SwapContext.Provider>
  );
};