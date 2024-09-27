import jwt from "jsonwebtoken";
import { UserModel } from "../model/UserModel.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config()


export const PostRegisterUser = (req, res)=>{
    const {name, email, password} = req.body
    if(!name || !email || !password){
        return res.status(400).json({msg: 'Please enter all fields'});
    }

    const newUser = new UserModel({
        name,
        email,
        password
    });
    
    newUser.save().then(user=>{
        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            }
        });
    }).catch((error)=>{
        res.status(400).json({msg: 'User already exists'});
    });


}

export const PostLoginUser = (req, res)=>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({msg: 'Please enter all fields'});
    }

    UserModel.findOne({email}).then(async (user)=>{
        if(!user){
            return res.status(400).json({msg: 'User does not exist'});
        }

        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).json({msg: 'Invalid credentials'});
        }

        res.json({
            id: user.id,
            token: jwt.sign({ user: user.id }, process.env.ACCESS_TOKEN, { expiresIn: '10h' })  
        });
    });
}