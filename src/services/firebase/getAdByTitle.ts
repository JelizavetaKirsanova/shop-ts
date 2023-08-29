import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "./config";
import adType from "../../types/adType";

async function getAdByTitle(title: string) {
  const q = query(
    collection(db, "Ads"),
    where("title", ">=", title[0].toUpperCase()),
    where("title", "<=", title[0].toUpperCase() + "\uf8ff")
  );
  const list: adType[] = []
  const querySnapshot = await getDocs(q);

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
      list.push(ad);
    
  });
  return list
  
}

export default getAdByTitle;
