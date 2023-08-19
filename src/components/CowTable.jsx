import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import useCowList from "../hooks/useCowList";
import { ImageNetwork } from "../service/imageNetwork";

const CowTable = ({ handleSelectCow, selectedCows,member }) => {
    const {cowList, fetchCowList} = useCowList();
    const navigate = useNavigate();

    const handleCowDetail = (cow) => {
      localStorage.setItem("cowDetail", JSON.stringify(cow));
      navigate(`/detail`);
    };
   useEffect(() => {
     if(member !== ''){
       fetchCowList(member);
     }
    }, [member]);
    
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Select</th>
          <th>Name</th>
          <th>Image</th>
          <th>Breed</th>
        </tr>
      </thead>
      <tbody>
        {cowList.map((cowItem) => (
          <tr key={cowItem.cow_id}>
            <td onClick={()=>handleCowDetail(cowItem)}>{cowItem.cow_id}</td>
            <td>
              <input
                type="checkbox"
                onChange={() => handleSelectCow(cowItem)}
                checked={selectedCows.includes(cowItem)}
              />
            </td>
            <td onClick={()=>handleCowDetail(cowItem)}>{cowItem.cow_name}</td>
            <td>
              <img src={ImageNetwork(cowItem.cow_img)} alt={cowItem.cow_name} width={200} />
            </td>
            <td>{cowItem.cow_breed}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CowTable;
