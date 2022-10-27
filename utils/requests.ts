import axios from "axios";

export const tmdbGet = async (url: string) => {
   try {
      const res = await axios.get(url);
      return { data: res.data, status: res.status };
   } catch (e: any) {
      if (e?.response?.status === 404) {
         return {
            data: e?.response?.data?.status_message,
            status: 404,
         };
      } else {
         return {
            data: "Check your internet connection and try again",
            status: 400,
         };
      }
   }
};
