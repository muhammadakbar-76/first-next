import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
    render(): JSX.Element {
        return(
            <Html>
                <Head>
                    <meta property="custom" content="yolo" />
                </Head>
                <body>
                    <Main />
                </body>
                <NextScript />
            </Html>
        )
    }
}

//use this as minimal as you can since you can do this in pages