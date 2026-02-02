import { SendForgotPasswordMailController } from "@modules/accounts/userCases/sendForgotPasswordMail/SendForgotPasswordMailController";

import { Router } from "express";

const passwordRutes = Router()

const sendForgotPasswordMailController = new SendForgotPasswordMailController()

passwordRutes.post("/forgot",sendForgotPasswordMailController.handle)


export {passwordRutes}