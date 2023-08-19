import React from "react";
import { CloseButton } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { ImageNetwork } from "../service/imageNetwork";

const CowTableCatalog = ({ handleDelete, cart, isConfirm }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Image</th>
          <th>Breed</th>
          {isConfirm ? null : <th>Delete</th>}
        </tr>
      </thead>
      <tbody>
        {cart.map((cowItem) => (
          <tr key={cowItem.cow_id}>
            <td>{cowItem.cow_id}</td>
            <td>{cowItem.cow_name}</td>
            <td>
            <img src={ImageNetwork(cowItem.cow_img)} alt={cowItem.cow_name} width={200} />
            </td>
            <td>{cowItem.cow_breed}</td>
            {isConfirm ? null : (
              <td>
                <CloseButton onClick={() => handleDelete(cowItem)} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CowTableCatalog;
