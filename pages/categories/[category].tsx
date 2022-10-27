import { useRouter } from "next/router";
import { Fragment, useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import InfoCard from "../../components/cards/InfoCard";
import Navbar from "../../components/Navbar";
import { tmdbGet } from "../../utils/requests";
import styles from "../../components/cards/info_card.module.css";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";

type MutateData = {
   category: any;
   page: number;
};

const Category = () => {
   const [page, setPage] = useState<number>(1);
   const [result, setResult] = useState<any>(undefined);
   const [loading, setLoading] = useState(true);
   const router = useRouter();
   const category = router.query["category"];

   useEffect(() => {
      setPage(1);
      setResult(undefined);
      setLoading(true);
   }, [category]);

   const { isLoading, isSuccess } = useQuery(
      [`fetch ${category}`],
      async () => {
         return tmdbGet(
            `https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}`
         );
      },
      {
         onSuccess: (data) => {
            setLoading(false);
            setResult(data);
         },
      }
   );

   const mutation = useMutation(
      async (mutateData: MutateData) => {
         return tmdbGet(
            `https://api.themoviedb.org/3/movie/${mutateData.category}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${mutateData.page}`
         );
      },
      {
         onSuccess: (data) => {
            setLoading(false);
            setResult(data);
            if (data.status === 200) {
               setPage(data.data.page);
            }
         },
      }
   );

   const cards = result?.data?.results?.map((data: any) => {
      return (
         <div
            key={data.index}
            className="w-full flex items-center justify-center"
         >
            <InfoCard
               image={`https://image.tmdb.org/t/p/original${data.poster_path}`}
               title={data.title}
               id={data.id}
               page={page}
               category={category}
            />
         </div>
      );
   });

   const loadNextPage = () => {
      setLoading(true);
      mutation.mutate({ category: category, page: page + 1 });
   };

   const loadPrevPage = () => {
      setLoading(true);
      mutation.mutate({ category: category, page: page - 1 });
   };

   return (
      <Fragment>
         <Navbar current={`${category}`} />
         <div className={`md:m-10 m-5`}>
            <div
               className={`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4`}
            >
               {!loading && cards}
            </div>
            {result?.status !== 200 && !loading && (
               <p className="text-red-500 text-xl">{result?.data}</p>
            )}
            {loading && (
               <div
                  className={`w-full flex items-center justify-center ${styles.loader}`}
               >
                  <Loader />
               </div>
            )}
         </div>

         {result !== undefined && result?.status === 200 && (
            <div className="mt-3 flex items-center justify-center">
               <button
                  disabled={page <= 1 ? true : false}
                  onClick={loadPrevPage}
                  className={`hover:shadow-indigo-600 hover:shadow-md mx-5 bg-indigo-600 flex items-center justify-center mb-3 text-gray-100 text-2xl rounded-full ${styles.pagination}`}
               >
                  &lt;
               </button>
               <p className="text-indigo-400 mx-2">Page {page}</p>
               <button
                  disabled={page >= result?.total_pages ? true : false}
                  onClick={loadNextPage}
                  className={`hover:shadow-indigo-600 hover:shadow-md mx-5 bg-indigo-600 flex items-center justify-center mb-3 text-gray-100 text-2xl rounded-full ${styles.pagination}`}
               >
                  &gt;
               </button>
            </div>
         )}
         {!loading && result?.status === 200 && <Footer />}
      </Fragment>
   );
};

export default Category;
