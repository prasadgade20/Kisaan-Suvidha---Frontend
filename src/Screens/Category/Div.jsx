import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";

const Div = ({ data, path }) => {
  const location = useLocation();
  const ref = useRef();
  const history = useNavigate();

  useEffect(() => {
    if (location.pathname.includes("Category")) {
      ref.current.classList.add("w-full"); // Set full width for equal height cards
      ref.current.classList.add("mx-auto");
      ref.current.classList.add("my-5");
      ref.current.classList.add("md:my-3"); // Added margin for medium screens
      ref.current.classList.remove("w-2/12");
    }
  }, [location]);

  return (
    <div
      ref={ref}
      onClick={(e) => {
        history(`/product/${data?.iProductId}`);
      }}
      className="flex flex-col items-center w-full max-w-xs md:max-w-sm lg:max-w-md my-2 mx-auto rounded-md border border-lightest-grey px-2 cursor-pointer transition-all hover:scale-105 mx-3 md:mx-0" // Added margin for medium screens
    >
      <img
        src={`${path}${data?.vImage}`}
        alt=""
        className="object-cover object-center h-60 w-full rounded-md mt-2"
      />
      <div className="flex flex-col items-center mt-3">
        <h3 className="text-xl md:text-lg font-semibold">{data?.vName || data?.vAddress}</h3>
        <p className="text-sm md:text-base text-dark-green">
          Rs. {data?.vPrice}{" "}
          <span className="line-through text-orange">{data?.vPrice * 1.25}</span>
        </p>
        <p className="text-sm md:text-base text-center px-2">
          {data?.vDescription && data?.vDescription.slice(0, 100) + "..."}
        </p>
      </div>
    </div>
  );
};

export default Div;
