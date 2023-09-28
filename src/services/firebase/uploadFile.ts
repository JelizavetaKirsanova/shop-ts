import { ref,  uploadBytesResumable } from "firebase/storage";
import { storage } from "./config";
import userStore from "../../store/UserStore";

function uploadFile(file: File) {
  const storageRef = ref(storage, `AdPhoto/${userStore.userData?.id}/${file.name}` );

  // 'file' comes from the Blob or File API
  const image = uploadBytesResumable(storageRef, file)
 
  return(image)
 
}

export default uploadFile;
