import axios from "axios";
const API_URL = "https://6fae-14-241-254-131.ap.ngrok.io";

export default axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});
