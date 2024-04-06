import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { GetAllProducts } from "../../store/action/Product";
import { useLocation, useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./LandTool.css";

const LandTool = () => {
  const [image, setImage] = useState();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [path, setPath] = useState("");
  const [blobImg, setBlobImg] = useState("");

  const initialValues = {
    vName: "",
    vPrice: "",
    vDescription: "",
    eType: "",
    availableDuration: "",
    ageOfEquipment: "",
    manufacturer: "",
    vImage: null,
  };

  const productSchema = Yup.object().shape({
    vName: Yup.string().required("Product Name is Required."),
    vDescription: Yup.string().required("Description is Required.").min(2, "Too Short"),
    vPrice: Yup.number()
      .required("Price is Required.")
      .integer("Price must be an integer")
      .typeError("Price must be a number"),
    eType: Yup.string().required("Product Type is Required."),
    availableDuration: Yup.string(),
    ageOfEquipment: Yup.number().required("Age of Equipment is Required.").positive("Age should be positive"),
    manufacturer: Yup.string().required("Manufacturer is Required."),
    vImage: Yup.mixed().required("Image is Required"),
  });

  const handleImage = (e) => {
    let file = e.target.files[0];
    if (file) {
      setBlobImg(URL.createObjectURL(file));
      setImage(file);
    }
  };

  React.useEffect(() => {
    if (state && state.id) {
      (async function () {
        try {
          const res = await axios.post(`http://localhost:5007/api/products/getAllProducts`, { iProductId: state.id });
          const { data } = res;
          if (data && data.code === 200) {
            setPath(data.path);
            let product = data?.data[0];
            setImage(product?.vImage);
          }
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [state]);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      let formData = new FormData();
      formData.append("vName", values.vName);
      formData.append("vDescription", values.vDescription);
      formData.append("vPrice", values.vPrice);
      formData.append("vImage", values.vImage || "");
      formData.append("eType", values.eType || "");
      formData.append("availableDuration", values.availableDuration || "");
      formData.append("ageOfEquipment", values.ageOfEquipment || "");
      formData.append("manufacturer", values.manufacturer || "");
      formData.append("iUserId", sessionStorage.getItem("userId"));
      if (state && state.id) {
        formData.append("iProductId", state.id);
        let res2 = await axios.post(`http://localhost:5007/api/products/updateProducts`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const { data } = res2;
        if (data && data.code === 200) {
          toast.success(data.message);
          dispatch(GetAllProducts());
          setTimeout(() => {
            navigate("/profile");
          }, 2000);
          resetForm();
        }
      } else {
        const res = await axios.post(`http://localhost:5007/api/products/addProducts`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const { data } = res;
        if (data && data.code === 200) {
          toast.success(data.message);
          dispatch(GetAllProducts());
          setTimeout(() => {
            navigate("/profile");
          }, 2000);
          resetForm();
        }
      }
    } catch (err) {
      toast.warning(err.response.data.message);
    }
  };

  return (
    <div className="pt-16">
      {sessionStorage.getItem("userId") && <ToastContainer />}
      <div className="my-2">
        <h1 className="font-semibold text-2xl text-dark-green text-center my-5">Add Product Here.</h1>
        <div className="form-container">
          <Formik initialValues={initialValues} validationSchema={productSchema} onSubmit={handleSubmit}>
            {({ values, errors, touched, setFieldValue }) => (
              <Form>
                <label htmlFor="vImage" className="image-upload-label">
                  Choose Image
                </label>
                <input
                  id="vImage"
                  name="vImage"
                  type="file"
                  onChange={(e) => {
                    handleImage(e);
                    setFieldValue("vImage", e.currentTarget.files[0]);
                  }}
                  className="image-upload-input"
                />
                {errors.vImage && touched.vImage ? <div className="error-message">{errors.vImage}</div> : null}

                <label htmlFor="vName">Product Name :</label>
                <Field type="text" name="vName" className="input-field" />
                {errors.vName && touched.vName ? <div className="error-message">{errors.vName}</div> : null}

                <label htmlFor="vDescription">Product Description :</label>
                <Field as="textarea" name="vDescription" className="input-field" />
                {errors.vDescription && touched.vDescription ? (
                  <div className="error-message">{errors.vDescription}</div>
                ) : null}

                <label htmlFor="eType">Product Type :</label>
                <Field as="select" name="eType" className="input-field">
                  <option value="">type</option>
                  <option value="smallTools">Hand Held Tools</option>
                  <option value="largeTools">Large Tools</option>
                  <option value="Tractorattachments">Tractor Attachments</option>
                </Field>
                {errors.eType && touched.eType ? <div className="error-message">{errors.eType}</div> : null}

                <label htmlFor="availableDuration">Availability :</label>
                <DatePicker
                  id="availableDuration"
                  name="availableDuration"
                  selected={values.availableDuration}
                  onChange={(date) => setFieldValue("availableDuration", date)}
                  className="input-field"
                  dateFormat="MM/dd/yyyy"
                />
                {errors.availableDuration && touched.availableDuration ? (
                  <div className="error-message">{errors.availableDuration}</div>
                ) : null}

              <div className="input-group">
                <label htmlFor="ageOfEquipment">Age of Equipment (months):</label>
                <Field type="number" name="ageOfEquipment" className="input-field" />
              </div>
              {errors.ageOfEquipment && touched.ageOfEquipment ? (
                <div className="error-message">{errors.ageOfEquipment}</div>
              ) : null}


                <label htmlFor="manufacturer">Manufacturer:</label>
                <Field as="select" name="manufacturer" className="input-field">
                  <option value="">Select Manufacturer</option>
                  <option value="MAHINDRA">Mahindra</option>
                  <option value="TATA">Tata</option>
                  <option value="FORCE">Force</option>
                  <option value="OTHERS">Others</option>
                </Field>
                {errors.manufacturer && touched.manufacturer ? (
                  <div className="error-message">{errors.manufacturer}</div>
                ) : null}

                <label htmlFor="vPrice">Product Price :</label>
                <Field type="text" name="vPrice" className="input-field" />
                {errors.vPrice && touched.vPrice ? <div className="error-message">{errors.vPrice}</div> : null}

                <button type="submit" className="submit-button">
                  {state && state.id ? "Update Product" : "Add Product"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LandTool;
