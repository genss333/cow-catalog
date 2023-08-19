const Host = "https://beef.zyanwoa.com/uploadFiles";

export const ImageNetwork = (url) => {
  if (url !== null && url !== undefined && url !== "") {
    const path = `${Host}/${url}`;
    return path;
  }
};
