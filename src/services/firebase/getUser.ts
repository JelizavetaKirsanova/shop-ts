import { doc, getDoc } from "firebase/firestore";
import { db } from "./config";
import userDataType from "../../types/userDataType";

async function getUser(id: string): Promise<userDataType | null> {
  console.log(id);
  const userRef = doc(db, "users", id);
  const userSnap = await getDoc(userRef);
  console.log(userSnap.data());
  if (userSnap.exists()) {
    return userSnap.data() as userDataType;
  }
  return null;
}

export default getUser;
