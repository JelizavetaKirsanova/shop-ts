import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./config";
import categoryType from "../../types/categoryType";

async function getCategories() {
  const q = query(collection(db, "Categories"));
  const snapshot = await getDocs(q);
  const data: categoryType[] = [];
  snapshot.forEach((el) => {
    data.push({
      id: el.id,
      title: el.data().title,
      description: el.data().description,
    });
   
  });
  console.log(data);
  return data;
}

export default getCategories;
