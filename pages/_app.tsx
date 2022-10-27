import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect, Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Footer from "../components/Footer";
import client from "../react-query-client";

function MyApp({ Component, pageProps }: AppProps) {
   const [isVisible, setIsVisible] = useState(false);
   const router = useRouter();

   const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
         setIsVisible(true);
      } else {
         setIsVisible(false);
      }
   };

   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   };

   useEffect(() => {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   }, [router]);

   useEffect(() => {
      window.addEventListener("scroll", toggleVisibility);
      return () => {
         window.removeEventListener("scroll", toggleVisibility);
      };
   }, []);
   return (
      <Fragment>
         <Head>
            <title>Vileo - get information on your desired movie</title>
            <meta
               name="description"
               content="Free website to get information on movies"
            />
            <meta
               name="keywords"
               content="movie, free, information, website, video, rating"
            />
            <meta name="author" content="PossibleTheDev" />
            <link rel="icon" href="/favicon.png" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
               rel="preconnect"
               href="https://fonts.gstatic.com"
               crossOrigin="true"
            />
            <link
               href="https://fonts.googleapis.com/css2?family=Prompt:wght@200&family=Roboto+Serif:ital,opsz,wght@1,8..144,200&family=Sansita+Swashed:wght@900&display=swap"
               rel="stylesheet"
            />
         </Head>
         <QueryClientProvider client={client}>
            <ReactQueryDevtools initialIsOpen />
            <div className="relative">
               <Component {...pageProps} />
               <div
                  onClick={scrollToTop}
                  className={`${
                     isVisible ? "opacity-100" : "opacity-0"
                  } fixed bg-violet-600 p-2 text-whit hover:text-gray-400 bottom-5 right-4 rounded z-10 hover:shadow-md hover:shadow-violet-600`}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="icon icon-tabler icon-tabler-arrow-up"
                     width="30"
                     height="30"
                     viewBox="0 0 24 24"
                     strokeWidth="1.5"
                     stroke="#ffffff"
                     fill="none"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  >
                     <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                     <line x1="12" y1="5" x2="12" y2="19" />
                     <line x1="18" y1="11" x2="12" y2="5" />
                     <line x1="6" y1="11" x2="12" y2="5" />
                  </svg>
               </div>
            </div>
         </QueryClientProvider>
      </Fragment>
   );
}

export default MyApp;
