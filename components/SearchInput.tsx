import { useState, Fragment } from "react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { Transition } from "@headlessui/react";

import { tmdbGet } from "../utils/requests";
const SearchInput = () => {
   const [search, setSearch] = useState("");
   const [open, setOpen] = useState(false);
   const [result, setResult] = useState<any>();
   const mutation = useMutation(
      () =>
         tmdbGet(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${search}`
         ),
      {
         onSuccess: (data: any) => {
            setResult(data);
            setOpen(true);
         },
      }
   );

   const handleInput = (e: any) => {
      setSearch(e.target.value);
   };

   const handleSearch = (e: any) => {
      e.preventDefault();
      if (search?.length > 1) {
         mutation.mutate();
      }
   };

   const searchResult = result?.data?.results?.map((data: any) => {
      return (
         <p
            key={data?.index}
            className="hover:text-gray-400 text-xl text-gray-200 p-1"
            onClick={() => {
               setTimeout(() => {
                  setSearch("");
                  setOpen(false);
               }, 1000);
            }}
         >
            <Link
               href={{
                  pathname: `/movies/searched/${data?.id}`,
                  query: { data: data?.id },
               }}
            >
               {data?.title}
            </Link>
         </p>
      );
   });

   return (
      <Fragment>
         <div className="flex sticky z-10 items-center justify-center w-full h-10">
            <form onSubmit={handleSearch} className="w-full md:mx-10 mx-5 ">
               <input
                  type="search"
                  value={search}
                  onChange={handleInput}
                  placeholder="Search Movie"
                  className="w-full h-10 px-4 rounded text-2xl bg-gray-700 border-gray-700 text-gray-100"
               />
            </form>
         </div>
         <div className="pt-2 mt-2 flex items-center relative justify-center w-full z-10">
            <Transition.Root show={open} as={Fragment}>
               <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
               >
                  <div className="md:mx-10 mx-5 w-full p-2 z-10 rounded text-md bg-gray-700 border-gray-700 text-gray-100">
                     {result?.status === 200 && searchResult}
                     {result !== undefined && result?.status !== 200 && (
                        <p className="text-red-500 text-xl">{result?.data}</p>
                     )}
                     <button
                        className="bg-red-500 p-1 rounded"
                        onClick={() => {
                           setSearch("");
                           setOpen(false);
                        }}
                     >
                        Close
                     </button>
                  </div>
               </Transition.Child>
            </Transition.Root>
         </div>
      </Fragment>
   );
};

export default SearchInput;
