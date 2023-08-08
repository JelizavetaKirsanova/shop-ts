import {makeAutoObservable} from "mobx"

class UserStore{
     user = null
     constructor(){
        makeAutoObservable(this)
        const storedUser = localStorage.getItem("user")
        if (storedUser){
            this.user = JSON.parse(storedUser)
        }
     }
     setUser(user: any){
        this.user= user
        if(user){
            localStorage.setItem("user", JSON.stringify(user))
        }else{
            localStorage.removeItem("user")
        }
     }
}

const userStore = new UserStore()
export default userStore