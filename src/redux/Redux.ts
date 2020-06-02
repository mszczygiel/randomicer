import { createReducer, createAction } from "typesafe-actions"
import { Mouse } from "../domain/Mouse";
import { Distribution } from "../domain/Randomizer";

export interface State {
    mice: Mouse[];
    distribution?: Distribution;
}

const MICE_LOADED = "@randomicer/MICE_LOADED";
const SET_DISTRIBUTION = "@randomicer/SET_DISTRIBUTION";

export interface MiceLoaded {
    mice: Mouse[];
}

export const miceLoaded = createAction(MICE_LOADED)<MiceLoaded>();
export const setDistribution = createAction(SET_DISTRIBUTION)<Distribution>();


const initialState: State = {
    mice: []
};

export type Action = ReturnType<typeof miceLoaded>
    | ReturnType<typeof setDistribution>

export const reducer = createReducer<State, Action>(initialState)
    .handleType(MICE_LOADED, (state, action) => {
        return { ...state, mice: action.payload.mice };
    }).handleType(SET_DISTRIBUTION, (state, action) => {
        return { ...state, distribution: action.payload }
    });
