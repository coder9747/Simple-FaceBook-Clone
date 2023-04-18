import postModel from "../Model/post.js";
import userModel from "../Model/userModel.js";

export const createPost = async (req, res) => {
    const userId = req.user._id;
    try {
        if (Object.keys(req.body).length) {
            const post = new postModel({ ...req.body, userId: userId });
            await post.save();
            res.send({
                status: "succes",
                message: "post Succes",
            })
        }
        else {
            res.send({
                status: "error",
                message: "cannot post empty fields"
            })
        }
    } catch (error) {
        res.send({
            status: "error",
            message: error.message
        })
    }

}
export const readpost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postModel.findById(id);
        if (post) {
            res.send({
                status: "succes",
                message: "post find succes",
                data: post,
            })
        }
        else {
            res.send({
                status: "error",
                message: "post not exist"
            })
        }

    } catch (error) {
        res.send({
            status: "error",
            message: "something went wrong"
        })
    }
}
export const updatePost = async (req, res) => {
    const userId = req.user._id;
    const postId = req.params.id;
    try {
        const post = await postModel.findById(postId);
        if (post.userId.toString() === userId.toString()) {
            const updatedPost = await postModel.findByIdAndUpdate(postId, { $set: req.body });
            res.send({
                status: "succes",
                message: "post updated succes",
                post: updatedPost,
            })
        }
        else {
            res.send({
                status: "error",
                message: "cannot update post"
            })
        }
    } catch (error) {
        res.send({
            status: "error",
            message: "something went wrong"
        })
    }
}
export const deletePost = async (req, res) => {
    const userId = req.user._id;
    const postId = req.params.id;
    try {
        const post = await postModel.findById(postId);
        if (post) {
            if (post.userId.toString() === userId.toString()) {
                await postModel.findByIdAndDelete(postId);
                res.send({
                    status: "succes",
                    message: "delted succes"
                })
            }
            else {
                res.send({
                    status: "error",
                    message: "cannot delete post"
                })
            }

        }
        else {
            res.send({
                status: "error",
                message: "post not exist"
            })
        }

    } catch (error) {
        console.log(error);
        res.send({
            status: "error",
            message: "cannot delte post"
        })

    }
}
export const likeupdate = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await postModel.findById(postId);
        if (!post) {
            res.send(
                {
                    status: "error",
                    message: "cannot find post"
                }
            )
        }
        if (post.likes.includes(req.user._id.toString())) {
            post.likes.splice(post.likes.indexOf(req.user._id.toString()), 1);
            await post.save();
            res.send({
                status: "succes",
                message: "post unlike"
            })
        }
        else {
            post.likes.push(req.user._id.toString());
            await post.save();
            res.send({
                status: "succes",
                message: "post like",
            })

        }
    } catch (error) {
        console.log(error)
        res.send({
            status: "error",
            message: "something went wrong"
        })
    }

}
export const dislikeUpdate = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await postModel.findById(postId);
        if (post) {
            if (post.dislike.includes(req.user._id.toString())) {
                post.dislike.splice(post.dislike.indexOf(req.user._id.toString()), 1);
                await post.save();
                res.send({
                    status: "succces",
                    message: "remove disliked post"
                })

            }
            else {
                post.dislike.push(req.user._id.toString());
                await post.save();
                res.send({
                    status: "succes",
                    message: "disliked post"
                })
            }
        }
        else {
            res.send({
                status: "error",
                message: "cannot find post"
            })
        }

    } catch (error) {
        res.send({
            status: "error",
            message: "something went wrong"
        })
    }
}
export const addFriendRequest = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const targetUser = await userModel.findById(id);
        if (targetUser) {
            if (targetUser.friendsRequest.includes(req.user._id.toString())) {
                targetUser.friendsRequest.splice(targetUser.friendsRequest.indexOf(req.user._id.toString()), 1);
                await targetUser.save();
                res.send({
                    status: "succes",
                    message: "friend Request revoked"
                })
            }
            else {
                targetUser.friendsRequest.push(req.user._id.toString());
                await targetUser.save();
                res.send({
                    status: "succes",
                    message: "friend request send"
                })

            }
        }
        else {
            res.send({
                status: "error",
                message: "cannot find user"
            })
        }
    } catch (error) {
        res.send({
            status: "error",
            message: "something went wrong"
        })

    }
}
export const timelistPost = async (req, res) => {
    try {
        const currentUser = await userModel.findById(req.user._id);
        const userAllPost = await postModel.find({ userId: currentUser._id });
        const allpostArray = await Promise.all(currentUser.friends.map((friendId) => {
            return postModel.find({ userId: friendId });
        }))
        let allPost = [...userAllPost];
        allpostArray.map((posts) => {
            allPost = [...allPost, ...posts];
        })
        res.send({
            status: "succes",
            message: "fetched timeline post",
            data: allPost,
        })

    } catch (error) {
        console.log(error.message)
        res.send({
            status: "error",
            message: "something went wrong"
        })
    }
}
export const acceptFriendRequest = async (req, res) => {
    const currentUser = await userModel.findById(req.user._id);
    console.log(req.params.id);
    const friendIdToAccept = req.params.id;
    const userwhoSendRequest = await userModel.findById(friendIdToAccept);
    console.log(currentUser.friendsRequest,friendIdToAccept);
    try {
        if (currentUser.friendsRequest.includes(friendIdToAccept)) {
            currentUser.friendsRequest.splice(currentUser.friendsRequest.indexOf(friendIdToAccept), 1);
            currentUser.friends.push(friendIdToAccept);
            userwhoSendRequest.friends.push(req.user._id.toString());
            userwhoSendRequest.save();
            currentUser.save();
            res.send({
                status: "succes",
                message: "friend request accepted",
            })

        }
        else {
            res.send({
                status: "error",
                message: "cannot detecte request",
            })
        }

    } catch (error) {
        res.send({
            status: "error",
            message: "cannot accept request"
        })
    }
}
export const getPostById = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await postModel.find({ userId: id });
        res.send({
            status: "succes",
            message: "post fetched",
            data: post,
        })
    } catch (error) {
        res.send({
            status: "errror",
            message: "something went wrong"
        })
    }
}
export const getAllPost = async (req, res) => {
    try {
        const allPost = await postModel.find({});
        res.send({
            status: "succes",
            message: "fetched explore post",
            data: allPost,
        })
    } catch (error) {
        res.send({
            status: "error",
            message: "cannot find user",
        })
    }
}
export const deleteFriendRequest = async (req, res) => {
    try {
        const currentUser = await userModel.findById(req.user._id);
        const friendIdToDelete = req.params.id;
        if (currentUser.friendsRequest.includes(friendIdToDelete)) 
        {
            currentUser.friendsRequest.splice(currentUser.friendsRequest.indexOf(friendIdToDelete),1);
            currentUser.save()
            res.send(
                {
                    status:"succes",
                    message:"friend request deleted"
                }
            )

        }
        else {
            res.send({
                status:"error",
                message:"cannot find request with this id"
            })

        }

    } catch (error) {
        res.send({
            status: "error",
            message: "cannot delete request"
        })

    }

}
export const fetchUserPostById = async(req,res)=>{
    try {
        const {id} = req.params;
        const userPosts = await postModel.find({userId:id});
        res.send({
            status:"succes",
            message:"succes fetched posts",
            data:userPosts,
        })
        
    } catch (error) {
        res.send({
            status:"error",
            message:"something went wrong"
        })
    }
}

export const unfriend = async(req,res)=>
{
    try {
        const currentUser = await userModel.findById(req.user._id);
        const userToUnfriend = await userModel.findById(req.params.id);
        currentUser.friends.splice(currentUser.friends.indexOf(req.params.id.toString()),1);
        userToUnfriend.friends.splice(currentUser.friends.indexOf(req.user._id.toString()),1);
        currentUser.save();
        userToUnfriend.save();
        res.send({
            status:"succes",
            message:"friend unfriend Succes",
        })
        
    } catch (error) {
        res.send({
            status:"error",
            message:"something went wrong"
        })
        
    }
}