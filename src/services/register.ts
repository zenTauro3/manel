import axios from "axios";

export default async function register(
  name: string,
  email: string,
  password: string
) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_DOMAIN}/register`,
      {
        name,
        email,
        password,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
}
