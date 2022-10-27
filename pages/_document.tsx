import Document, { Html, Head, Main, NextScript } from "next/document";

export default class Custom extends Document {
   render() {
      return (
         <Html className="bg-gray-800">
            <Head></Head>
            <body>
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}
