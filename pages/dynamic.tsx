import { GetStaticProps } from "next"
import path from "path";

type DynamicProps = {
    myFavNum: {[key: string]: string | number | boolean}
}

//the function name should provided correctly, not like component
//Exe on server, run on build time. it doesn't run at runtime
export const getStaticProps: GetStaticProps = async context => {
    const fs = require('fs');
    const txt = fs.readFileSync(path.join(process.cwd(),"public/robot.txt"), 'utf-8');
    const data = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json());
    return {
        revalidate: 10, //ISR work only on vercel, probably
        props: {
            myFavNum: data
        }
    }
}

export default function(props: DynamicProps){
    return <h1>dynamic number - {props.myFavNum.title}</h1>
}
