import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";

const Category = ({ path, mobile, data, children }) => {
  const location = useLocation();
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes("Category")) {
      ref.current.classList.add("w-10/12");
      ref.current.classList.add("mx-auto");
      ref.current.classList.add("my-5");
      ref.current.classList.remove("w-2/12");
    }

  }, [location]);

  const { innerWidth } = window;
  return (
    <div
      ref={ref}
      style={
        mobile === true && innerWidth < 700
          ? { width: "47%", margin: " 0 0.35rem" }
          : {}
      }
      onClick={() => navigate(`/product/${data.iProductId}`)}
      className="items-center flex flex-col self-center w-1/5 md:my-2 mobile:my-8 rounded-md border-1 
      py-2 border-lightest-grey md:mx-2 cursor-pointer transition-all hover:scale-105 shrink-0 mobile:mx-auto px-2"
    >
      <img
        src={`${path}${data?.vImage}`}
        alt=""
        className="mobile:w-full object-cover object-center h-44 rounded-md"
      />
      {/* <img src="C:\project\farmer\api\app\controller../../uploads/1709476317097.jpeg" alt="Girl in a jacket" width="500" height="600"/> */}

      <div className="flex flex-col items-center">
        <h3 className="md:text-xl mobile:text-[22px]">{data?.vName || data?.vAddress}</h3>
        <p className="text-sm text-dark-green">
          Rs. {data?.vPrice}{" "}
          <span className="line-through text-orange">{data?.vPrice * 1.25}</span>
        </p>
        <p className="text-sm text-center px-2">
          {data?.vDescription && data?.vDescription?.slice(0, 75) + "..."}
        </p>
      </div>
    </div>
  );
};

export default Category;
