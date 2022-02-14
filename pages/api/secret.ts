import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';

const KEY = "asdjasdasudoijsaidjsaoidjsao34j2l323oi23";

export default function(req: NextApiRequest, res: NextApiResponse){
    const {token} = req.body;

    const {admin} = jwt.verify(token,KEY) as {[key: string]: string}

    if(admin){
        res.json({
            secretAdminCode: 12345
        })
    } else {
        res.json({message: "who are you"});
    }
}