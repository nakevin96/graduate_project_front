import { createContext, useContext, useRef, useState } from 'react';
import { ethers } from 'ethers';
import { CUTokenABI, CUTokenAddress, SwapAddress } from '../utils/constants';
import { useLoading } from './TransactionContext';

const WalletContext = createContext('');
const WalletBalanceContext = createContext('');
const TokenApproveContext = createContext('');

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

export function useWallet() {
  return useContext(WalletContext);
}

export function useWalletBalance() {
  return useContext(WalletBalanceContext);
}

export function useApprove() {
  return useContext(TokenApproveContext);
}

export const WalletProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState('');
  const [ethBalance, setEthBalance] = useState('0.0');
  const [cuBalance, setCuBalance] = useState('0.0');
  const cuBalanceRef = useRef(0);
  const { setLoadingScreen, isTransactionMined } = useLoading();

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

  const getCuBalance = async () => {
    try {
      if (!ethereum) {
        window.open(
          'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko',
        );
        return;
      }
      const { cuTokenContract } = getCUTokenContract();
      const balanceData = await cuTokenContract.balanceOf(connectedAccount);
      const CuBalance = parseInt(balanceData._hex) / 10 ** 18;
      cuBalanceRef.current = CuBalance;
      setCuBalance(CuBalance.toString());
    } catch (error) {
      console.log(error);

      throw new Error('No ethereum object');
    }
  };

  const approveToken = async approveAddress => {
    try {
      if (!ethereum) {
        window.open(
          'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko',
        );
        return;
      }

      const { cuTokenContract, cuTokenProvider } = getCUTokenContract();
      await getCuBalance();
      const transaction = await cuTokenContract.approve(
        approveAddress,
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
        null,
      );
    } catch (error) {
      setLoadingScreen(false);

      throw new Error(`approveToken is Failed.. (${error})`);
    }
  };

  return (
    <WalletContext.Provider
      value={{ connectedAccount, connectWallet, disconnectWallet }}
    >
      <WalletBalanceContext.Provider
        value={{ ethBalance, getEthBalance, cuBalance, getCuBalance }}
      >
        <TokenApproveContext.Provider value={{ approveToken }}>
          {children}
        </TokenApproveContext.Provider>
      </WalletBalanceContext.Provider>
    </WalletContext.Provider>
  );
};