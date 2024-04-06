import React, { useEffect } from "react";
import BlogDiv from "./BlogDiv";
import axios from "axios";

const Blog = () => {
    const [data, setData] = React.useState([])
    const [path, setPath] = React.useState("")

    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    React.useEffect(() => {
        const GetAllBlogs = async () => {
            const resData = await axios.post(
                `http://localhost:5007/api/blogs/getAllBlogs`,

                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const { data } = resData;
            if (data && data.code === 200) {
                console.log(data.data)
                setData(data.data)
                setPath(data.path)
            }

        }
        try {
            GetAllBlogs();

        } catch (err) {
            console.log(err)
        }
    }, [])

    return (
        <div>
            <h1 className="text-center font-semibold text-dark-green md:pt-20 mobile:pt-28 md:text-2xl mobile:text-[29px]">
                GOV Scheme
            </h1>
            <p className="text-center md:text-lg mobile:text-[22px] mb-1 text-orange">
                {data.length} Items
            </p>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 w-10/12 md:w-11/12 sm:w-11/12 mx-auto">
                {data.map((e) => {
                    return <BlogDiv path={path} data={e} />;
                })}
            </div>
        </div>
    );
};

export default Blog;
