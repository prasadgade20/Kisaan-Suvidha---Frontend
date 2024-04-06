import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { ToastContainer } from 'react-toastify';

const SingleBlog = () => {
    const params = useParams();
    const [blogs, setBlogs] = React.useState([])
    const [path, setPath] = React.useState("")
    const [url, setUrl] = React.useState("")

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    useEffect(() => {
        const GetAllBlogById = async () => {
            const resData = await axios.post(
                `http://localhost:5007/api/blogs/getAllBlogs`,
                { iBlogId: params.id },

                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const { data } = resData;
            if (data && data.code === 200) {
                setBlogs(data.data[0])
                setPath(data.path)
            }

        }
        try {
            GetAllBlogById();

        } catch (err) {
            console.log(err)
        }
    }, [params.id]);

    // function urlify(text) {
    //     var urlRegex = /(https?:\/\/[^\s]+)/g;
    //     return text?.replace(urlRegex, function (url) {
    //         return '<a target="_blank" href="' + url + '">' + url + '</a>';
    //     })
    //     // or alternatively
    //     // return text.replace(urlRegex, '<a href="$1">$1</a>')
    // }
    function urlify(text) {
        var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
        //var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text?.replace(urlRegex, function (url, b, c) {
            var url2 = (c == 'www.') ? 'http://' + url : url;
            return `<a style="color: blue;" href = ${url2?.replace("'", " ")} target = "_blank" >${url} </a>`
            // return '<a href="' +url2+ '" target="_blank">' + url + '</a>';
        })
    }

    return (
        <div className="md:w-9/12 mx-auto py-20">
            {sessionStorage.getItem('userId') && <ToastContainer />}
            <div className="md:flex md:border rounded-md p-6">
                <div className="flex flex-col md:w-1/2">
                    <div className="flex flex-row gap-6">
                        <img
                            src={`${path}${blogs?.vImage}`}
                            // src={blogs?.vImage}
                            className="w-full h-full object-cover object-center mr-4 rounded-xl"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4 md:w-1/2 mx-5">
                    <p className="text-xl font-semibold">{blogs?.vTitle}</p>
                    <div className="text-base"
                        dangerouslySetInnerHTML={{ __html: urlify(blogs?.vDescription) }}
                    />
                    {/* {urlify(blogs?.vDescription)} </p> */}
                    {/* {blogs?.vDescription}</p> */}

                </div>
            </div>
        </div>
    );
};

export default SingleBlog;
