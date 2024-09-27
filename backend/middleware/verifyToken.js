import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UserModel } from '../model/UserModel.js';

dotenv.config()


export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    console.log(token);
    

    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }        
        UserModel.findById(decoded.user).then((user, e)=>{
            if(e){
                console.log(e);
            }
            req.user = user
            next();
        })
    });
};

