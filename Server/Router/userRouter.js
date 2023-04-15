import express from "express";
import { registerUser,loginUser,updateUser,deleteUser,findUser} from "../Controller/UserController.js";
import auth from "../MiddleWare/auth.js";

const userRouter = express.Router();

//public routes
userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
//private user 
userRouter.put("/updateuser",[auth,updateUser]);
userRouter.delete("/deleteuser",[auth,deleteUser]);
userRouter.get("/find/:id",findUser);


export default userRouter;