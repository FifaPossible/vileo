import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./swiper.module.css";
import { Autoplay, Pagination, Navigation } from "swiper";
import { useQuery } from "@tanstack/react-query";

import { tmdbGet } from "../../utils/requests";
import Loader from "../Loader";

const SliderComponent = () => {
   const { data } = useQuery(["trending"], () =>
      tmdbGet(
         `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      )
   );

   const slide =
      data === undefined || data?.status !== 200 ? (
         <SwiperSlide key={4}>
            <div
               className={`text-2xl flex ${styles.img} items-center justify-center`}
            >
               <Loader />
            </div>
         </SwiperSlide>
      ) : (
         data?.data?.results?.slice(0, 5).map((data: any) => {
            return (
               <SwiperSlide key={data?.index}>
                  <img
                     key={data?.index}
                     className={`object-fill w-full ${styles.img}`}
                     src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                     alt="image slide 1"
                  />
               </SwiperSlide>
            );
         })
      );

   return (
      <div className={`md:mx-10 mb-2 mx-5 ${styles.swiperDiv}`}>
         <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
               delay: 4000,
               disableOnInteraction: false,
            }}
            pagination={{
               clickable: true,
            }}
            navigation={false}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper bg-gray-700"
         >
            {slide}
         </Swiper>
      </div>
   );
};

export default SliderComponent;
