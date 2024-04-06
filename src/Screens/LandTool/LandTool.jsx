import React, { useState } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { useDispatch } from "react-redux";
import { GetAllProducts } from "../../store/action/Product";
import { useLocation, useNavigate } from "react-router";


const LandTool = () => {
  const [image, setImage] = React.useState()
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [path, setPath] = React.useState("")
  const [productType, setProductType] = React.useState("")
  const [blobImg, setBlobImg] = React.useState("")
  const productValues = {
    vName: "",
    vPrice: "",
    vDescription: "",
    eType: ""
  };
  const [products, setProducts] = React.useState(productValues)
  const productShema = Yup.object().shape({
    vName: Yup.string()
      .required("Product Name is Required."),
    vDescription: Yup.string()
      .required("Desciption is Required.")
      .min(2, "Too Short"),
    vPrice: Yup.string()
      .required("Price is Required."),
    eType: Yup.string("Product Type is Required.")
  });

  const handleImage = (e) => {
    let file = e.target.files[0]
    if (file) {
      setBlobImg(URL.createObjectURL(file));
      setImage(file)
    }
  }

  React.useEffect(() => {
    if (state && state.id) {
      (async function () {
        try {
          const res = await axios.post(
            `http://localhost:5007/api/products/getAllProducts`,
            { iProductId: state.id }
          );
          const { data } = res;
          if (data && data.code === 200) {
            setPath(data.path)
            let product = data?.data[0];
            setImage(product?.vImage)
            setProductType(product.eType)
            setProducts({
              vName: product.vName || "",
              vPrice: product.vPrice || "",
              vDescription: product.vDescription || "",
              eType: product.eType || "smallTools"
            })
          }
        } catch (err) {
          console.log(err)
        }
      })()
    }
  }, [state])

  const handleSubmit = async (values, { resetForm }) => {
    try {
      let formData = new FormData();
      formData.append("vName", values.vName)
      formData.append("vDescription", values.vDescription)
      formData.append("vPrice", values.vPrice)
      formData.append("vImage", image || "")
      formData.append("eType", values.eType || "")
      formData.append("iUserId", sessionStorage.getItem("userId"))
      if (state && state.id) {
        formData.append("iProductId", state.id)
        let res2 = await axios.post(
          `http://localhost:5007/api/products/updateProducts`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
        const { data } = res2;
        if (data && data.code === 200) {
          toast.success(data.message)
          dispatch(GetAllProducts())
          setTimeout(() => {
            navigate("/profile");
          }, 2000);
          resetForm();
        }
      } else {
        const res = await axios.post(
          `http://localhost:5007/api/products/addProducts`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
        const { data } = res;
        if (data && data.code === 200) {
          toast.success(data.message)
          dispatch(GetAllProducts())
          setTimeout(() => {
            navigate("/profile");
          }, 2000);
          resetForm();
        }
      }
    } catch (err) {
      toast.warning(err.response.data.message)
    }
  };

  console.log("state =======", state)
  return (
    <div className="pt-16">
      {sessionStorage.getItem("userId") && <ToastContainer />}

      <div className="my-2">
        <h1 className="font-semibold text-2xl text-dark-green text-center">
          Add Product Here.
        </h1>
        <div className="bg-white border border-green w-1/4 m-auto rounded-xl p-2 mt-20 flex-col flex items-center">
          <img
          src = {blobImg ? blobImg : `${path}${image}`}
            // src={image ? `${path}${image}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8TooAFSc9BmItp4K8LDt5TXM3Znf1-4G2iw7Xmj_KcQ&usqp=CAU&ec=48600112"}
            // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8TooAFSc9BmItp4K8LDt5TXM3Znf1-4G2iw7Xmj_KcQ&usqp=CAU&ec=48600112"
            alt=""
            className="w-5/12 border border-green rounded-full -mt-20"
          />
          <Formik
            enableReinitialize
            initialValues={products}
            validationSchema={productShema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, resetForm }) => (
              <Form>

                <input
                  accept="image/*"
                  type="file"
                  onChange={(e) => handleImage(e)}
                  name=""
                  id=""
                  className="my-2 w-11/12 outline-none rounded-md block px-2 py-0.5 ml-12"
                />

                <label>Product Name : </label>
                <Field
                  className="border rounded-md w-full px-2 py-1 bg-[#feffeb] border-[#1a4d2d]"
                  name="vName" />
                {errors.vName && touched.vName ? (
                  <div style={{ color: "red" }} className="text-danger">{errors.vName}</div>
                ) : null}
                <label>Product Description : </label>
                <Field
                  as="textarea"
                  className="border rounded-md w-full px-2 py-1 bg-[#feffeb] border-[#1a4d2d]"
                  name="vDescription" />
                {errors.vDescription && touched.vDescription ? (
                  <div style={{ color: "red" }} className="text-danger">{errors.vDescription}</div>
                ) : null}


                <label>Product Type : </label>

                <Field name="eType" as="select">
                  <option value="">type</option>
                  <option value="smallTools">Hand Held Tools</option>
                  <option value="largeTools">Large Tools</option>
                  <option value="Tractorattachments">Tractor Attachments</option>
                </Field>
                {errors.eType && touched.eType ? (
                  <div style={{ color: "red" }} className="text-danger">{errors.eType}</div>
                ) : null}


                <br />
                <br />
                <label className="my-2 ">Product Price : </label>

                <Field
                  className="border rounded-md w-full px-2 py-1 bg-[#feffeb] border-[#1a4d2d]"
                  name="vPrice" />
                {errors.vPrice && touched.vPrice ? (
                  <div style={{ color: "red" }} className="text-danger">{errors.vPrice}</div>
                ) : null}

                <button className="my-1 transition-all m-auto">{state && state.id ? "Update Product" : "Add Product"}</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LandTool;
