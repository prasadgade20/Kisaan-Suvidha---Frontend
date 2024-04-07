import React, { useContext, useEffect, useState } from "react";
import { BsSearch, BsFillMicMuteFill } from "react-icons/bs";
import { MdMic } from "react-icons/md";
import { useTranslation } from "react-i18next";
import Context from "../../Context/Context";
//import { data } from "../../data";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../../store/action/Product";
// import db from "../../firebase";

const SearchBar = ({ additionalClass }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getAllProductData } = useSelector((state) => state.product);
  const [data, setnewData] = useState([]);
  const [path, setPath] = React.useState("");

  React.useEffect(() => {
    if (!getAllProductData) dispatch(GetAllProducts());
  }, [dispatch, getAllProductData]);

  React.useEffect(() => {
    if (
      getAllProductData &&
      getAllProductData.code === 200 &&
      getAllProductData.data &&
      getAllProductData.data.length > 0
    ) {
      setnewData(getAllProductData.data);
      setPath(getAllProductData.path);
    }
  }, [getAllProductData]);

  useEffect(() => {
    async function ofetch() {
      db?.ref("tools/").on("child_added", function (snapshot) {
        const messages = snapshot.val();
        setnewData((data) => [...data, messages]);
      });
    }
    ofetch();
  }, []);
  const contextApi = useContext(Context);

  const [isListening, setIsListening] = useState(false);
  let speechRecognition = new window.webkitSpeechRecognition();

  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.lang = "en-us";

  speechRecognition.onresult = (event) => {
    if (event?.results) {
      const transcript = Array.from(event?.results).map((result) => {
        return result[0].transcript;
      });
      if (transcript.length > 0 && transcript[0]) {
        if (contextApi.prev !== transcript[0].split(".")[0]) {
          contextApi.setSearch(transcript[0].split(".")[0]);
          contextApi.setPrev(transcript[0].split(".")[0]);
        }
      }
    }
  };

  // console.log(contextApi);

  useEffect(() => {
    if (isListening) {
      speechRecognition.start();
    } else {
      speechRecognition.stop();
      speechRecognition.abort();
    }
  }, [isListening]);

  return (
    <div className={`w-full mx-auto mt-1 flex flex-row items-center ${additionalClass}`}>
      <div className="flex flex-row rounded-md w-full  items-center">
        <input
        className="rounded-md w-full px-2 py-1 text-[#000000] outline-0 px-3 py-2"
        type="text"
        placeholder={t("search_placeholder")}
        value={contextApi.search}
        onChange={(e) => {
          contextApi.setSearch(e.target.value);
        }}
      />

        <BsSearch className="relative right-6 text-primary" />
      </div>
      
      <span
        className="pt-1 cursor-pointer text-[#ffffff]"
        onClick={(e) => setIsListening(!isListening)}
      >
        {isListening ? <BsFillMicMuteFill size={25} /> : <MdMic size={25} />}
      </span>
      {contextApi.search || contextApi.search.length > 0 ? (
        <div>
          <div className="md:w-6/12 mobile:w-10/12 md:top-12 items-center flex mobile:top-24 mobile:left-4 md:left-60 absolute bg-white border-dark-green rounded-md grid grid-cols-4 p-3">
            {contextApi.search || contextApi.search?.length > 0
              ? data
                  .filter((e) => {
                    return e?.vName?.toLowerCase()?.includes(contextApi?.search?.toLowerCase());
                  })
                  .map((e) => {
                    return <Component path={path} data={e} />;
                  })
              : null}
            {data.filter((e) => {
              return e?.vName?.toLowerCase()?.includes(contextApi.search?.toLowerCase());
            }).length == 0 ? (
              <p className="text-gray-dark p-0 whitespace-nowrap">
                No Results Found
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const Component = ({ data, path }) => {
  const { vName, price, vImage, iProductId } = data;
  const history = useNavigate();
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        history(`/product/${iProductId}`);
      }}
      className="md:w-3/4 mobile:w-full mobile:px-2 md:px-0 my-2 items-center flex justify-center flex-col"
    >
      <img
        alt=""
        src={`${path}${vImage}`}
        className="rounded-lg m-auto md:h-20 mobile:h-16 object-cover object-center"
      />
      <p className="text-dark-green md:text-base mobile:text-sm font-semibold pl-1 text-center">
        {vName}
      </p>
    </div>
  );
};

export default SearchBar;
