import axios from "axios";
const API_URL = "https://6ee0-14-169-67-12.ngrok-free.app";

export default axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});
