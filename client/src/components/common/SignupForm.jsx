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

const SignupForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const signinForm = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      displayName: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "User name must be at least 8 characters.")
        .required("User name is required."),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters.")
        .required("Password is required."),
      confirmPassword: Yup.string()
        .min(8, "Password must be at least 8 characters.")
        .required("Password is required."),
      displayName: Yup.string()
        .min(8, "Displayed name must be at least 8 characters.")
        .required("Displayed name is required."),
    }),
    onSubmit: async (data) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      console.log("Form submit");
      const { res, err } = await userApi.signup(data);
      setIsLoginRequest(false);

      if (res) console.log(res, err);

      if (res) {
        signinForm.resetForm();
        dispatch(setUser(res));
        dispatch(setAuthModalOpen(false));
        toast.success("Sign in successfully.");
      }

      if (err) setErrorMessage(err.message);
    },
  });
  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="username"
          name="username"
          value={signinForm.values.username}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.username &&
            signinForm.errors.username !== undefined
          }
          helperText={signinForm.touched.username && signinForm.errors.username}
        />
        <TextField
          type="password"
          placeholder="password"
          name="password"
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.password &&
            signinForm.errors.password !== undefined
          }
          helperText={signinForm.touched.password && signinForm.errors.password}
        />
        <TextField
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          value={signinForm.values.confirmPassword}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.confirmPassword &&
            signinForm.errors.confirmPassword !== undefined
          }
          helperText={
            signinForm.touched.confirmPassword &&
            signinForm.errors.confirmPassword
          }
        />
        <TextField
          type="text"
          placeholder="Displayed name"
          name="displayName"
          value={signinForm.values.displayName}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.displayName &&
            signinForm.errors.displayName !== undefined
          }
          helperText={
            signinForm.touched.displayName && signinForm.errors.displayName
          }
        />
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        sign up
      </LoadingButton>

      <Button fullWidth sx={{ marginTop: 1 }} onClick={switchAuthState}>
        sign in
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default SignupForm;
