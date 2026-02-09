import { GET_MY_POSTS } from "../apiUrls";
import axiosConfig from "../baseUrl";

export const getMyPosts = () => axiosConfig.get(GET_MY_POSTS);
