import express from "express"
import {Account, User} from "../db.js"
import {JWT_SECRET} from "../config.js";
import zod from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { authMidddleware } from "../middleware.js";

export const userRouter = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string()
})

userRouter.post("/signup", async(req,res) =>{
    const {success} = signupBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Email already taken/ Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({username: req.body.username})

    if(existingUser){
        return res.status(411).json({message: "User already exist"})  
    }

    const hashedPassword =  await bcrypt.hash(req.body.password, 10);
    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });
    await user.save();
    const userId = user._id
    await Account.create({
        userId,
        balance: 1+ Math.random() * 10000
    })
    
    const token = jwt.sign({ userId },JWT_SECRET);

    return res.status(201).json({
        token: token,
        message: "user has been created"
    });


});


const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

userRouter.post("/signin", async(req,res) => {
    const {success} = signinBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: " Incorrect Inputs"

        })
    }

    const username = req.body.username;
    const password = req.body.password;
    console.log(username)
    console.log(password)

    const user = await User.findOne({username: username});

    if(!user){
        return res.status(401).json({message: "invalid username or passwords"})
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword){
        return res.status.send(401).json({message: "wrong password"});
    }

    const token = jwt.sign({username, userId: user._id}, JWT_SECRET);

    return res.status(200).json({
        token: token,
        message: "Logged in"
    })

})


const updateBody = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),

});


userRouter.put("/", authMidddleware, async(req, res) =>{
    const {success} = updateBody.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({ _id: req.userId}, req.body);

    res.json({
        message: "updated successfully"
    })


})

userRouter.get("/bulk", async(req,res) =>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or:[{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            _id: user._id
        }))
    })
})

// module.exports = userRouter;