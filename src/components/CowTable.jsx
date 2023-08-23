import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination"; // Import Pagination component
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import cowImage from "../assets/cow-1.jpg";
import useCowList from "../hooks/useCowList";
import { ImageNetwork } from "../service/imageNetwork";

const CowTable = ({ handleSelectCow, selectedCows, farmUuid }) => {
  const { cowList, fetchCowList } = useCowList();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handleCowDetail = (cow) => {
    localStorage.setItem("cowDetail", JSON.stringify(cow));
  };

  useEffect(() => {
    fetchCowList();
  }, []);

  const filteredCowList = cowList.filter((cowItem) =>
    farmUuid ? cowItem.farm_uuid === farmUuid : true
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = filteredCowList.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredCowList.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>ชื่อโค</th>
            <th>รายละเอียด</th>
            <th>สถานะ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 && (
            <tr>
              <td colSpan="5" align="center">
                ไม่มีข้อมูล
              </td>
            </tr>
          )}
          {currentData.map((cowItem) => (
            <tr key={cowItem.cow_id}>
              <td align="center" onClick={() => handleCowDetail(cowItem)}>
                <Link to={"/detail"}>
                  <img
                    src={ImageNetwork(cowItem.cow_img)}
                    alt={cowItem.cow_name}
                    style={{ maxWidth: "5rem" }}
                    onError={(e) => {
                      e.target.src = cowImage;
                    }}
                  />
                </Link>
              </td>
              <td align="left">{cowItem.cow_name}</td>
              <td align="left">
                <p>สายพันธุ์: {cowItem.cow_breed}</p>
                <p>อายุ: {cowItem.cow_age}</p>
                <p>เพศ: {cowItem.cow_sex === "F" ? "เพศเมีย" : "เพศผู้"}</p>
              </td>
              <td align="left">{cowItem.cow_belly}</td>
              <td align="center">
                <input
                  type="checkbox"
                  onChange={() => handleSelectCow(cowItem)}
                  checked={selectedCows.includes(cowItem)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div
        style={{
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination>
          <Pagination.First
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, page) => (
            <Pagination.Item
              key={page}
              active={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default CowTable;
