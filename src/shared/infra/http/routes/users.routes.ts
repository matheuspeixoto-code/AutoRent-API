import { Router } from "express";
import multer from "multer";
import { ensureAutheticated } from "@shared/infra/http/middlewares/ensureAutheticated";

import { CreateUserController } from "@modules/accounts/userCases/Createusers/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/userCases/updateUserAvatar/UpdateUserAvatarController";
import uploadConfig from "@config/upload";

const userRoutes=Router()
const createUserController = new CreateUserController()
const updateUserAvatarController= new UpdateUserAvatarController()

const uploadAvatar=multer(uploadConfig.upload("./tmp/avatar"))

userRoutes.post("/", createUserController.handle)
userRoutes.patch("/avatar",
    ensureAutheticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle)

export {userRoutes}