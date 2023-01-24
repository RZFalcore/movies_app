import React, { useState, useEffect } from "react";
import { Box, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../../redux/features/authModalSlice.js";
import Logo from "./Logo";
import SigninForm from "./SigninForm.jsx";

const actionState = {
  signin: "signin",
  signup: "signup",
};

const AuthModal = () => {
  const [action, setAction] = useState(actionState);
  const { authModalOpen } = useSelector((state) => state.authModal);
  const dispatch = useDispatch();

  useEffect(() => {
    authModalOpen && setAction(actionState.signin);
  }, [authModalOpen]);

  const handleCloseModal = (e) => dispatch(setAuthModalOpen(false));

  const switchAuthState = (state) => setAction(state);
  return (
    <Modal open={authModalOpen} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "100%",
          maxWidth: "600px",
          padding: 4,
          outline: "none",
        }}
      >
        <Box
          sx={{
            padding: 4,
            boxShadow: 24,
            backgroundColor: "background.paper",
          }}
        >
          <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
            <Logo />
          </Box>
          {action === actionState.signin && (
            <SigninForm
              switchAuthState={() => switchAuthState(actionState.signup)}
            />
          )}
          {action === actionState.signup && (
            <SigninForm
              switchAuthState={() => switchAuthState(actionState.signin)}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
