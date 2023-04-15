import userModel from "../Model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (username && email && password) {
        const user = await userModel.findOne({ email: email });
        if (!user) {
            const hash = await bcrypt.hash(password, 10);
            const newUser = new userModel({ ...req.body, password: hash });
            const data = await newUser.save();
            const token = jwt.sign({ userId: data._id }, process.env.key, { expiresIn: "3d" });
            res.send({
                status: "succes",
                message: "user registered Succes",
                data: data,
                token: token,
            })

        }
        else {
            res.send({
                status: "error",
                message: "email allready registered",
            })

        }
    }
    else {
        res.send({
            status: "error",
            message: "All Fields Required"
        })
    }

}
export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        const user = await userModel.findOne({ username: username });
        if (user) {
            const isCorrectPassword = await bcrypt.compare(password, user.password);
            if (isCorrectPassword) {
                const token = jwt.sign({ userId: user._id }, process.env.key, { expiresIn: "1d" });
                res.send({
                    status: "succes",
                    message: "user login succes",
                    data: user,
                    token: token,
                })
            }
            else {
                res.send({
                    status: "error",
                    message: "password not matched",
                })
            }

        }
        else {
            res.send({
                status: "error",
                message: "user not registered",
            })
        }


    }
    else {
        res.send({
            status: "error",
            message: "all Fileds required",
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        await userModel.findByIdAndUpdate(req.user._id, { $set: req.body });
        res.send({
            status: "succes",
            message: "user data update succes",
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: "error",
            message: "something went wrong",
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.user._id);
        res.send({
            status: "succes",
            message: "user deleted succes",
        })
    } catch (error) {
        res.send({
            status: "error",
            message: "something went wrong"
        })
    }
}
export const findUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userModel.findById(id);
        if (user) {
            res.send({
                status: "succes",
                message: "user find succes",
                data: user,
            })

        }
        else
        {
            res.send({
                status:"error",
                message:"cannot find user with this id",
            })
        }

    } catch (error) {
        res.send({
            status: "error",
            message: "cannot find user"
        })

    }
}
