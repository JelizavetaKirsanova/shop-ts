import { setDoc, doc } from "firebase/firestore"
import { db } from "./config"
import userType from "../../types/userType"
import userDataType from "../../types/userDataType"

async function setUser(user: userDataType ){
    console.log(user)
    await setDoc(doc(db, "users", user.id), {name: user.name, email:user.email, image: user.image})

}
export default setUser