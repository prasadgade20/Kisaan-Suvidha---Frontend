import React from "react";
import { ToastContainer, toast, Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Login = ({ handleAuthentication, setAbout }) => {
  const navigate = useNavigate();
  const initialFormValues = {
    vEmail: "",
    vPassword: "",
  };
  const loginSchema = Yup.object().shape({
    vEmail: Yup.string().required("Email is Required."),
    vPassword: Yup.string().required("Password is Required."),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post(
        `http://localhost:5007/api/auth/login`,
        values
      );
      console.log("resss ",res)
      const { data } = res;
      if (data && data.code === 200) {
        sessionStorage.setItem("userId", data.data.iUserId);
        sessionStorage.setItem("token", data.data.token);
        toast.success(data.message)
        setTimeout(() => {
          navigate("/profile")
        }, 3000)
        resetForm();
      }
    } catch (err) {
      console.log(err)
      toast.warning(err.response.data.message)
    }
  };
  return (
    <div className="pt-32 pb-20 bg-[#feffeb]">
      <div className="py-6 px-10 xl:w-4/12 lg:w-6/12 md:w-7/12 w-10/12 mx-auto border-2 border-[#1a4d2d] rounded-md gap-4 flex flex-col bg-gradient-to-b from-[#AFF1DA] to-[#F9EA8F]">
        <h2 className="text-center text-xl font-semibold">Login</h2>
        <Formik
          initialValues={initialFormValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, resetForm }) => (
            <Form>
              <div>

                <label>Email : </label>
                <Field
                  className="border rounded-md w-full px-2 py-1 bg-[#feffeb] border-[#1a4d2d]"
                  name="vEmail" />
                {errors.vEmail && touched.vEmail ? (
                  <div style={{ color: "red" }}>{errors.vEmail}</div>
                ) : null}
              </div>

              <div>
                <label>Password : </label>
                <Field
                  className="border rounded-md w-full px-2 py-1 bg-[#feffeb] border-[#1a4d2d]"
                  name="vPassword" type="password" />
                {errors.vPassword && touched.vPassword ? (
                  <div style={{ color: "red" }}>{errors.vPassword}</div>
                ) : null}
              </div>
              <button
                type="submit"
                className="my-2 hover:scale-100 hover:from-[#fa3c16] hover:to-[#ed8f07] py-2"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center">Or</p>
        <button
          className="hover:scale-100 hover:bg-gradient-to-r hover:from-[#fa3c16] hover:to-[#ed8f07] py-2"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Create new account
        </button>
        {handleAuthentication && <ToastContainer transition={Slide} />}
      </div>
    </div>
  );
};

export default Login;
