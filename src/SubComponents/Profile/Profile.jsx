import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import db from "../../firebase";
import Category from "../../Components/Category/Category";
import { GetUserById } from "../../store/action/User";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../../store/action/Product";
// import {data} from "../../data"
let username, useremail;
const Profile = ({ children }) => {
  const [data, setnewData] = useState([])
  const history = useNavigate('');
  const dispatch = useDispatch();
  const [path, setPath] = React.useState("")
  const { getUserByIdData } = useSelector(state => state.user)
  const { getAllProductData } = useSelector(state => state.product)

  const handleCart = () => {
    history("/cart");
  }
  React.useEffect(() => {
    if (sessionStorage.getItem("userId"))
      dispatch(GetUserById({ iUserId: sessionStorage.getItem("userId") }))
  }, [dispatch])

  React.useEffect(() => {
    if (!getAllProductData)
      dispatch(GetAllProducts())
  }, [dispatch, getAllProductData])


  React.useEffect(() => {
    if (getAllProductData && getAllProductData.code === 200 && getAllProductData.data && getAllProductData.data.length > 0) {
      setPath(getAllProductData.path)
      setnewData(getAllProductData.data.filter(val => +val.iUserId === +sessionStorage.getItem("userId")))
    }
  }, [getAllProductData])

  useEffect(() => {
    if (!sessionStorage.getItem("userId")) {
      history("/")
    }
  }, [history])

  return (
    <>
      <div className="py-16">
        <div className="p-8 bg-white shadow shadow-xl mt-24">
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-3 my-3 sm:grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    history("/profile/landTools");
                  }}
                  className="text-white my-3 mx-1 py-2 px-1 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-small transition transform hover:-translate-y-0.5"
                >
                  Add Product
                </button>
              </div>
              {/* <div> */}
                {" "}
                {/* <button
                  onClick={(e) => {
                    e.preventDefault();
                    history("/profile/change-password");
                  }}
                  className="text-white my-3 mx-1 py-2 px-1 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-small transition transform hover:-translate-y-0.5"
                >
                  {" "}
                  CHange Password
                </button> */}
              {/* </div>{" "} */}
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    history("/profile/setting");
                  }}
                  className="text-white my-3 mx-2 py-2 px-1 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-small transition transform hover:-translate-y-0.5">
                  Settings
                </button>
                
              </div>{" "}
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    history("/profile/land");
                  }}
                  className="text-white my-3 mx-1 py-2 px-1 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-small transition transform hover:-translate-y-0.5"
                >
                  Add Land
                </button>
              </div>
            </div>{" "}
            <div className="relative">
              {" "}
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {" "}
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>{" "}
            </div>{" "}
            <div className="space-x-10 flex justify-between mt-32 md:mt-0 md:justify-center">
              <button
              onClick={() => history("/product/list")}
              className="text-white h-min py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-small transition transform hover:-translate-y-0.5">
                Product Details
              </button>
              <button onClick={handleCart} className="text-white  h-min py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-small transition transform hover:-translate-y-0.5">
                Cart
              </button>{" "}
            </div>{" "}
          </div>{" "}

          <div className="mt-20 text-center border-b pb-12">

            <h3 className="my-3 text-4xl font-small text-gray-700">
              {getUserByIdData && getUserByIdData.code === 200 && getUserByIdData.data ? `${getUserByIdData.data.vFirstName} ${getUserByIdData.data.vLastName}` : ""} <span className="font-light text-gray-500"></span>
            </h3>
          </div>
          <div className="mt-20 text-center border-b pb-12">
            {" "}

            <h1 className="text-4xl font-small text-gray-700">
              {username} <span className="font-light text-gray-500"></span>
            </h1>{" "}
            <p className="font-light text-gray-600 mt-3">{useremail}</p>{" "}
            <p className="mt-8 text-gray-500 bg-mid border rounded-md">
              Your Equipments
            </p>
          </div>
          <div className="flex overflow-scroll justify-between sm-">{data.map((e, id) => {
            return <Category path={path} key={id} mobile={true} data={e} />
          })
          }</div>

        </div>


      </div>
    </>
  );
};

export default Profile;
