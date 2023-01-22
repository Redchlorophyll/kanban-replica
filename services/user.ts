import axios from "axios";

const instance = axios.create({
  baseURL: "https://todo-api-18-140-52-65.rakamin.com",
});

const userAPI = () => {
  return {
    async signIn(body: { email: string; password: string }) {
      return await (
        await instance.post("/auth/login", body)
      ).data;
    },
    async signUp(body: {
      name: string;
      email: string;
      password: string;
      password_confirmation: string;
    }) {
      return await (
        await instance.post("/signup", body)
      ).data;
    },
  };
};

export default userAPI;
