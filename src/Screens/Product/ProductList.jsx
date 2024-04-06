import React from "react";
// import { data } from "../../data";
import { GetAllProducts } from "../../store/action/Product";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { useNavigate } from "react-router";

const ProductList = () => {
    const [data, setData] = React.useState([])
    const [path, setPath] = React.useState("")
    const { getAllProductData } = useSelector(state => state.product)
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (!getAllProductData)
            dispatch(GetAllProducts())
    }, [dispatch, getAllProductData])

    React.useEffect(() => {
        if (getAllProductData && getAllProductData.code === 200 && getAllProductData.data && getAllProductData.data.length > 0) {
            setPath(getAllProductData.path)
            setData(getAllProductData.data.filter(val => +val.iUserId === +sessionStorage.getItem("userId")))
        }
    }, [getAllProductData])
    return (
        <div className="w-10/12 m-auto mb-3 pt-5">
            <h1 className="pt-16 text-2xl font-bold text-dark-green">Products List</h1>
            <div className="flex py-2">
                <div className="border border-gray-light w-9/12 mx-2 h-[65vh] rounded-md overflow-scroll">
                    {data.map((item, e) => {
                        return <Card path={path} data={item} />;
                    })}
                </div>
            </div>
        </div>
    );
};


const Card = ({ data, path }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { vName, vImage, vPrice, vDescription, vAddress } = data;
    const handleRemove = async (id) => {
        try {
            const res = await axios.post(
                `http://localhost:5007/api/products/deleteProducts`,
                { iProductId: id }
            );
            const { data } = res;
            if (data && data.code === 200) {
                toast.success(data.message)
                setTimeout(() => {
                    dispatch(GetAllProducts())
                }, 2000)
            }
        } catch (err) {
            toast.warning(err.response.data.message)
        }
    }
    return (
        <div className="h-auto border border-[#f0f0f0] shadow-md flex mx-2 my-3 rounded-xl">
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
                    Rs. {vPrice}{" "}
                    <span className="text-orange line-through">{vPrice * 1.25}</span>
                </p>
            </div>
            <div className="w-4/12 items-center justify-center flex">
                <button onClick={() => {

                    data?.vAddress ? navigate(`/profile/land`, { state: { id: data.iProductId } }) : navigate(`/profile/landTools`, { state: { id: data.iProductId } })
                }} className="transition-all mx-1">Edit</button>
                <button onClick={() => handleRemove(data.iProductId)} className="transition-all"> Remove</button>
            </div>
        </div>
    );
};

export default ProductList;
