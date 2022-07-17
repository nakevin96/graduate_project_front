import { createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';

export const TransactionContext = createContext();

const { ethereum } = window;

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState('');
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
  return (
    <TransactionContext.Provider value={{ connectWallet, connectedAccount, disconnectWallet }}>
      {children}
    </TransactionContext.Provider>
  );
};