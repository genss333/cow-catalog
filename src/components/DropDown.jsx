import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import useFamrList from "../hooks/useFarmList";

function FarmDropDown({ handleSelectFarm }) {
  const { farmList, fetchFarmList } = useFamrList();

  useEffect(() => {
    fetchFarmList();
  }, []);

  const handleSelectFarmForm = (e) => {
    const selectedMemberUuid = e.target.value;
    const selectedFarm = farmList.find(
      (farm) => farm.member_uuid === selectedMemberUuid
    );
    if (selectedFarm) {
      handleSelectFarm(selectedFarm);
    }
  };

  return (
    <Row className="justify-content-end">
      <Col xs={12} md={6} lg={4}>
        <Form.Select
          aria-label="Default select example"
          onChange={handleSelectFarmForm}
        >
          <option>เลือกฟาร์ม</option>
          {farmList.length > 0 ? (
            farmList.map((farm, index) => (
              <option key={index} value={farm.member_uuid}>
                {farm.farm_name}
              </option>
            ))
          ) : (
            <option>ไม่พบฟาร์ม</option>
          )}
        </Form.Select>
      </Col>
    </Row>
  );
}

export default FarmDropDown;
