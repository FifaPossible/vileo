import { Fragment } from "react";
import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import HomeSlide from "../components/HomeSlide";
import Footer from "../components/Footer";

const Home: NextPage = () => {
   return (
      <Fragment>
         <Navbar current="/" />
         <div className="text-5xl flex items-center justify-center mt-10">
            <div className="text-white  p-1">
               <div className="text-center mb-2">Welcome to Vileo</div>
               <div className="text-2xl text-center text-gray-300  p-1 mt-2 mb-3">
                  Get information on any movie you desire
               </div>
            </div>
         </div>
         <HomeSlide />
         <div className="flex items-center justify-center text-gray-400 text-2xl">
            <div className="p-3 mx-4 text-center">
               Navigate to any category or search movie to get information
            </div>
         </div>
         <Footer />
      </Fragment>
   );
};

export default Home;
