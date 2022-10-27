import Link from "next/link";
import { Fragment, useState } from "react";
import SearchInput from "./SearchInput";

type Current = { current: string };
const Navbar = ({ current }: Current) => {
   const [navbar, setNavbar] = useState(false);

   const closeNavbar = () => {
      setTimeout(() => {
         setNavbar(!navbar);
      }, 500);
   };

   return (
      <Fragment>
         <nav className="w-full bg-gray-800 shadow  sticky z-10 top-0 nav-font">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
               <div>
                  <div className="flex items-center justify-between py-2 md:py-3 md:block">
                     <a href="#">
                        <h2 className="text-2xl text-white font-bold">
                           <span className="text-4xl">📺</span>VILEO
                        </h2>
                     </a>
                     <div className="md:hidden">
                        <button
                           className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                           onClick={() => setNavbar(!navbar)}
                        >
                           {navbar ? (
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="w-6 h-6 text-white"
                                 viewBox="0 0 20 20"
                                 fill="currentColor"
                              >
                                 <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                 />
                              </svg>
                           ) : (
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="w-6 h-6 text-white"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                                 strokeWidth={2}
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                 />
                              </svg>
                           )}
                        </button>
                     </div>
                  </div>
               </div>
               <div>
                  <div
                     className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                        navbar ? "block" : "hidden"
                     }`}
                  >
                     <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                        <li
                           className={`${
                              current === "/"
                                 ? "text-violet-500 rounded"
                                 : "text-white"
                           } hover:text-gray-400`}
                           onClick={closeNavbar}
                        >
                           <Link href="/">Home</Link>
                        </li>
                        <li
                           className={`${
                              current === "popular"
                                 ? "text-violet-500 rounded"
                                 : "text-white"
                           } hover:text-gray-400`}
                           onClick={closeNavbar}
                        >
                           <Link href="/categories/popular">Popular</Link>
                        </li>
                        <li
                           className={`${
                              current === "top_rated"
                                 ? "text-violet-500 rounded"
                                 : "text-white"
                           } hover:text-gray-400`}
                           onClick={closeNavbar}
                        >
                           <Link href="/categories/top_rated">
                              <a>Top Rated</a>
                           </Link>
                        </li>
                        <li
                           className={`${
                              current === "upcoming"
                                 ? "text-violet-500 rounded"
                                 : "text-white"
                           } hover:text-gray-400`}
                           onClick={closeNavbar}
                        >
                           <Link href="/categories/upcoming">
                              <a>Upcoming</a>
                           </Link>
                        </li>
                        <li
                           className={`${
                              current === "recommendation"
                                 ? "text-violet-500 rounded"
                                 : "text-white"
                           } hover:text-gray-400`}
                           onClick={closeNavbar}
                        >
                           <Link href="/categories/recommendation">
                              <a>Recommendation</a>
                           </Link>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>

            <SearchInput />
         </nav>
      </Fragment>
   );
};

export default Navbar;
