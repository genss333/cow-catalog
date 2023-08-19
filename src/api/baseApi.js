import axios from "axios";
import { Host } from "../constants/appConstant";
import PrettyPrint from "../util/prettyPrint";
import PrintFormData from "../util/printFormData";


const API = axios.create({
  baseURL: Host,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  async function (config) {
    console.log(`REQUEST[${config.method}] => PATH: ${config.url}`);
    const payload = config.data;
    if (payload instanceof FormData) {
      PrintFormData(payload);
    } else if (payload !== null) {
      console.log(`PAYLOAD => ${PrettyPrint(config.data, null, 2)}`);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  function (response) {
    console.log(`RESPONSE[${response.status}]`);
    console.log(`DATA: ${PrettyPrint(response.data, null, 2)}`);
    console.log("====================================================\n");
    return response;
  },
  function (error) {
    console.log(
      `ERROR[${error.response?.status}] => PATH: ${error.config.url}`
    );
    console.log(`DATA: ${PrettyPrint(error.response?.data, null, 2)}`);
    console.log("====================================================\n");
    const res = error.response;
    //==========================================================
    if (res?.status === 400 && res?.data?.error !== undefined) {
      return Promise.resolve(res);
    }
    //==========================================================
    if (res?.status === 417 && res?.data?.error !== undefined) {
      return Promise.resolve(res);
    }
    if (res?.status === 400 && res?.data?.error !== undefined) {
      return Promise.resolve(res);
    }
    return Promise.reject(error);
  }
);

export default API;
