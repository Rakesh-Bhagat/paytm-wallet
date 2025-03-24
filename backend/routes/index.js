import express from "express"
import {userRouter} from "./user.js"
import { accountRouter } from "./account.js";

export const mainRouter = express.Router();

mainRouter.use("/user", userRouter)
mainRouter.use("/account", accountRouter)

// module.exports = router;