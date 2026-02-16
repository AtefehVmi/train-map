import axios from "axios";

const api = axios.create({
  baseURL:
    "https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw",
});

export const fetchStations = async () => {
  const response = await api.get("/train-stations.json");
  return response.data;
};
