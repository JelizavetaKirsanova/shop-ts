import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "./config";

async function getAdByTitle(title: string) {

    const q = query(collection(db, "Ads"), where("title", ">=", title), where("title", "<=", title + "\uf8ff"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((el)=>{console.log(el.data())})

}

export default getAdByTitle;
