import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import authCredentialsType from "../../types/authCredentialsType";

async function signIn({ email, password }: authCredentialsType) {
  const auth = getAuth();

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  return user;
}

export default signIn