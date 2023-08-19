import React from 'react';

const MemberData = ({data}) => {
  const customer = {
    fullName: data.firstname + " " + data.lastname,
  };

  return (
    <div>
      <h1>ข้อมูลลูกค้า</h1>
      <div>
        <h6>ชื่อ-สกุล: {customer.fullName}</h6>
      </div>
    </div>
  );
}

export default MemberData