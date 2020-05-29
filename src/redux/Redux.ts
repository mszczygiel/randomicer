import { createReducer, createAction } from "typesafe-actions"
import { Mouse } from "../domain/Mouse";

export interface State {
    mice: Mouse[];
}

const MICE_LOADED = "@randomicer/MICE_LOADED";

export interface MiceLoaded {
    mice: Mouse[];
}

export const miceLoaded = createAction(MICE_LOADED)<MiceLoaded>();


const initialState: State = {
    mice: []
};

export type Action = ReturnType<typeof miceLoaded>;

export const reducer = createReducer<State, Action>(initialState).handleType(MICE_LOADED, (state, action) => {
    return { ...state, mice: action.payload.mice };
});
