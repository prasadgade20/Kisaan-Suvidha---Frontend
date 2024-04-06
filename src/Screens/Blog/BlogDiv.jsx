import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";

const BlogDiv = ({ data, path }) => {
  const location = useLocation();
  const ref = useRef();
  const history = useNavigate();

  useEffect(() => {
    if (location.pathname.includes("Category")) {
      ref.current.classList.add("w-10/12");
      ref.current.classList.add("mx-auto");
      ref.current.classList.add("my-5");
      ref.current.classList.remove("w-2/12");
    }
  }, [location]);

  return (
    <div
      ref={ref}
      onClick={(e) => {
        history(`/single-blog/${data.iBlogId}`);
      }}
      className="flex flex-col items-center w-11/12 my-2 rounded-md border border-lightest-grey px-2 cursor-pointer transition-all hover:scale-105"
      style={{ minHeight: "250px" }} // Set minimum height for cards
    >
      <img
        src={`${path}${data.vImage}`}
        alt=""
        className="object-cover object-center h-60 rounded-md mt-2 w-full"
      />
      <div className="flex flex-col items-center p-4 w-full">
        <h3 className="text-xl md:text-lg lg:text-xl font-bold">{data?.vTitle}</h3>
        <p className="text-sm md:text-base text-center mt-2">
          {data?.vDescription.slice(0, 100) + "..."}
        </p>
      </div>
    </div>
  );
};

export default BlogDiv;
