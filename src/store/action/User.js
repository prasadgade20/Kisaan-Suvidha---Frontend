import axios from "axios";
import { GET_USER_BY_ID_FAILURE, GET_USER_BY_ID_REQUEST, GET_USER_BY_ID_SUCCESS } from "../constants/user";
export const GetUserById = (values) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_BY_ID_REQUEST });
    const resData = await axios.post(
      `http://localhost:5007/api/user/getUser`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: GET_USER_BY_ID_SUCCESS, payload: resData.data });
  } catch (err) {
    dispatch({ type: GET_USER_BY_ID_FAILURE });
  }
};
