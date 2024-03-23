import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { ethers } from 'ethers';

export interface IContractState {
  contract: ethers.BaseContract | null;
}

const initialState: IContractState = { contract: null };

const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    SET_FACTORY_CONTRACT: (state, action) => {
      const { contract } = action.payload;

      state.contract = contract;
    },
    REMOVE_FACTORY_CONTRACT: (state) => {
      state.contract = null;
    },
  },
});

export const { SET_FACTORY_CONTRACT, REMOVE_FACTORY_CONTRACT } =
  contractSlice.actions;

<<<<<<< HEAD
export const getFactoryContract = (state: RootState) => state.contract;
=======
export const getFactoryContract = (state: RootState) => state.signer;
>>>>>>> 8e7727f (Add: client, contract)

export default contractSlice.reducer;
