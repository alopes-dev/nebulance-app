import apiServer from "./api";

export const getAccountInfo = async () => {
  const response = await apiServer.get("/accounts/me");

  return response.data;
};
