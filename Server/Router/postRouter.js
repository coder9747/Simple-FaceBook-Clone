import express from "express";
import auth from "../MiddleWare/auth.js";
import {
    createPost,
     readpost, 
     updatePost
    , deletePost, 
    likeupdate, 
    dislikeUpdate,
    addFriendRequest,
     timelistPost,
    acceptFriendRequest,
    getPostById,
    getAllPost,
    deleteFriendRequest,
    fetchUserPostById,
    unfriend,
} from "../Controller/postController.js";


const postRouter = express.Router();



postRouter.put("/accept/:id", [auth, acceptFriendRequest]);
postRouter.delete("/deleterequest/:id",[auth,deleteFriendRequest])
postRouter.post("/createpost", [auth, createPost]);
postRouter.get("/readpost/:id", [readpost]);
postRouter.put("/updatepost/:id", [auth, updatePost]);
postRouter.delete("/deletepost/:id", [auth, deletePost]);
postRouter.post("/likeupdate/:id", [auth, likeupdate]);
postRouter.post("/dislike/:id", [auth, dislikeUpdate]);
postRouter.post("/updaterequest/:id", [auth, addFriendRequest]);
postRouter.get("/timeline", [auth, timelistPost]);
postRouter.get("/getPostById/:id",getPostById);
postRouter.get("/explore",getAllPost);
postRouter.get("/fetchpostbyid/:id",fetchUserPostById);
postRouter.put("/unfriend/:id",[auth,unfriend]);


export default postRouter;