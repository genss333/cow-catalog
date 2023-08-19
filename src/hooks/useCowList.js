import { useState } from "react";
import apiCow from "../api/connect/apiCow";

const useCowList = () => {
  const [cowList, setCowList] = useState([]);
  const [cowCatalog, setCowCatalog] = useState({});
  const fetchCowList = async (member) => {
    try {
      apiCow.getCowList(member).then((response) => {
        setCowList(response);
      });
    } catch (error) {
      navigate("/error");
      throw error;
    }
  };

  const createCowCatalog = async (cowCatalog,lotNo) => {
    try {
      apiCow.createCowCatalog(cowCatalog,lotNo).then((response) => {
        return response;
      });
    } catch (error) {
      throw error;
    }
  };

  const fetchCowCatalogList = async (lotNo) => {
    try {
      apiCow.getCowCatalogList(lotNo).then((response) => {
        setCowCatalog(response);
      });
    } catch (error) {
      navigate("/error");
      throw error;
    }
  };

  return { cowList, fetchCowList, createCowCatalog, fetchCowCatalogList, cowCatalog };
};

export default useCowList;
