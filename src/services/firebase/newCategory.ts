import { collection, addDoc } from "firebase/firestore";

import { db } from "./config";
import categoryType from "../../types/categoryType";

async function newCategory({title, description}: categoryType){
    const category = {
        title: title,
        description: description
    }
    await addDoc(collection(db, "Categories"), category);
}
export default newCategory