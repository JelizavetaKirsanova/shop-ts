import { makeAutoObservable } from "mobx";
import userType from "../types/userType";
import userDataType from "../types/userDataType";
import { User } from "firebase/auth";

class UserStore {
  user: User | null = null;
  userData: userDataType | null = null;
  constructor() {
    makeAutoObservable(this);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    }
  }

  setUser(user: User| null) {
    this.user = user;
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }
  setUserData(userData: userDataType| null) {
    this.userData = userData;
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userData");
    }
  }
}

const userStore = new UserStore();
export default userStore;
