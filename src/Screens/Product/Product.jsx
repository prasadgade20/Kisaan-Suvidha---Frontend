import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useParams, useNavigate } from "react-router";
import { GetAllCarts, GetAllProducts } from "../../store/action/Product";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from 'sweetalert2'

const Product = () => {
  const params = useParams();
  const [product, setProduct] = useState();
  const history = useNavigate('');
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const { getAllProductData } = useSelector(state => state.product);
  const [path, setPath] = useState("");

  useEffect(() => {
    if (!getAllProductData)
      dispatch(GetAllProducts());
  }, [dispatch, getAllProductData]);

  useEffect(() => {
    if (getAllProductData && getAllProductData.code === 200 && getAllProductData.data && getAllProductData.data.length > 0) {
      setData(getAllProductData.data);
      setPath(getAllProductData.path);
    }
  }, [getAllProductData]);

  useEffect(() => {
    const e = data.filter((e) => +e.iProductId === +params.name);
    setProduct(e[0]);
  }, [data, params.name]);

  const handleWishList = async (id) => {
    if (!sessionStorage.getItem("userId")) {
      history("/login");
      return;
    }
    if (id) {
      try {
        await axios.post(
          `http://localhost:5007/api/cart/addCart`,
          { iProductId: id, iMonth: count, iUserId: sessionStorage.getItem("userId") },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(GetAllCarts({ iUserId: sessionStorage.getItem('userId') }));
        toast.success("Product successfully added in Cart");
        setCount(1);
        dispatch(GetAllProducts());
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="md:w-9/12 mx-auto py-20">
      {sessionStorage.getItem('userId') && <ToastContainer />}
      <div className="md:flex md:border rounded-md p-6">
        <div className="flex flex-col md:w-1/2">
          <div className="flex flex-row gap-6">
            <img
              src={`${path}${product?.vImage}`}
              className="w-full h-full object-cover object-center mr-4 rounded-xl"
              alt={product?.vName || product?.vAddress}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 md:w-1/2">
          <p className="text-xl font-semibold mx-2">{product?.vName || product?.vAddress}</p>
          <span className="flex bg-yellow-300 w-min px-2 rounded-md mx-2">
            {Math.floor(Math.random() * (5 - 2 + 1)) + 2}{" "}
            <AiFillStar className="mt-1" />
          </span>
          {product?.area &&<span>
             Area - {product?.area} acres
          </span>}
          {product?.waterSupply  == true  ? <span>
             Water Supply Available
          </span> : product?.waterSupply  == false  ? <span>
          Water Supply not Available
          </span> : ""}
          { product?.electricitySupply == true ? <span>
             Electricity Available
          </span> : product?.electricitySupply == false ? <span>
          Electricity not Available
          </span> : ""}
          {product?.availability && <span>
             Land Available for {product?.availability} months
          </span>}
          <p className="text-base">{product?.vDescription && product?.vDescription}</p>
          <p className="text-lg font-bold mx-2">
            Rs. {product?.vPrice * count}{" "}
            <span className="line-through text-gray-600">
              {product?.vAddress ? product?.vPrice * count * 1.25 : product?.vPrice * 1.25}
            </span>
            <span className="text-gray-600 mx-5">
              <button onClick={() => setCount(pre => pre + 1)}>+</button> {count} <button onClick={() => setCount(pre => pre > 1 ? pre - 1 : 1)}>-</button>
            </span> <span>(Per Month Price)</span>
          </p>
          <div className="flex gap-6 text-base whitespace-nowrap md:text-lg">
            {
              product?.eSold === "Rented" ?
                <>
                  <button className="px-3 py-2" disabled={product?.eSold === "Rented"} onClick={() => handleWishList(product.iProductId)}>Add to Rentlist</button>
                  <span style={{ color: "red" }}>Rented</span>
                </>
                :
                <button className="px-3 py-2" onClick={() => handleWishList(product.iProductId)}>Add to Rentlist</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
