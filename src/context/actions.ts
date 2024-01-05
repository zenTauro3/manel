import { SET_NAME, SET_EMAIL, SET_PASSWORD } from "./constants";

export const setName = (payload: string) => ({ type: SET_NAME, payload });
export const setEmail = (payload: string) => ({ type: SET_EMAIL, payload });
export const setPassword = (payload: string) => ({ type: SET_PASSWORD, payload });
