import React from "react";
// import { data } from "../../data";
import { GetAllCarts, GetAllProducts } from "../../store/action/Product";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { useNavigate } from "react-router";

const Cart = () => {
  const [data, setData] = React.useState([])
  const { getAllCartData } = useSelector(state => state.product)
  const [path, setPath] = React.useState("")
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (sessionStorage.getItem("userId"))
      dispatch(GetAllCarts({ iUserId: sessionStorage.getItem("userId") }))
  }, [dispatch])

  React.useEffect(() => {
    if (getAllCartData && getAllCartData.code === 200 && getAllCartData.data) {
      setData(getAllCartData.data)
      setPath(getAllCartData.path)
    }
  }, [getAllCartData])
  // let productIds = localStorage.getItem("pIds") ? JSON.parse(localStorage.getItem("pIds")) : []
  return (
    <div className="w-10/12 m-auto mb-3 pt-5">
      <h1 className="pt-16 text-2xl font-bold text-dark-green">Cart</h1>
      <div className="flex py-2">
        <div className="border border-gray-light w-9/12 mx-2 h-[65vh] rounded-md overflow-scroll">
          {data.map((item, e) => {
            return <Card data={item} path={path} />;
          })}
        </div>
        {/* <div className="border border-gray-light w-3/12 mx-2 h-[31vh] rounded-md px-2 py-1">
          <h1 className="text-xl font-semibold text-dark-green">Payment</h1>
          <div className="py-1">
            <p>Product Price : Rs. 00</p>
            <p>Tax (18%) : Rs. 00</p>
            <p>Delivery Price : Rs. 00</p>
            <div className="h-[1px] my-1.5 w-4/6 bg-gray-dark"></div>
            <p>Total Price : Rs. 00</p>
            <button className="transition-all my-2">Proceed for Payment</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};


const Card = ({ data, path }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { iMonth, vName, vImage, vPrice, vDescription, vAddress } = data;
  const handleRemove = async (id) => {

    if (id) {
      try {
        await axios.post(
          `http://localhost:5007/api/cart/deleteCart`,
          { iCartId: id },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Remove Item from Cart Successfully.")
        setTimeout(() => {
          dispatch(GetAllCarts({ iUserId: sessionStorage.getItem("userId") }))
        }, 1000)

      } catch (err) {
        console.log(err)
      }

    }

  }
  return (
    <div className="h-auto border border-[#f0f0f0] shadow-md flex mx-2 my-3 rounded-xl justify-space-between">
      {sessionStorage.getItem('userId') && <ToastContainer />}
      <img
        src={`${path}${vImage}`}
        alt=""
        className="object-cover object-center w-3/12 rounded-2xl p-2"
      />
      <div className="flex justify-center flex-col">
        <p className="text-xl pt-1">{vName || vAddress}</p>
        <p className="text-base text-[#555]">
          {vDescription && vDescription?.slice(0, 100) + "..."}
        </p>
        <p className="text-dark-green">
          Rs. {iMonth === 0 ? vPrice : vPrice * iMonth}{" "}
          <span className="text-orange line-through">{iMonth === 0 ? vPrice * 1.25 : vPrice * iMonth * 1.25}</span>
        </p>
      </div>
      <div className="w-4/12 items-center justify-center flex">
        <button onClick={() => handleRemove(data.iCartId)} className="transition-all w-[106px] px-3 py-2"> Remove</button>
        <button className="transition-all mx-2 w-[106px] px-3 py-2" onClick={() => navigate("/payment", {state: data})}>Buy</button>
      </div>
    </div>
  );
};

export default Cart;
