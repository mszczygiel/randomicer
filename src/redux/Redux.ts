import { createReducer, createAction } from "typesafe-actions"
import { Mouse } from "../domain/Mouse";
import { Distribution } from "../domain/Randomizer";

export interface State {
    mice: Mouse[];
    distribution?: Distribution;
    isRunningRandomization: boolean;
}

const MICE_LOADED = "@randomicer/MICE_LOADED";
const RANDOMIZATION_STARTED = "@randomicer/RANDOMIZATION_STARTED";
const SET_DISTRIBUTION = "@randomicer/SET_DISTRIBUTION";

export interface MiceLoaded {
    mice: Mouse[];
}

export const miceLoaded = createAction(MICE_LOADED)<MiceLoaded>();
export const randomizationStarted = createAction(RANDOMIZATION_STARTED)<void>();
export const setDistribution = createAction(SET_DISTRIBUTION)<Distribution>();


const initialState: State = {
    mice: [],
    isRunningRandomization: false
};

export type Action = ReturnType<typeof miceLoaded>
    | ReturnType<typeof setDistribution>
    | ReturnType<typeof randomizationStarted>

export const reducer = createReducer<State, Action>(initialState)
    .handleType(MICE_LOADED, (state, action) => {
        return { ...state, mice: action.payload.mice };
    }).handleType(RANDOMIZATION_STARTED, (state, action) => {
        return { ...state, isRunningRandomization: true }
    })
    .handleType(SET_DISTRIBUTION, (state, action) => {
        return { ...state, distribution: action.payload, isRunningRandomization: false }
    });
