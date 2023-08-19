import { useState } from 'react';
import apiFarm from '../api/connect/apiFarm';

const useFamrList = () => {
    const [farmList, setFarmList] = useState([]);
    
    const fetchFarmList = async () => {
        try {
            apiFarm.getFarmList().then((response) => {
                setFarmList(response);
            });
        } catch (error) {
            throw error;
        }
    };
    
    return {farmList, fetchFarmList};
}

export default useFamrList;