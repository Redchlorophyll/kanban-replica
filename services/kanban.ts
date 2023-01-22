import axios from "axios";

const instance = axios.create({
  baseURL: "https://todo-api-18-140-52-65.rakamin.com",
  headers: {
    Authorization: `Bearer <TOKEN>`,
  },
});

const userAPI = () => {
  return {
    async getListTodos() {
      return await (
        await instance.get("/todos")
      ).data;
    },
    async createTodo(body: { title: string; description: string }) {
      return await (
        await instance.post("/signup", body)
      ).data;
    },
    async getListOfItems(groupId: string | number) {
      return await (
        await instance.get(`/todos/${groupId}/items`)
      ).data;
    },
    async createItem(
      groupId: string | number,
      body: {
        name: string;
        progress_percentage: number;
      }
    ) {
      return await (
        await instance.post(`/todos/${groupId}/items`, body)
      ).data;
    },
    async updateItem(
      groupId: string | number,
      body: {
        name: string;
        progress_percentage: number;
      }
    ) {
      return await (
        await instance.patch(`/todos/${groupId}/items`, body)
      ).data;
    },
    async deleteItem(groupId: string | number, itemId: string | number) {
      return await (
        await instance.get(`/todos/${groupId}/items/${itemId}`)
      ).data;
    },
  };
};

export default userAPI;
