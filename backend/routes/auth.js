import express from "express";
import { hashPassword } from "../middleware/hashPassword.js";
import { PostLoginUser, PostRegisterUser } from "../controller/AuthController.js";
import { emailValidator } from "../middleware/emailValidator.js";


export const authRouter = express.Router()

authRouter.post('/auth/register', [hashPassword, emailValidator], PostRegisterUser)
authRouter.post('/auth/login', PostLoginUser)