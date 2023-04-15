import jwt from "jsonwebtoken";
import userModel from "../Model/userModel.js";

const auth = async(req,res,next)=>
{
    const {authorization} = req.headers;
    if(authorization && authorization.startsWith("Bearer"))
    {
        const token = authorization.split(" ").at(1);
        try {
            const {userId} = jwt.verify(token,process.env.key);
            const user = await userModel.findById(userId);
            if(user)
            {
                req.user = user;
                next();
            }
            else
            {
                res.send({
                    status:"error",
                    message:"user does not exist",
                })
            }
           
        } catch (error) {
            res.send({
                status:"error",
                message:"something went wrong"
            })
        }
    }
    else
    {
        res.send({
            status:"error",
            message:"unauthorized",
        })
    }
}
export default auth;