// src/api/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, // 🔁 Replace with your actual base URL
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
    },
});

export default apiClient;
