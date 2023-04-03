import axios from "axios";  
const API_URL = "https://7f98-14-187-146-62.ap.ngrok.io";

export default axios.create({
    baseURL: API_URL,
    headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }
});
