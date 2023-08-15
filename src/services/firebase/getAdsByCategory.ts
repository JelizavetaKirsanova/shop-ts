import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./config";
import authCredentialsType from "../../types/authCredentialsType";
import adType from "../../types/adType";

async function getAdsByCategory(categoryId: string ) {
  const q = query(collection(db, "Ads"), where("category", "==", categoryId));
  const querySnapshot = await getDocs(q);
  let ads: adType[] = [];
  querySnapshot.forEach((doc) => {
    let ad = {
      id: doc.id,
      title: doc.data().title,
      description: doc.data().description,
      price: doc.data().price,
      category: doc.data().category,
      image: doc.data().image
    };
    ads.push(ad);
  });

  console.log(ads)

  return ads;
}
export default getAdsByCategory;
