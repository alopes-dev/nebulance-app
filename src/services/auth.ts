import apiServer from "./api";

export const authLogin = async (email: string, password: string) => {
  const response = await apiServer.post("/login", { email, password });
  return response.data;
};

export const authUser = async () => {
  const response = await apiServer.get("/me");
  return response.data;
};
