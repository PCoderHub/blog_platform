import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "../apiUrls";
import axiosConfig from "../baseUrl";

export const registerUser = (userData) =>
  axiosConfig.post(REGISTER_USER, userData);
export const loginUser = (userData) => axiosConfig.post(LOGIN_USER, userData);
export const logoutUser = () => axiosConfig.post(LOGOUT_USER);
