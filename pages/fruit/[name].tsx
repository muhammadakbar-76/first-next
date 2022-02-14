import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next"
import path from "path";

type DynamicProps = {
    data: {[key: string]: string | number | boolean},
    robot: string
}

//the function name should provided correctly, not like component
//Exe on server, run on build time. it doesn't run at runtime
//in development, this will invoked everytime you refresh, not in production
export const getStaticProps: GetStaticProps = async context => {
    const fs = require('fs');
    const txt = fs.readFileSync(path.join(process.cwd(),"public/robot.txt"), 'utf-8') as string;
    const data = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json());
    return {
        revalidate: 10, //ISR work only on vercel, probably
        props: {
            data,
            robot: txt
        }
    }
}

//getStaticPaths needed for getStaticProps in dynamic page
//process: hit server url, in this case localhost:3000/(aye | anjay) -> take the output -> store in disk

// if fallback is true -> process: localhost:3000/* -> call getStaticProps on server -> render the page -> (background) Next.js would add this to the path lists and would store it locally on the filesystem for faster access -> send the output from filesystem stored

export const getStaticPaths: GetStaticPaths = () => {
    //same as getStaticProp, you can call nodejs stuff in here like db, fs
    return{
        paths: [
        {
            params: {name: "aye"}
        },
        {
            params: {name: "anjay"}
        }
    ],
        fallback: true //if false, only in paths allowed.
    }
}

export default function(props: DynamicProps){
    const router = useRouter();

    if(router.isFallback){
        return <h1>Loading...</h1>
    }

    return(
    <div>
        <h1>dynamic number - {props.data.title}</h1>
        <h1>robot say - {props.robot}</h1>
    </div>
    )
}
