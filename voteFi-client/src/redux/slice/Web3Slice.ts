import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { ethers } from 'ethers';

export interface IWeb3State {
  signer: ethers.Signer | null;
  provider: ethers.Provider | null;
}

const initialState: IWeb3State = { signer: null, provider: null };

const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    SET_SIGNER: (state, action) => {
      const { signer } = action.payload;

      state.signer = signer;
    },
    REMOVE_SIGNER: (state) => {
      state.signer = null;
    },
    SET_PROVIDER: (state, action) => {
      const { provider } = action.payload;

      state.provider = provider;
    },
    REMOVE_PROVIDER: (state) => {
      state.provider = null;
    },
  },
});

export const { SET_SIGNER, REMOVE_SIGNER, SET_PROVIDER, REMOVE_PROVIDER } =
  web3Slice.actions;

export const getSigner = (state: RootState) => state.web3.signer;
export const getProvider = (state: RootState) => state.web3.provider;

export default web3Slice.reducer;
