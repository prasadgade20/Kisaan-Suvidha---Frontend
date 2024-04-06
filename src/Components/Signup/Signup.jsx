import React, { useState } from "react";
// import db from "../../firebase";
//import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router";
//import bcrypt  from "bcryptjs"
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import farmer from "../../assets/farmer1121.jpg";

const Signup = ({ handleAuthentication }) => {
  const navigate = useNavigate();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const singUpValues = {
    vFirstName: "",
    vLastName: "",
    vEmail: "",
    vPassword: "",
    vConfirmPassword: "",
    vPhone: "",
  };
  const [singUpValue, setSignUpValue] = React.useState(singUpValues);
  const [emailExitsErrMsg, setEmailExitsErrMsg] = React.useState("");

  const registerSchema = Yup.object().shape({
    vFirstName: Yup.string()
      .required("First Name is Required.")
      .min(2, "Too Short"),
    vLastName: Yup.string()
      .required("Last Name is Required.")
      .min(2, "Too Short"),
    vEmail: Yup.string().required("Email is Required.").email("Invalid Email."),
    vPassword: Yup.string()
      .required("Password is Required.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-z]+/, "password must contain at least 1 lower case letter")
      .matches(/[A-Z]+/, "password must contain at least 1 upper case letter")
      .matches(
        /[@$!%*#?&]+/,
        "password must contain at least 1 special character"
      )
      .matches(/\d+/, "password must contain at least 1 number"),
    vConfirmPassword: Yup.string().oneOf(
      [Yup.ref("vPassword"), null],
      "confirm password does not match."
    ),

    vPhone: Yup.string()
      .required("Phone is Required.")
      .matches(phoneRegExp, "Phone Number is Invalid."),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post(
        `http://localhost:5007/api/auth/register`,
        values
      );
      const { data } = res;
      if (data && data.code === 200) {
        toast.success(data.message);
        setTimeout(() => {
          navigate("/");
        }, 3000);
        setEmailExitsErrMsg("");
        resetForm();
      }
    } catch (err) {
      toast.warning(err.response.data.message);
      setEmailExitsErrMsg(err.response.data.message);
    }
  };

  return (
    <div className="pt-32 pb-20 bg-[#feffeb] w-full justify-center flex flex-row items-center">
      <div className="img border-l border-t border-b border-indigo-600 rounded-l-md">
        <img src={farmer} className="" alt="" style={{height: "568.35px"}}/>
      </div>
      <div className="py-6 px-10 xl:w-4/12 lg:w-6/12 md:w-7/12 border-r border-t border-b border-indigo-600 w-10/12 rounded-r-md gap-4 flex flex-col bg-gradient-to-b from-[#AFF1DA] to-[#F9EA8F]">
        <h2 className="text-center text-xl font-semibold ">Signup</h2>
        {handleAuthentication && <ToastContainer />}

        {/* formik */}
        <Formik
          initialValues={singUpValue}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, resetForm }) => (
            <Form>
              <>
                <div className="">
                  <label>First Name : </label>
                  <Field
                    className="border rounded-md w-full px-2 py-1 bg-[#feffeb] border-[#1a4d2d]"
                    name="vFirstName"
                  />
                  {errors.vFirstName && touched.vFirstName ? (
                    <div style={{ color: "red" }} className="text-danger">
                      {errors.vFirstName}
                    </div>
                  ) : null}

                  <label>Last Name : </label>
                  <Field
                    className="border rounded-md w-full px-2 py-1 bg-[#feffeb] border-[#1a4d2d]"
                    name="vLastName"
                  />
                  {errors.vLastName && touched.vLastName ? (
                    <div style={{ color: "red" }} className="text-danger">
                      {errors.vLastName}
                    </div>
                  ) : null}
                  <label>Email : </label>
                  <Field
                    className="border rounded-md w-full px-2 py-1 bg-[#feffeb] border-[#1a4d2d]"
                    name="vEmail"
                    type="email"
                  />
                  {errors.vEmail && touched.vEmail ? (
                    
                    <div style={{ color: "red" }} className="text-danger">
                      {errors.vEmail}
                    </div>
                  ) : emailExitsErrMsg !== "" ? (
                    <div style={{ color: "red" }} className="text-danger">
                      {emailExitsErrMsg}
                    </div>
                  ) : null}
                  {/* {(errors.vEmail && touched.vEmail) ||
                  emailExitsErrMsg !== "" ? (
                    <div className="text-danger">
                      {errors.vEmail
                        ? errors.vEmail
                        : emailExitsErrMsg
                        ? emailExitsErrMsg
                        : ""}
                    </div>
                  ) : null} */}
                  <label>Create Password : </label>

                  <Field
                    className="border rounded-md w-full px-2 py-1 bg-[#feffeb] border-[#1a4d2d]"
                    name="vPassword"
                    type="password"
                  />
                  {errors.vPassword && touched.vPassword ? (
                    <div style={{ color: "red" }} className="text-danger">
                      {errors.vPassword}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label>Confirm Password : </label>

                  <Field
                    className="border rounded-md w-full px-2 py-1 bg-[#feffeb] border-[#1a4d2d]"
                    name="vConfirmPassword"
                    type="password"
                  />
                  {errors.vConfirmPassword && touched.vConfirmPassword ? (
                    <div style={{ color: "red" }} className="text-danger">
                      {errors.vConfirmPassword}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label>Phone Number : </label>

                  <Field
                    className="border rounded-md w-full px-2 py-1 bg-[#feffeb] border-[#1a4d2d]"
                    name="vPhone"
                  />
                  {errors.vPhone && touched.vPhone ? (
                    <div style={{ color: "red" }} className="text-danger">
                      {errors.vPhone}
                    </div>
                  ) : null}
                </div>

                <button
                  className="my-2 hover:scale-100 bg-gradient-to-r hover:from-[#fa3c16] hover:to-[#ed8f07] py-2"
                  type="submit"
                  // onClick={(e)=>handleSubmit(e)}
                >
                  Create account
                </button>
              </>
            </Form>
          )}
        </Formik>
        <p className="text-center">Or</p>
        <button
          className="hover:scale-100 hover:bg-gradient-to-r hover:from-[#fa3c16] hover:to-[#ed8f07] py-2"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Signup;
