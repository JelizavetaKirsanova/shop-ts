import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import authCredentialsType from "../../types/authCredentialsType";


async function signUp({ email, password }: authCredentialsType) {
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
    })
}
export default signUp