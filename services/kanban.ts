import axios from "axios";
import Cookies from "cookies";

const userToken = () => {
  const cookies = new Cookies();
};

const instance = axios.create({
  baseURL: "https://todo-api-18-140-52-65.rakamin.com",
});

const kanbanAPI = () => {
  return {
    async getListTodos(token: string) {
      return (
        await instance.get("/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data;
    },
    async createTodo(
      body: { title: string; description: string },
      token: string
    ) {
      return (
        await instance.post("/todos", body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data;
    },
    async getListOfItems(groupId: string | number, token: string) {
      return (
        await instance.get(`/todos/${groupId}/items`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data;
    },
    async createItem(
      groupId: string | number,
      body: {
        name: string;
        progress_percentage: number;
      },
      token: string
    ) {
      return (
        await instance.post(`/todos/${groupId}/items`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data;
    },
    async updateItem(
      groupId: string | number,
      body: {
        name: string;
        progress_percentage: number;
      },
      token: string
    ) {
      return (
        await instance.patch(`/todos/${groupId}/items`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data;
    },
    async deleteItem(
      groupId: string | number,
      itemId: string | number,
      token: string
    ) {
      return (
        await instance.get(`/todos/${groupId}/items/${itemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data;
    },
  };
};

export default kanbanAPI;
