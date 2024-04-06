import axios from "axios";
import {
  GET_ALL_CART_PRODUCT_FAILURE,
  GET_ALL_CART_PRODUCT_REQUEST,
  GET_ALL_CART_PRODUCT_SUCCESS,
  GET_ALL_PRODUCT_FAILURE,
  GET_ALL_PRODUCT_REQUEST,
  GET_ALL_PRODUCT_SUCCESS,
} from "../constants/product";

export const GetAllProducts = (values) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PRODUCT_REQUEST });
    const resData = await axios.post(
      `http://localhost:5007/api/products/getAllProducts`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: GET_ALL_PRODUCT_SUCCESS, payload: resData.data });
  } catch (err) {
    dispatch({ type: GET_ALL_PRODUCT_FAILURE });
  }
};

export const GetAllCarts = (values) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CART_PRODUCT_REQUEST });
    const resData = await axios.post(
      `http://localhost:5007/api/cart/getAllCart`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: GET_ALL_CART_PRODUCT_SUCCESS, payload: resData.data });
  } catch (err) {
    dispatch({ type: GET_ALL_CART_PRODUCT_FAILURE });
  }
};
