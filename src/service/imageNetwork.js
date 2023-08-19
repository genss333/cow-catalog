import { Host } from "../constants/appConstant";

export const ImageNetwork = (url) => {
  if (url !== null && url !== undefined && url !== "") {
    const path = `${Host}/file/images/cow/${url}`;
    return path;
  }
};

export const FileNetwork = (url) => {
  if (url !== null && url !== undefined && url !== "") {
    const path = `${Host}/file/files/${url}`;
    return path;
  }
}
