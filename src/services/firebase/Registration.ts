import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import authCredentialsType from "../../types/authCredentialsType";

async function signUp({ email, password }: authCredentialsType) {
  const auth = getAuth();

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
}
export default signUp;
