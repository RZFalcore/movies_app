import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import userApi from "../../api/modules/user.api.js";
import { setAuthModalOpen } from "../../redux/features/authModalSlice.js";
import { setUser } from "../../redux/features/userSlice.js";

const SigninForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();
    const [isLoginRequest, setIsLoginRequest] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const signinForm = useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: Yup.object({
        username: Yup.string()
          .min(8, "User name must be at least 8 characters.")
          .required("User name is required."),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters.")
          .required("Password is required."),
      }),
      onSubmit: async (data) => {
        setErrorMessage(undefined);
        setIsLoginRequest(true);

        const { res, err } = await userApi.signin(data);
        setIsLoginRequest(false);

        if (res) {
          signinForm.resetForm();
          dispatch(setUser(res));
          dispatch(setAuthModalOpen(false));
          toast.success("Sign in successfully.");
        }

        if (err) setErrorMessage(err.message);
      },
    });
  return <>Sign in</>;
};

export default SigninForm;
