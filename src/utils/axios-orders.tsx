import axios from "axios";

const instance = axios.create({
  baseURL: "https://wallet-stone-865a7.firebaseio.com/user",
});

export default instance;
