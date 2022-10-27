import Link from "next/link";
import styles from "./info_card.module.css";

type Card = {
   image: string;
   title: string;
   id: number;
   page: number;
   category: any;
};
const InfoCard = ({ image, title, id, category, page }: Card) => {
   return (
      <div
         className={`max-w-xs rounded bg-gray-700 shadow-md shadow-gray-700 w-full`}
      >
         <div className="">
            <img
               className={`rounded object-fill w-full ${styles.img}`}
               src={image}
               alt={title}
            />
            <div className="p-2">
               <h2 className="text-xl font-bold text-indigo-600">{title}</h2>
               <Link
                  href={{
                     pathname: `/movies/${category}/${id}`,
                     query: { page },
                  }}
               >
                  <button className="p-2 hover:shadow-md text-xl my-2 hover:shadow-purple-700 bg-purple-700 rounded text-gray-100">
                     View movie
                  </button>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default InfoCard;
