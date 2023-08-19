import apiConnect from "../apiConnect";

export default {
  getCowList: async (member) => {
    try {
      const cowListResponse = await apiConnect.get(
        'cow/in_cow_coop/' + member
      );
      if (cowListResponse.status === 200) {
        return cowListResponse.data;
      } else {
        throw new Error("Failed to fetch cows list");
      }
    } catch (error) {
      throw new Error("Failed to fetch cows list");
    }
  },

  getCowCatalogList: async (lotNo) => {
    try {
      const cowCatalogListResponse = await apiConnect.get(
        'zx/getCatalog/' + lotNo
      );
      if (cowCatalogListResponse.status === 200) {
        return cowCatalogListResponse.data;
      } else {
        throw new Error("Failed to fetch cows catalog list");
      }
    } catch (error) {
      throw new Error("Failed to fetch cows catalog list");
    }
  },

  createCowCatalog: async (cowCatalog,lotNo) => {
    try {
      const cowCatalogResponse = await apiConnect.post(
        'zx/createCatalog/',
        cowCatalog
      );
      if (cowCatalogResponse.status === 201) {
        alert("สร้างรายการสำเร็จ");
        window.location.href = "/catalog/" + lotNo;
      } else {
        throw new Error("Failed to create cow catalog");
      }
    } catch (error) {
      throw new Error("Failed to create cow catalog");
    }
  },
};
