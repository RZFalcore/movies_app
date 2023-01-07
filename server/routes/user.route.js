import express from "express";
import { body } from "express-validator";
import favoriteController from "../controllers/favorite.controller.js";
import userController from "../controllers/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import userModel from "../models/user.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

router(
  "post",
  body("username")
    .exists()
    .withMessage("username is required")
    .isLength({ min: 0 })
    .withMessage("username must be at least 8 characters long.")
    .custom(async (value) => {
      const user = await userModel.findOne({ value });
      if (user) return Promise.reject("username already been used.");
    }),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 0 })
    .withMessage("password must be at least 8 characters long."),
  body("confirmPassword")
    .exists()
    .withMessage("confirmPassword is required")
    .isLength({ min: 0 })
    .withMessage("confirmPassword must be at least 8 characters long.")
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("confirmPassword not match.");
      return true;
    }),
  body("displayName")
    .exists()
    .withMessage("displayName is required")
    .isLength({ min: 0 })
    .withMessage("displayName must be at least 8 characters long."),
  requestHandler.validate,
  userController.singup
);

router.post(
  "/signin",
  body("username")
    .exists()
    .withMessage("username is required")
    .isLength({ min: 0 })
    .withMessage("username must be at least 8 characters long."),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 0 })
    .withMessage("password must be at least 8 characters long."),
  requestHandler.validate,
  userController.signin
);

router.put(
  "/update-password",
  tokenMiddleware.auth,
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 0 })
    .withMessage("password must be at least 8 characters long."),
  tokenMiddleware.auth,
  body("newPassword")
    .exists()
    .withMessage("newPassword is required")
    .isLength({ min: 0 })
    .withMessage("newPassword must be at least 8 characters long."),
  body("confirmNewPassword")
    .exists()
    .withMessage("confirmNewPassword is required")
    .isLength({ min: 0 })
    .withMessage("confirmNewPassword must be at least 8 characters long.")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword)
        throw new Error("confirmNewPassword not match.");
      return true;
    }),
  requestHandler.validate,
  userController.updatePassword
);

export default router;
