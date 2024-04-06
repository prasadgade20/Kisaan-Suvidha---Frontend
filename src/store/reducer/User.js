import { GET_USER_BY_ID_FAILURE, GET_USER_BY_ID_REQUEST, GET_USER_BY_ID_SUCCESS } from "../constants/user";

export function User(state = {}, action) {
  switch (action.type) {
    case GET_USER_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        getUserByIdData: action.payload,
      };
 
    case GET_USER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
