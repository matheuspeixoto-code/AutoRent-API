import { Router } from "express";
import { AuthenticateUserController } from "@modules/accounts/userCases/authenticateuser/AuthenticateUserController";
import { RefreshTokenContreller } from "@modules/accounts/userCases/refreshToken/RefreshTokenController";

const authenticateRoutes=Router();
const authenticateUserController = new AuthenticateUserController()
const refreshTokenContreller = new RefreshTokenContreller()

authenticateRoutes.post("/sessions",authenticateUserController.handle)
authenticateRoutes.post("/refresh-token",refreshTokenContreller.handle)

export {authenticateRoutes}