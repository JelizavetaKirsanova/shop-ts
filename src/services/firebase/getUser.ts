import { doc, getDoc } from "firebase/firestore";
import { db } from "./config";
import userDataType from "../../types/userDataType";

async function getUser(id: string): Promise<userDataType | null> {
  const userRef = doc(db, "users", id);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return { id, ...userSnap.data() } as userDataType;
  }
  return null;
}

export default getUser;
