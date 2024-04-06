import { GET_ALL_CART_PRODUCT_FAILURE, GET_ALL_CART_PRODUCT_REQUEST, GET_ALL_CART_PRODUCT_SUCCESS, GET_ALL_PRODUCT_FAILURE, GET_ALL_PRODUCT_REQUEST, GET_ALL_PRODUCT_SUCCESS } from "../constants/product";

 export function Product(state = {}, action) {
    switch (action.type) {
      case GET_ALL_PRODUCT_REQUEST:
      case GET_ALL_CART_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_ALL_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          getAllProductData: action.payload,
        };
        case GET_ALL_CART_PRODUCT_SUCCESS:
          return {
            ...state,
            loading: false,
            getAllCartData: action.payload,
          };
      case GET_ALL_PRODUCT_FAILURE:
      case GET_ALL_CART_PRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  }
  