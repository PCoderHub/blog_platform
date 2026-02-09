import { CREATE_POST, GET_MY_POSTS } from "../apiUrls";
import axiosConfig from "../baseUrl";

export const getMyPosts = () => axiosConfig.get(GET_MY_POSTS);
export const createPost = (post) => axiosConfig.post(CREATE_POST, post);
