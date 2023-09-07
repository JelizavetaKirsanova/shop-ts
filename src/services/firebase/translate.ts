import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";
import userDataType from "../../types/userDataType";
import adType from "../../types/adType";
import axios from "axios";

async function translate(id: string): Promise<any> {
  const ref = doc(db, "Categories", id);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const category = snap.data();
    if (category.title.ee) {
      return;
    }
    const ruTitle = await googleTranslate(category.title, "ru");
    const eeTitle = await googleTranslate(category.title, "et");
    const ruDescription = await googleTranslate(category.description, "ru");
    const eeDescription = await googleTranslate(category.description, "et");
    await updateDoc(ref, {
      title: { ee: eeTitle, ru: ruTitle, en: category.title },
      description: { ee: eeDescription, ru: ruDescription, en: category.description },
    });
  }
}

async function googleTranslate(text: string, lang: string) {
  const options = {
    method: "POST",
    url: "https://microsoft-translator-text.p.rapidapi.com/translate",
    params: {
      "to[0]": lang,
      "api-version": "3.0",
      profanityAction: "NoAction",
      textType: "plain",
    },
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "1e7a3e9bd4msh4ee3c016172f19ep18f409jsna2f7ad769b7a",
      "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
    },
    data: [
      {
        Text: text,
      },
    ],
  };

  try {
    const response = await axios.request(options);
    return response.data[0].translations[0].text;
  } catch (error) {
    console.error(error);
    return null;
  }
}

//export default translate;
export default googleTranslate;
