import React, { useState } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { useDispatch } from "react-redux";
import { GetAllProducts } from "../../store/action/Product";
import { useLocation, useNavigate } from "react-router";


const Land = () => {
  const [image, setImage] = React.useState()
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [path, setPath] = React.useState("")
  const [productType, setProductType] = React.useState("")
  const [blobImg, setBlobImg] = React.useState("")
  const productValues = {
    vPrice: "",
    vAddress: "",
    area: "", // Area in hectares
    soilType: "", // Soil type
    waterSupply: "", // Water supply
    electricitySupply: "", // Electricity supply (yes or no)
    availability: "", // Availability of lands in months
  };
  const [products, setProducts] = React.useState(productValues)
  const productSchema = Yup.object().shape({
    // vName: Yup.string()
    //   .required("Product Name is Required."),
    vAddress: Yup.string()
      .required("Address is Required.")
      .min(2, "Too Short"),
    vPrice: Yup.string()
      .required("Price is Required."),
    // eType: Yup.string("Land Type is Required.")
    area: Yup.string().required("Area is Required."),
    soilType: Yup.string().required("Soil Type is Required."),
    waterSupply: Yup.string().required("Water Supply is Required."),
    electricitySupply: Yup.string().required("Electricity Supply is Required."),
    availability: Yup.number().required("Availability Months is Required."),
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
            // setProductType(product.eType)
            setProducts({
              vPrice: product.vPrice || "",
              vAddress: product.vAddress || "",
              area: product.area || "",
              soilType: product.soilType || "",
              waterSupply: product.waterSupply || "",
              electricitySupply: product.electricitySupply || "",
              availability: product.availability || "",

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
      // formData.append("vName", values.vName)
      formData.append("vAddress", values.vAddress)
      formData.append("vPrice", values.vPrice)
      formData.append("area", values.area)
      formData.append("soilType", values.soilType)
      formData.append("waterSupply", values.waterSupply)
      formData.append("electricitySupply", values.electricitySupply)
      formData.append("availability", values.availability)
      formData.append("vImage", image || "")
      formData.append("eType", "lands")
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
          toast.success("Land updated successfully.")
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
          toast.success("Land Created Successfully.")
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

  return (
    <div className="pt-16">
      {sessionStorage.getItem("userId") && <ToastContainer />}

      <div className="my-2">
        <h1 className="font-semibold text-2xl text-dark-green text-center">
          Add Land Here.
        </h1>
        <div className="bg-white border border-green w-96 mx-auto rounded-xl p-4 mt-20 flex-col flex items-center">
          
          <Formik
            enableReinitialize
            initialValues={products}
            validationSchema={productSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, resetForm }) => (
              <Form className="w-full">
                <label htmlFor="vImage" className="my-2">
                  Upload Image
                </label>
                <input
                  accept="image/*"
                  type="file"
                  onChange={(e) => handleImage(e)}
                  className="my-2 w-full outline-none rounded-md px-2 py-1"
                />

                <label className="my-2">Address :</label>
                <Field
                  as="textarea"
                  className="w-full border rounded-md px-2 py-1 bg-gray-100"
                  name="vAddress"
                />
                {errors.vAddress && touched.vAddress && (
                  <div style={{ color: "red" }} className="text-danger">{errors.vAddress}</div>                )}

                <label className="my-2">Area (in acres):</label>
                <Field
                  as="textarea"
                  className="w-full border rounded-md px-2 py-1 bg-gray-100"
                  name="area"
                />
                {errors.area && touched.area && (
                  <div style={{ color: "red" }} className="text-danger">{errors.area}</div>                )}

                <label className="my-2">Soil Type :</label>
                <Field
                  as="textarea"
                  className="w-full border rounded-md px-2 py-1 bg-gray-100"
                  name="soilType"
                />
                {errors.soilType && touched.soilType && (
                  <div style={{ color: "red" }} className="text-danger">{errors.soilType}</div>                )}

                <label className="my-2">Water Supply :</label>
                <div className="flex items-center mb-2">
                  <label className="mr-2">
                    <Field type="radio" name="waterSupply" value="Yes" />
                    Yes
                  </label>
                  <label>
                    <Field type="radio" name="waterSupply" value="No" />
                    No
                  </label>
                </div>
                {errors.waterSupply && touched.waterSupply && (
                  <div style={{ color: "red" }} className="text-danger">{errors.waterSupply}</div>                )}

                <label className="my-2">Electricity Supply :</label>
                <div className="flex items-center mb-2">
                  <label className="mr-2">
                    <Field type="radio" name="electricitySupply" value="Yes" />
                    Yes
                  </label>
                  <label>
                    <Field type="radio" name="electricitySupply" value="No" />
                    No
                  </label>
                </div>
                {errors.electricitySupply && touched.electricitySupply && (
                  <div style={{ color: "red" }} className="text-danger">{errors.electricitySupply}</div>                )}

                <label className="my-2">Availability (in Months):</label>
                <Field
                  type="number"
                  className="w-full border rounded-md px-2 py-1 bg-gray-100"
                  name="availability"
                />
                {errors.availability && touched.availability && (
                  <div style={{ color: "red" }} className="text-danger">{errors.availability}</div>
                )}

                <label className="my-2">Land Price (Per Month in rupees) :</label>
                <Field
                  type="number"
                  className="w-full border rounded-md px-2 py-1 bg-gray-100"
                  name="vPrice"
                />
                {errors.vPrice && touched.vPrice && (
                   <div style={{ color: "red" }} className="text-danger">{errors.vPrice}</div>
                  
                )}

                <button className="my-4 py-2 px-4 bg-green-500 text-white rounded-md transition-all hover:bg-green-600">
                  {state && state.id ? "Update Land" : "Add Land"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Land;
