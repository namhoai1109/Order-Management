import axios from "axios";
const API_URL = "https://6982-14-187-230-230.ap.ngrok.io";

export default axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});
