import { createSlice } from "@reduxjs/toolkit"
import { RootState } from '../../app/store';

export enum TorchStatus {
    Doused = 0,
    Dimming = 1,
    Burning = 2,
    Flaring = 3
}

export const TorchDurations = {
    flaring: 500, // .5 second
    burning: 240000, // 4 minutes -> second * 60 * amount of minutes
    dimming: 60000 // 1 minute
};

export interface TorchState {
    status: TorchStatus;
    currentStatusDuration: number;
};

const initialState: TorchState = {
    status: TorchStatus.Doused,
    currentStatusDuration: 0
};

export const torchSlice = createSlice({
    name: 'torch',
    initialState,
    reducers: {
        setStatus: (state, status: {payload: TorchStatus}) => {
            state.status = status.payload;
        }
    }
});

export const { setStatus } = torchSlice.actions;

export const selectTorch = (state: RootState) => state.torch.status;

export default torchSlice.reducer;