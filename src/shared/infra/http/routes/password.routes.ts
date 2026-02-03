import { ResetPasswordController } from "@modules/accounts/userCases/resetPassword/ResetPasswordController";
import { SendForgotPasswordMailController } from "@modules/accounts/userCases/sendForgotPasswordMail/SendForgotPasswordMailController";

import { Router } from "express";

const passwordRutes = Router()

const sendForgotPasswordMailController = new SendForgotPasswordMailController()
const resetPasswordController = new ResetPasswordController()

passwordRutes.post("/forgot",sendForgotPasswordMailController.handle)
passwordRutes.post("/reset",resetPasswordController.handle)


export {passwordRutes}