import { coopId } from "../../constants/appConstant";
import apiConnect from "../apiConnect";

export default {
  getFarmList: async () => {
    try {
      const farmListResponse = await apiConnect.get('/zx/farm/'+coopId);
      if (farmListResponse.status === 200) {
        return farmListResponse.data;
      } else {
        throw new Error("Failed to fetch cows list");
      }
    } catch (error) {
      throw new Error("Failed to fetch cows list");
    }
  },
};