import express from "express";
import auth from "../MiddleWare/auth.js";
import {
    createPost, readpost, updatePost
    , deltePost, likeupdate, dislikeUpdate,
    addFriendRequest, timelistPost,
    acceptFriendRequest,getPostById,getAllPost
} from "../Controller/postController.js";


const postRouter = express.Router();



postRouter.put("/accept/:id", [auth, acceptFriendRequest])
postRouter.post("/createpost", [auth, createPost]);
postRouter.get("/readpost/:id", [readpost]);
postRouter.put("/updatepost/:id", [auth, updatePost]);
postRouter.delete("/deletepost/:id", [auth, deltePost]);
postRouter.post("/likeupdate/:id", [auth, likeupdate]);
postRouter.post("/dislike/:id", [auth, dislikeUpdate]);
postRouter.post("/updaterequest/:id", [auth, addFriendRequest]);
postRouter.get("/timeline", [auth, timelistPost]);
postRouter.get("/getPostById/:id",getPostById);
postRouter.get("/explore",getAllPost);


export default postRouter;