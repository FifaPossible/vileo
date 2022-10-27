import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@tanstack/react-query";
import Navbar from "../../../components/Navbar";
import { tmdbGet } from "../../../utils/requests";
import styles from "../../../components/cards/info_card.module.css";
import Footer from "../../../components/Footer";

const Movie = () => {
   const [searchedResult, setSearchedResult] = useState<any>(undefined);
   const [ready, setReady] = useState(false);
   const router = useRouter();

   const category = router.query["category"];
   const id = router.query["id"];
   const page = router.query["page"];
   const searchedId = router.query["data"];

   const { data } = useQuery([`fetch ${category}`], () =>
      tmdbGet(
         `https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}`
      )
   );

   const mutation = useMutation(
      () =>
         tmdbGet(
            `https://api.themoviedb.org/3/movie/${searchedId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
         ),
      {
         onSuccess: (data: any) => {
            setSearchedResult(data);
            setReady(true);
         },
      }
   );

   useEffect(() => {
      searchedId !== undefined ? mutation.mutate() : "";
   }, [searchedId]);

   const movie = ready
      ? searchedResult?.data
      : data?.data?.results?.filter((data: any) => data.id == id)[0];
   return (
      <Fragment>
         <Navbar current="" />
         <div className={`md:m-10 m-5 shadow-md shadow-gray-700`}>
            <div className={`grid md:grid-cols-2 gap-1 md:p-3 p-1 grid-cols-1`}>
               <div>
                  <img
                     className={`rounded w-full ${styles.movie_info_img}`}
                     src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                     alt={movie?.title}
                  />
               </div>

               <div>
                  <h1 className={`md:text-5xl text-4xl text-gray-200 mb-3`}>
                     {movie?.title}
                  </h1>
                  <hr />
                  <div className="p-2 flex items-center">
                     <div className="text-2xl mx-2">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="icon icon-tabler icon-tabler-stars"
                           width="44"
                           height="44"
                           viewBox="0 0 24 24"
                           strokeWidth="1.5"
                           stroke="#ffec00"
                           fill="none"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        >
                           <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                           <path d="M17.8 19.817l-2.172 1.138a0.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a0.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a0.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a0.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a0.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" />
                           <path d="M6.2 19.817l-2.172 1.138a0.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a0.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a0.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a0.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a0.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" />
                           <path d="M12 9.817l-2.172 1.138a0.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a0.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a0.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a0.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a0.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" />
                        </svg>
                     </div>
                     <div>
                        <h2 className="text-2xl text-gray-100">
                           {" "}
                           {movie?.vote_average}
                           <span className="text-gray-600 text-xl">/10</span>
                        </h2>
                        <h2 className="text-md text-blue-500">
                           {movie?.vote_count} Reviews
                        </h2>
                     </div>
                  </div>
                  <hr />
                  <div className="p-2">
                     <h2 className="text-4xl text-center text-yellow-300 mb-1">
                        Review
                     </h2>
                     <p className="text-blue-100">{movie?.overview}</p>
                  </div>
               </div>
            </div>
         </div>
         <Footer />
      </Fragment>
   );
};

export default Movie;
