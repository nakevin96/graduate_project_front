import CUTokenAbi from './contract-abi/CUToken.json';
import SwapAbi from './contract-abi/CUTokenSwap.json';
import UnionAbi from './contract-abi/Union.json';
import UnionFactoryAbi from './contract-abi/UnionFactory.json';
import UserParticipationAbi from './contract-abi/UserParticipationList.json';

// CUToken
export const CUTokenABI = CUTokenAbi.abi;
export const CUTokenAddress = '0xE408df4243198d17FE42C207Fc2E90f0dADd1332';
export const CUTokenSymbol = 'CU';
export const CUTokenDecimals = 18;

// CUTokenSwap
export const SwapABI = SwapAbi.abi;
export const SwapAddress = '0x0e3E900b7ABB2Ccd555E4aDA96A33090dD9b5517';

// Union
export const UnionABI = UnionAbi.abi;

// UnionFactory
export const UnionFactoryABI = UnionFactoryAbi.abi;
export const UnionFactoryAddress = '0xe21e6A94b8d199d2B36a7395f508d1AFde677F06';

// UserParticipation
export const UserParticipationABI = UserParticipationAbi.abi;
export const UserParticipationAddress =
  '0x596BeC0eb5adc4ee891b650be168D7c4aCe62E62';