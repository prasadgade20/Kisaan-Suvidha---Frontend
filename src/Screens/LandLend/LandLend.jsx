import React, { useState } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { useNavigate } from "react-router";

const LandLend = () => {
  const navigate = useNavigate();
  const passVal = {
    vPassword: "",
    vConfirmPassword: "",
  };
  const passSchema = Yup.object().shape({
    vPassword: Yup.string()
      .required("Password is Required.")
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-z]+/, 'password must contain at least 1 lower case letter')
      .matches(/[A-Z]+/, 'password must contain at least 1 upper case letter')
      .matches(
        /[@$!%*#?&]+/,
        'password must contain at least 1 special character'
      )
      .matches(/\d+/, 'password must contain at least 1 number'),
    vConfirmPassword: Yup.string()
      .oneOf([Yup.ref('vPassword'), null], 'confirm password does not match.'),

  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post(
        `http://localhost:5007/api/user/resetPass`,
        { ...values, iUserId: sessionStorage.getItem("userId") }
      );
      const { data } = res;
      if (data && data.code === 200) {
        toast.success(data.message)
        setTimeout(() => {
          navigate("/profile");
        }, 3000);
        resetForm();

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
          Change Passwrod
        </h1>
        <div className="bg-white border border-green w-1/4 m-auto rounded-xl p-2 my-2 flex-col flex items-center">

          <Formik
            initialValues={passVal}
            validationSchema={passSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, resetForm }) => (
              <Form>
                <label>New Password : </label>

                <Field
                  className="border rounded-md w-full px-2 py-1 bg-[#feffeb] border-[#1a4d2d]"
                  name="vPassword" type="password" />
                {errors.vPassword && touched.vPassword ? (
                  <div
                    style={{ color: "red" }}

                    className="text-danger">{errors.vPassword}</div>
                ) : null}
                <label>Confirm Password : </label>

                <Field
                  className="border rounded-md w-full px-2 py-1 bg-[#feffeb] border-[#1a4d2d]"
                  name="vConfirmPassword" type="password" />
                {errors.vConfirmPassword && touched.vConfirmPassword ? (
                  <div
                    style={{ color: "red" }}

                    className="text-danger">{errors.vConfirmPassword}</div>
                ) : null}

                <button className="my-2 transition-all m-auto">Submit</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LandLend;
