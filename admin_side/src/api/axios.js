import axios from "axios";
const API_URL = "https://633a-27-74-254-72.ap.ngrok.io";

export default axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});
