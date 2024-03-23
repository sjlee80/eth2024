import { combineReducers, configureStore } from '@reduxjs/toolkit';
import Web3Slice from '@/redux/slice/Web3Slice';
import ContractSlice from '@/redux/slice/ContractSlice';

const rootReducer = combineReducers({
  web3: Web3Slice,
  contract: ContractSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
