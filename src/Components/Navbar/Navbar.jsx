import React, { useState } from "react";
import Language from "../../SubComponents/Language/Language";
import SearchBar from "../../SubComponents/SearchBar/SearchBar";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { CgProfile } from "react-icons/cg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { BiLogIn } from "react-icons/bi";
// import home from "../../assets/logo_home"
import hLogo from "../../assets/logo_home.png"
import { GetAllProducts } from "../../store/action/Product";

const Navbar = ({ logstatus, handleAuthentication }) => {
  const history = useNavigate();
  const { t } = useTranslation();
  const [home, setHome] = useState(1);

  const handleProfile = () => {
    if (!sessionStorage.getItem("userId")) {
      history("/login")
      return;
    }
    history("/profile")
  }
  return (
    <div
      style={{ position: "fixed", width: "100vw", zIndex: 999 }}
      className="bg-gradient-to-r from-[#0BAB64] to-[#3BB78F] items-center sticky"
    >
      <div className="flex flex-row items-center gap-4 lg:gap-8 text-[#ffffff] px-4 pr-8 md:px-10 lg:px-20 py-2">

        <div
          className="text-xl md:text-2xl font-bold tracking-wide cursor-pointer whitespace-nowrap"
          onClick={() => history("/")}
        >
          {/* <img src="/images/logo.png" /> */}
          {/* Farm <span className="text-[#F0FF42]">Rent</span> */}
        </div>
        <div className="md:hidden w-full"></div>
        <div className="flex flex-row gap-2 cursor-pointer mt-2">
          <span className="pt-0 align-middle"></span>{" "}
        </div>
        <span className="my-2 flex m-0 flex-row gap-2 md:flex">
          <img
            style={{ borderRadius: "50%", cursor: "pointer" }}
            onClick={() => history("/")}
            width={80}
            src={hLogo} alt='' />

          {/* <IoHomeOutline
            onClick={() => history("/")}
            size={23}
            style={{ transform: "translateY(5px) " }} /> */}
        </span>
        <SearchBar additionalClass="hidden md:flex" />
        <Language />
        <AiOutlineShoppingCart
          size={35}
          style={{ transform: "translateY(3px) scale(1.3)" }}
          onClick={() => history(sessionStorage.getItem("userId") ? "/cart" : "/login")}
        />
        <BiLogIn
          className="md:hidden"
          size={35}
          style={{ transform: "translateY(3px) scale(1.3)" }}
          onClick={() => history(logstatus ? "/cart" : "/login")}
        />
        {sessionStorage.getItem("userId") ? (
          <span className="flex m-0 flex-row gap-2 md:flex items-center">
            <CgProfile
              size={30}
              style={{ transform: "translateY(5px) " }}
              onClick={() => handleProfile()}
            />
            {/* <svg
              width="4.7"
              height="8"
              viewBox="0 0 16 27"
              style={{ transform: "rotate(270deg)", marginTop: "15px" }}
              xmlns="http://www.w3.org/2000/svg"
              className="zZ3yfL _2uV9Et hidden lg:flex"
            >
              <path
                d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z"
                fill="#fff"
                className="_2gTTdy"
              ></path>
            </svg> */}
            <button
              className="w-[100px] px-3 py-2"
              onClick={() => {
                history("/category-land/lands")
                dispatch(GetAllProducts())
              }}
            >
              Land
            </button>
            <button
              className="w-[100px] px-3 py-2"
              onClick={() => {
                history("/Category")
                dispatch(GetAllProducts())
              }}
            >
              Tools
            </button>
            <button
              className="w-[106px] px-3 py-2"
              onClick={() => {
                history("/blog")
              }}
            >
              Scheme
            </button>
            <button
              className="w-[106px] px-3 py-2"
              onClick={() => {
                sessionStorage.clear()
                history("/")
              }}
            >
              {t("logout")}
            </button>
          </span>
        ) : (
          <span className="flex flex-row gap-4 hidden  md:flex">
            <button
              className="w-[106px] px-3 py-2"
              onClick={() => {
                history("/Category")
              }}
            >
              Product
            </button>
            <button
              className="w-[106px] px-3 py-2"
              onClick={() => {
                history("/blog")
              }}
            >
              News
            </button>
            <button className="w-[100px]" onClick={() => history("/login")}>
              {t("login")}
            </button>
            <button className="w-[100px]" onClick={() => history("/signup")}>
              {t("signup")}
            </button>
          </span>
        )}
      </div>
      {/* <div className="pb-2 mx-4">
        <SearchBar additionalClass="md:hidden" />
      </div> */}
    </div>
  );
};

export default Navbar;
