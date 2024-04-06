import React, { useEffect } from "react";
import { useParams } from "react-router";

import Div from "./Div";
import { GetAllProducts } from "../../store/action/Product";
import { useDispatch, useSelector } from "react-redux";

const CategoryScreenLand = () => {
  const params = useParams();
  const [data, setData] = React.useState([]);
  const [path, setPath] = React.useState("");
  const [productName, setProductName] = React.useState(
    params && params?.name ? params?.name : ""
  );
  const dispatch = useDispatch();
  const { getAllProductData } = useSelector((state) => state.product);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  React.useEffect(() => {
    dispatch(GetAllProducts());
  }, [dispatch]);

  React.useEffect(() => {
    if (
      getAllProductData &&
      getAllProductData.code === 200 &&
      getAllProductData.data &&
      getAllProductData.data.length > 0
    ) {
      setData(getAllProductData.data.filter((d) => d.eType === productName));
      setPath(getAllProductData.path);
    }
  }, [getAllProductData]);

  return (
    <div>
      <h1 className="text-center font-semibold text-dark-green md:pt-20 mobile:pt-28 md:text-2xl mobile:text-[29px]">
        {/* Best of{" "} */}
        {/* {productName !== "" ? productName : "All"} */}
      </h1>
      <br />
      <br />
      <br />
      <p className="text-center md:text-lg mobile:text-[22px] mb-1 text-orange">
        {productName !== ""
          ? data.filter((e) => e.eType === productName).length
          : data.length}{" "}
        Items
        {/* 
        {
          params && params?.name ?
            <></> :
            <select onChange={(e) => setProductName(e.target.value)} className=" md:text-lg mobile:text-[22px] text-center form-select ml-5" aria-label="Default select example">
              <option selected value="">All</option>
              <option value="Tractorattachments">Tractor Attachments</option>
              <option value="smallTools">Hand Held Tools</option>
              <option value="largeTools">Large Tools</option>
            </select>

        } */}
      </p>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5 w-10/12 md:w-11/12 sm:w-11/12 mx-auto">
        {productName !== ""
          ? data
              .filter((e) => e.eType === productName)
              .map((e) => {
                return <Div key={e.iProductId} path={path} data={e} />;
              })
          : data.map((e) => {
              return <Div key={e.iProductId} path={path} data={e} />;
            })}
      </div>
    </div>
  );
};

export default CategoryScreenLand;
