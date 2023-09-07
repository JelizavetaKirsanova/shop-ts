import { makeAutoObservable } from "mobx";
import { languageType } from "../types/languageType";

class LanguageStore{
    current: languageType = "en" 
    constructor(){
        makeAutoObservable(this)
        const language = localStorage.getItem("lang");
        if (language) {
          this.current = JSON.parse(language);
        }
    }
    setLang(current: languageType) {
        this.current = current;
        if (current) {
          localStorage.setItem("lang", JSON.stringify(current));
        } 
      }
    

}
 const languageStore = new LanguageStore()
 export default languageStore