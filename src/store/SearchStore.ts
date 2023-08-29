import { makeAutoObservable } from "mobx";
import adType from "../types/adType";

class SearchStore {
  ads: adType[] | null = null;
  loading: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  setAds(ads: adType[] | null) {
    this.ads = ads;
  }
  setLoading(loading: boolean) {
    this.loading = loading;
  }
}

const searchStore = new SearchStore();
export default searchStore;
