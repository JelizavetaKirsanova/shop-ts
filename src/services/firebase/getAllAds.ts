import { query, collection, getDocs } from "firebase/firestore";
import adType from "../../types/adType";
import { db } from "./config";

async function getAllAds() {
    const q = query(collection(db, "Ads"));
    const querySnapshot = await getDocs(q);
    let ads: adType[] = [];
    querySnapshot.forEach((doc) => {
      let ad = {
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        price: doc.data().price,
        category: doc.data().category,
        image: doc.data().image,
        userId: doc.data().userId,
      };
      ads.push(ad);
    });
  
    console.log(ads);
  
    return ads;
  }
  export default getAllAds;
  