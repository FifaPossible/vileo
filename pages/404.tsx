import { Fragment } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

const PageNotFound = () => {
   const router = useRouter();
   return (
      <Fragment>
         <Navbar current="" />
         <div className="flex items-center justify-center w-full">
            <div className="text-center">
               <p className="text-6xl text-red-800 m-2">404</p>
               <p className="text-4xl text-red-400 m-2">Page Not Found</p>
               <button
                  className="rounded p-2 m-2 bg-indigo-600 text-gray-200"
                  onClick={() => router.push("/")}
               >
                  Go Home
               </button>
            </div>
         </div>
      </Fragment>
   );
};

export default PageNotFound;
