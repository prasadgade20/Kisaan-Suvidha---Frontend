import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useParams, useNavigate } from "react-router";
// import { data } from "../../data";
import { GetAllCarts, GetAllProducts } from "../../store/action/Product";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Product = () => {
  const params = useParams();
  const [product, setProduct] = useState();
  const history = useNavigate('');
  const dispatch = useDispatch();
  const [count, setCount] = React.useState(1)
  const [data, setData] = React.useState([])
  const { getAllProductData } = useSelector(state => state.product)
  const [path, setPath] = React.useState("")

  React.useEffect(() => {
    if (!getAllProductData)
      dispatch(GetAllProducts())
  }, [dispatch, getAllProductData])

  React.useEffect(() => {
    if (getAllProductData && getAllProductData.code === 200 && getAllProductData.data && getAllProductData.data.length > 0) {
      setData(getAllProductData.data)
      setPath(getAllProductData.path)
    }
  }, [getAllProductData])

  const handlerent = () => {
    if (!sessionStorage.getItem("userId")) {
      history("/login")
      return
    }
    history("/profile/rentnow")
  }
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  // const product = {
  //   title: "Spartan Thunder Football - Size: 5  (Pack of 1)",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque iaculis facilisis mi sed fermentum. Pellentesque aliquam nibh felis, eget luctus quam vulputate a. Aliquam ex eros, sodales sed egestas a, rutrum id est. Cras et ex id metus dapibus tincidunt non vel augue. Curabitur eget egestas dolor, eu blandit sapien.",
  //   images: [
  //     "https://rukminim1.flixcart.com/image/416/416/xif0q/ball/g/e/h/350-thunder-5-50-1-sb-5018-football-spartan-original-imaggey8ntdtrajj.jpeg?q=70",
  //     "https://rukminim1.flixcart.com/image/416/416/xif0q/ball/t/m/6/350-thunder-5-50-1-sb-5018-football-spartan-original-imaggjftyjwpx4ky.jpeg?q=70",
  //     "https://rukminim1.flixcart.com/image/416/416/xif0q/ball/o/e/w/350-thunder-5-50-1-sb-5018-football-spartan-original-imaggey8u5cuvggv.jpeg?q=70",
  //     "https://rukminim1.flixcart.com/image/416/416/xif0q/ball/o/r/j/350-thunder-5-50-1-sb-5018-football-spartan-original-imaggey8zzhqzqwx.jpeg?q=70",
  //     "https://rukminim1.flixcart.com/image/416/416/xif0q/ball/a/x/q/350-thunder-5-50-1-sb-5018-football-spartan-original-imaggey8v47nzdx2.jpeg?q=70",
  //   ],
  //   original_price: "₹450",
  //   offer_percentage: "36",
  //   offer_price: "₹286",
  //   rating: "4.5",
  // };

  useEffect(() => {
    const e = data.filter((e) => +e.iProductId === +params.name);
    setProduct(e[0]);
  }, [data, params.name]);

  const handleWishList = async (id) => {
    if (!sessionStorage.getItem("userId")) {
      history("/login")
      return
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
        dispatch(GetAllCarts({ iUserId: sessionStorage.getItem('userId') }))
        toast.success("Product sucessfully added in Cart")
        setCount(1)
        dispatch(GetAllProducts())

      } catch (err) {
        console.log(err)
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
              // src={product?.vImage}
              className="w-full h-full object-cover object-center mr-4 rounded-xl"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 md:w-1/2">
          <p className="text-xl font-semibold mx-2">{product?.vName || product?.vAddress}</p>
          <span className="flex bg-[#fcf403] w-min px-2 rounded-md mx-2">
            {Math.floor(Math.random() * (5 - 2 + 1)) + 2}{" "}
            <AiFillStar className="mt-1" />
          </span>
          <p className="text-base">{product?.vDescription && product?.vDescription}</p>
          <p className="text-lg font-bold mx-2">
            Rs. {product?.vPrice * count}{" "}
            <span className="line-through text-gray-dark">
              {product?.vAddress ? product?.vPrice * count * 1.25 : product?.vPrice * 1.25}
              {/* {
                product?.vAddress ?
                <>
                <button>+</button> {"1"} <button>-</button>
                </>
                : <></>
              } */}
            </span>
            <span className="text-gray-dark mx-5">
                    <button onClick={() => setCount(pre => pre + 1)}>+</button> {count} <button onClick={() => setCount(pre => pre > 1 ? pre - 1 : 1)}>-</button>
            </span> <span>
              (Per Month Price)
            </span>
          </p>
          <div className="flex gap-6 text-base whitespace-nowrap md:text-lg">
            {
              product?.eSold === "Rented" ?
                <>
                  <button disabled={product?.eSold === "Rented" ? true : false} onClick={() => handleWishList(product.iProductId)}>Add to Rentlist</button>
                  <span style={{ color: "red" }}>Rented</span>
                </>
                :
                <button onClick={() => handleWishList(product.iProductId)}>Add to Rentlist</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
