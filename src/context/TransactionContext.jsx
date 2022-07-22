import { createContext, useEffect, useState } from 'react';
import { ethers, utils } from 'ethers';

export const TransactionContext = createContext();

const { ethereum } = window;

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState('');
  const [ethBalance, setEthBalance] = useState('0.0');
  const [unionID, setUnionID] = useState(null);
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
        ethBalance,
        unionID,
        setUnionID,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};