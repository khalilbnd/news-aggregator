/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
    theme: string;
}

const initialState: SettingsState = {
    theme: 'light',
};

const SET_THEME = 'SET_THEME';
const SET_LANGUAGE = 'SET_LANGUAGE';

const settingReducer = (state = initialState, action: PayloadAction<any>): SettingsState => {
    switch (action.type) {
        case SET_THEME:
            return {
                ...state,
                theme: action.payload,
            };
        
        default:
            return state;
    }
};

export const setTheme = (theme: string) => ({
    type: SET_THEME,
    payload: theme,
});

export const setLanguage = (language: string) => ({
    type: SET_LANGUAGE,
    payload: language,
});

export default settingReducer;