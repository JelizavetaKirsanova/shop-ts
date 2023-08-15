import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./config";
import authCredentialsType from "../../types/authCredentialsType";

async function getAddsByCategory(categoryId: any ) {
  const q = query(collection(db, "Ads"), where("category", "==", categoryId));
  const querySnapshot = await getDocs(q);
  let ads: Array<object> = [];
  querySnapshot.forEach((doc) => {
    let ad = {
      id: doc.id,
      title: doc.data().title,
      description: doc.data().description,
      price: doc.data().price,
    };
    ads.push(ad);
  });

  console.log(ads)

  return ads;
}
export default getAddsByCategory;
