// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';

type Data = {
  name ?: string,
  token ?: string
}

const KEY = "asdjasdasudoijsaidjsaoidjsao34j2l323oi23";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!req.body) {
    res.statusCode = 404;
    res.end("Error");
    return
  }
   const {username, password} = req.body;

   res.json({
     token: jwt.sign({
       username,
       admin: username === "admin" && password === "admin"
     },KEY)
   });
  // res.status(200).setHeader("Set-Cookie","programmer=true").json({name: 'John Doe'});
}
