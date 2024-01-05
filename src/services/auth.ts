import axios from "axios"

export default async function auth(token: string | undefined) {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/auth`, { headers: { Authorization: token } });
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
}