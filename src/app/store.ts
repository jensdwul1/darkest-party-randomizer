import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import torchReducer from '../components/Torch/torchSlice';
import countReducer from '../features/counter/counterSlice';
export const store = configureStore({
  reducer: {
    torch: torchReducer,
    counter: countReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
