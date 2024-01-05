import { SET_NAME, SET_EMAIL, SET_PASSWORD, Action, State } from "./constants";

const initialState = { name: "", email: "", password: "" };

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case SET_NAME:
      return { ...state, name: action.payload };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    default:
      return state;
  }
}
