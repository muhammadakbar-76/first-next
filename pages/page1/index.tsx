import { NextPage } from "next";
import { useState } from "react";
import jwt from 'jsonwebtoken';

const Home: NextPage = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("You are not login");
    const [secret, setSecret] = useState<string>("");

    const submitForm = async () => {
        const res = await fetch("http://localhost:3000/api/login",{
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json());

        const token = res.token;

        if (token) {
            const json = jwt.decode(token) as {[key: string]: string}
            console.log(json);
            setMessage(`You are logged in as ${json.username} and you are ${json.admin ? "admin" : "user"}`);

            const res = await fetch("http://localhost:3000/api/secret",{
            method: "POST",
            body: JSON.stringify({token}),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json());

            console.log(res)

            if(res.secretAdminCode){
                setSecret(res.secretAdminCode);
            } else {
                setSecret(res.message);
            }
        } else {
            setMessage("Something went wrong");
        }
    }

    return(
        <div>
            <h1>{message}</h1>
            <h1>Secret: {secret}</h1>
                <input className="border border-solid rounded" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                <br />
                <input className="border border-solid rounded" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <br />
                <input className="p-2 rounded bg-yellow-200" type="submit" value="submit" onClick={() => submitForm()}/>
        </div>
    )
}

export default Home;