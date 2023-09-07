import {  collection, addDoc } from "firebase/firestore";
import adType from "../../types/adType";
import { db } from "./config";

async function newAd({title, description, image, price, category, userId}: adType){
    const ad = {
        title: title,
        description: description,
        image: image,
        price: price,
        category: category,
        userId: userId
    }
    console.log(ad)
    await addDoc(collection(db, "Ads"), ad);
}
export default newAd