import axios from "axios";
const API_URL = "https://3908-14-161-23-204.ap.ngrok.io";

export default axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
    }
});

    