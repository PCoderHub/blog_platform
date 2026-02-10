import { UPLOAD_IMAGE } from "../apiUrls";
import axiosConfig from "../baseUrl";

export const uploadImage = (image) => axiosConfig.post(UPLOAD_IMAGE, image);
