import { instance } from "../client/axiosInstance";

const useAPI = () => {
  const get = instance.get;
  const post = instance.post;

  return { get, post };
};

export default useAPI;
