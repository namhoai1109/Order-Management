import axios from "axios";
const API_URL = "https://ea5b-14-186-4-94.ngrok-free.app";

export default axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});
