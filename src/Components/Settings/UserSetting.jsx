import React, { useState } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { GetUserById } from "../../store/action/User";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const UserSetting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { getUserByIdData } = useSelector(state => state.user)
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const userValues = {
    vFirstName: "",
    vLastName: "",
    vEmail: "",
    vPhone: "",
  };
  const [singUpValue, setSignUpValue] = React.useState(userValues);
  const userSchema = Yup.object().shape({
    vFirstName: Yup.string()
      .required("First Name is Required.")
      .min(2, "Too Short"),
    vLastName: Yup.string()
      .required("Last Name is Required.")
      .min(2, "Too Short"),
    vEmail: Yup.string()
      .required("Email is Required.")
      .email("Invalid Email."),
    vPhone: Yup.string()
      .required("Phone is Required.")
      .matches(phoneRegExp, "Phone Number is Invalid."),
  });

  React.useEffect(() => {
    if (sessionStorage.getItem("userId"))
      dispatch(GetUserById({ iUserId: sessionStorage.getItem("userId") }))
  }, [dispatch])

  React.useEffect(() => {
    if (getUserByIdData && getUserByIdData.code === 200 && getUserByIdData.data) {
      setSignUpValue({
        vFirstName: getUserByIdData.data.vFirstName,
        vLastName: getUserByIdData.data.vLastName,
        vEmail: getUserByIdData.data.vEmail,
        vPhone: getUserByIdData.data.vPhone

      })
    }
  }, [getUserByIdData])

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post(
        `http://localhost:5007/api/user/updateProfile`,
        { ...values, iUserId: sessionStorage.getItem("userId") }
      );
      const { data } = res;
      if (data && data.code === 200) {
        toast.success(data.message)
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
        setEmailExitsErrMsg("");
        resetForm();

      }
    } catch (err) {
      toast.warning(err.response.data.message)
      setEmailExitsErrMsg(err.response.data.message);
    }
  };

  return (
    <div className="pt-16">
      {sessionStorage.getItem("userId") && <ToastContainer />}
      <div className="my-2">
        <h1 className="font-semibold text-2xl text-dark-green text-center">
          User Profile
        </h1>
        <Formik
          enableReinitialize
          initialValues={singUpValue}
          validationSchema={userSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, resetForm }) => (
            <Form>
              <div className="bg-white border border-green w-1/4 m-auto rounded-xl p-2 my-2 flex-col flex items-center">
                <label>First Name : </label>
                <Field
                  className="border rounded-md w-full px-2 py-1 bg-[#feffeb] border-[#1a4d2d]"
                  value={values.vFirstName}
                  name="vFirstName" />
                {errors.vFirstName && touched.vFirstName ? (
                  <div style={{ color: "red" }} className="text-danger">{errors.vFirstName}</div>
                ) : null}

                <label>Last Name : </label>
                <Field
                  className="border rounded-md w-full px-2 py-1 bg-[#feffeb] border-[#1a4d2d]"
                  name="vLastName" />
                {errors.vLastName && touched.vLastName ? (
                  <div style={{ color: "red" }} className="text-danger">{errors.vLastName}</div>
                ) : null}
                <label>Email : </label>
                <Field
                  className="border rounded-md w-full px-2 py-1 bg-[#feffeb] border-[#1a4d2d]"
                  name="vEmail" type="email" />
                {errors.vEmail && touched.vEmail ? (
                  <div style={{ color: "red" }} className="text-danger">{errors.vEmail}</div>
                )
                  :
                  null}
                <label>Phone Number : </label>

                <Field
                  className="border rounded-md w-full px-2 py-1 bg-[#feffeb] border-[#1a4d2d]"
                  name="vPhone" />
                {errors.vPhone && touched.vPhone ? (
                  <div
                    style={{ color: "red" }}

                    className="text-danger">{errors.vPhone}</div>
                ) : null}

                <button className="my-2 transition-all m-auto">Submit</button>
                <Link
                  className="my-2 transition-all m-auto"
                  to={"/profile/change-password"} >Change Password</Link>

              </div>
            </Form>
          )}
        </Formik>
        {/* <button
                  onClick={(e) => {
                    e.preventDefault();
                    history("/profile/change-password");
                  }}
                  className="text-white my-3 mx-1 py-2 px-1 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-small transition transform hover:-translate-y-0.5"
                >
                  {" "}
                  CHange Password
                </button> */}
      </div>
    </div>
  );
};

export default UserSetting;
