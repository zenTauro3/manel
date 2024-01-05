export const SET_NAME = "SET_NAME";
export const SET_EMAIL = "SET_EMAIL";
export const SET_PASSWORD = "SET_PASSWORD";

export interface State{
    name: string, 
    email: string,
    password: string
}

export interface Action {
    type: string,
    payload: string
}